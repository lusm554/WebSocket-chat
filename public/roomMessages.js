let { id: room_id } = getUrlParams(window.location.href)
const ws = new WebSocket('ws://localhost:8080/')

function getUrlParams(search) {
    const hashes = search.slice(search.indexOf('?') + 1).split('&'), params = {}
    hashes.map(hash => {
        const [key, val] = hash.split('=')
        params[key] = decodeURIComponent(val)
    })
    return params
} 

fetch('http://localhost:8080/chat/room', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ room_id })
})
.then(async (res) => {
    let roomObj = await res.json()
    console.log(roomObj)
})

ws.addEventListener('open', (e) => {
    console.log('connection open')
})

main_page.addEventListener('click', () => {
    window.location.replace('http://localhost:8080/chat')
})

join_group.addEventListener('click', () => {
    import('./groupsHandler').then(module => {
        const { joinToGroup } = module
        joinToGroup()
    })
})