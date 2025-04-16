import { ref } from "vue";
import { fetchJson } from "../modules/fetchJson";

export function useFetchJson(options){
    const data = ref(null)
    const error = ref(null)
    const loading = ref(true)

    const { request, abort } = fetchJson(options)
    request
        .then(resp => {
            data.value = resp
            loading.value = false
        })
        .catch(err => {
            error.value = err
            loading.value = false
        })
        return { data, error, loading, abort}
}