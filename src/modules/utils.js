export function formatDate(dateString){
    const date = new Date(dateString)
    
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    const weekDay = days[date.getDay()]
    
    const day = date.getDate().toString().padStart(2, '0')

    const month = (date.getMonth() + 1).toString().padStart(2, '0')

    return `${weekDay} ${day}.${month}`
}

export function formatTime(dateString){
    const date = new Date(dateString)

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
}