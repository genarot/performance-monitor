const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/perfData', { useNewUrlParser: true})
const Machine = require('./models/Machine');

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
    socket.on('initPerfData', (data) => {
        // update our socket connect function scoped variables
        macA = data.macA;
        // now we go check mongo
        checkAndAdd(macA);
        console.log(data)
    })

    //because we are doing db stuff, js won wait for the db
    // so we need to make this a promise
    function checkAndAdd( data) {

        return new Promise((resolve, reject) => {
            Machine.findOne({

            })
        })

    }
    socket.on('perfData', (allPerformanceData)=> {
        console.log(allPerformanceData)
    })
    // console.log('Someone called me! I\'m master1')
    // mongoose.
}

module.exports = socketMain;
