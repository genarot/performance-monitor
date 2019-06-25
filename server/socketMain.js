const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/perfData', { useNewUrlParser: true})
const Machine = require('./models/Machine');

function socketMain(io, socket) {
    console.log('A socket connected!', socket.id);
    socket.on('clientAuth', (key) => {
        if ( key === 'Genaro') {
            socket.join('clients');
        } else if ( key  === 'react-client' ) {
            console.log('A react client has been connected!');
            socket.join('ui');
        } else {
            // an invalid client has joined. goodbye
            console.log('invalid client');
            // socket.disconnect(true);
        }
    })

    // a machine has been connected, check to see if its new
    // if it is, add it
    socket.on('initPerfData', async (data) => {
        // update our socket connect function scoped variables
        macA = data.macA;
        console.log('initPerfData', data)
        // now we go check mongo
        const mongooseResponse = await checkAndAdd(data);
        console.log(mongooseResponse);
    })

    //because we are doing db stuff, js won wait for the db
    // so we need to make this a promise
    function checkAndAdd( data) {
        return new Promise((resolve, reject) => {
            Machine.findOne({
                macA: data.macA
            },(err, doc) => {
                if ( err ) {
                    throw err;
                    // reject(err);
                } else if ( doc === null ) {
                    // these are the droids we're looking for
                    // the record is not in the db, so add it!
                    console.log('Before saving!', data)
                    const newMachine = new Machine({...data});
                    newMachine.save();
                    resolve("added");
                } else {
                    // it is in the db.just resolve
                    resolve("found")
                }
            })
        })

    }
    socket.on('perfData', (allPerformanceData)=> {
        console.log('Tick...');
        io.to('ui').emit('data', allPerformanceData);
    })
    // console.log('Someone called me! I\'m master1')
    // mongoose.
}

module.exports = socketMain;
