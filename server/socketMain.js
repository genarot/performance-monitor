const mongoose = require('mongoose');
mongoose.connect('http://localhost:27017/perfData', { useNewUrlParser: true})

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

    // a machine has been connected, check to see if its new
    // if it is, add it
    socket.on('initPerfData', (allPerformanceData) => {
        console.log(allPerformanceData)
    })
    socket.on('perfData', (allPerformanceData)=> {
        console.log(allPerformanceData)
    })
    // console.log('Someone called me! I\'m master1')
    // mongoose.
}

module.exports = socketMain;
