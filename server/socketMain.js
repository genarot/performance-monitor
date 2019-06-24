function socketMain(io, socket) {
    console.log('A socket connected!', socket.id);
    socket.on('clientAuth', (key) => {
        if ( key === 'Genaro') {
            socket.join('clients');
        } else if (key  === 'asasa') {
            socket.join('ui');
        } else {
            // an invalid client has joined. goodbye
            socket.disconnect(true);
        }
    })

    socket.on('perfData', (allPerformanceData)=> {
        console.log(allPerformanceData)
    })
    // console.log('Someone called me! I\'m master1')
}

module.exports = socketMain;
