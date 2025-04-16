const defaultHeaders = {
    'Content-type': 'application/json',
    'X-Requested-With': 'XmlHttpRequest',
    'Accept': 'application/json'
}

let defaultBaseUrl = ''

export function setDefaultHeaders(headers) {
    Object.assign(defaultHeaders, headers)
}

export function setDefaultBaseUrl(url){
    if(url[url.length - 1] === '/') url = url.slice(0, -1)
        defaultBaseUrl = url
}

export function fetchJson(options){
    if(typeof options === 'string') {
        options = {url: options}
    }

    const {
        url,
        data = null,
        method = null,
        headers = {},
        timeout = 5000,
        baseUrl = ''
    } = options

    if(typeof url !== 'string') throw new Error('This URL must be a string.')
    const usedMethod = method ? method.toUpperCase() : (data ? 'POST' : 'GET')

    let fullUrl
    if(url.startsWith('http://') || url.startsWith('https://')) {
        fullUrl = url
    } else {
        fullUrl = (baseUrl ?? defaultBaseUrl) + (url.startsWith('/') ? url : `/${url}`)
    }

    if(usedMethod === 'GET' && data) {
        const queryString = new URLSearchParams(data).toString()
        fullUrl += '?' + queryString
    }

    const allHeaders = {...defaultHeaders, ...headers}

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    const signal = controller.signal
    const body = usedMethod !== 'GET' && data ? JSON.stringify(data) : null

    const request = new Promise((resolve, reject) => {
        fetch(fullUrl, { method: usedMethod, headers: allHeaders, body, signal})
            .then(resp => {
                clearTimeout(timeoutId)
                const respClone = resp.clone()
                return resp.json()
                    .then(data => {
                        if (!resp.ok) {
                            reject({status: resp.status, statusText: resp.statusText, data})
                        } else {
                            resolve(data)
                        }
                    })
                    .catch(() => {
                        return respClone.text()
                            .then(() => reject({
                                status: resp.status,
                                statusText: resp.statusText,
                                data: null
                            }))
                            .catch(() => reject({
                                status: resp.status,
                                statusText: resp.statusText,
                                data: null
                            }))
                    })
            })
            .catch(err => {
                clearTimeout(timeoutId)
                if(err.name === 'AbortError') {
                    reject({status: 0, statusText: 'Request aborted (timeout)', data: null})
                } else {
                    reject({status: 0, statusText: err.message || 'Network error', data: null})
                }
            })
    })

    return {
        request,
        abort: () => controller.abort()
    }
}