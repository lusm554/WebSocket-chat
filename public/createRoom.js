create_room.addEventListener('click', () => {
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
        let roomObj = await res.json()
        console.log(roomObj)
    })  
})