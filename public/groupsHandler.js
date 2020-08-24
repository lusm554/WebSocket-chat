function createRoomHandler() {
    let roomName = prompt('room name?')
    if(roomName === null || roomName === '') return alert('Incorrect input');
    let { _id: user_id } = JSON.parse( localStorage.user )

    fetch('http://localhost:8080/chat/room/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomName, users: [user_id] })
    })
    .then( async (res) => {
        if(res.status !== 200) {
            return alert(`Status: ${res.status} ${res.statusText}`)
        }

        let roomObj = await res.json()
        console.log(roomObj)
    })
}

function joinToGroup() {
    let room_id = prompt('room id?')
    if(room_id === null || room_id === '') return alert('Incorrect input');
    let { _id: user_id} = JSON.parse( localStorage.user )

    fetch('http://localhost:8080/chat/room/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id, room_id })
    })
    .then( async (res) => {
        if(res.status !== 200) {
            return res.status === 400 ?
                alert(`Status: ${res.status} ${res.statusText}\nUser already exist`) :
                alert(`Status: ${res.status} ${res.statusText}`)
        }

        let roomObj = await res.json()
        console.log(roomObj)
    })
}

export { createRoomHandler, joinToGroup }