const ws = new WebSocket('ws://localhost:8080/')
let { id: room_id } = getUrlParams(window.location.href)

let roomObj;
async function getRoomInfo() {
    return await fetch('http://localhost:8080/chat/room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ room_id })
    })
    .then( async (res) => await res.json() )
}

function getUrlParams(search) {
    const hashes = search.slice(search.indexOf('?') + 1).split('&'), params = {}
    hashes.map(hash => {
        const [key, val] = hash.split('=')
        params[key] = decodeURIComponent(val)
    })
    return params
} 

ws.addEventListener('open', (e) => {
    console.log('connection open')
    submit.disabled = false
})

ws.addEventListener('message', (e) => {
    let message = e.data
    console.log(message)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(m.value) 
    import('./sendMessages').then( async ({sendMessageToServer, getUser}) => {
        let messageObj = await setMessageObj(getUser());
        sendMessageToServer(messageObj, ws)
    })
});

async function setMessageObj(user) {
    roomObj = roomObj ? roomObj : await getRoomInfo()
    const id = user.external_id, username = user.username
    let msg = {
        type: 'roomMessage',
        text: m.value,
        id,
        username,
        roomObj
    }
    return msg
}

main_page.addEventListener('click', () => {
    window.location.replace('http://localhost:8080/chat')
})

join_group.addEventListener('click', () => {
    import('./groupsHandler').then(module => {
        const { joinToGroup } = module
        joinToGroup()
    })
})