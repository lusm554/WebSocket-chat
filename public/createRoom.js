create_room.addEventListener('click', () => {
    let roomName = prompt('room name?')
    if(roomName === null || roomName === '') return alert('Incorrect input');

    fetch('http://localhost:8080/room/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({roomName})
    })
    .then( async (res) => {
        let roomObj = await res.json()
        console.log(roomObj)
    })  
})