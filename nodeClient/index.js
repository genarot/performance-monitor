// The node program that captures local performance data
// and sends it up to the socket.io server
// Req: farmhash
// - socket.io-client
const os = require('os');
const io = require('socket.io-client');
const socket = io('http://127.0.0.1:8181');

socket.on('connect', () => {
    console.log('I connected to the socket server... hoorqay!');
    // we need a way to identify this machine no whomever concerned
    const nI = os.networkInterfaces();
    let macA;
    // loop through all the nI for this maching and find a non-internal one
    for (let key  in nI) {
        // FOr testing purposes!!!
        macA =  Math.floor(Math.random() * 3) + 1;
        break;
        if (!nI[key][0].internal) {
            if (nI[key][0].mac === '00:00:00:00:00:00')
                macA = Math.random().toString(36).substring(2, 15);
            else
                macA = nI[key][0].mac;
            break;
        }
    }
    // Client auth with single key value
    socket.emit('clientAuth', 'node-client');
    performanceData()
        .then(allPerformanceData => {
            console.log('Emitiendo initPerfData', allPerformanceData);
            allPerformanceData.macA = macA;
            socket.emit('initPerfData', allPerformanceData)
        });

    // start sending over data on interval
    let perfDataInterval = setInterval(() => {
        performanceData()
            .then(allPerformanceData => {
                allPerformanceData.macA = macA;
                socket.emit('perfData', allPerformanceData)
            })
    }, 1000);
    socket.on('disconnect', () => {
        clearInterval(perfDataInterval);
    })
});

const performanceData = async () => {
    const cpus = os.cpus();
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor(usedMem / totalMem * 100) / 100;
    // -- Os type
    const osType = os.type();
    // -- Uptime
    const upTime = os.uptime();
    // - CPU info
    // - Type
    const cpuModel = cpus[0].model;
    // - Number of cores
    const numCores = cpus.length;
    // Clock speed
    const cpuSpeed = cpus[0].speed;
    const cpuLoad = await getCpuLoad();
    return ({
        freeMem, totalMem,
        usedMem, memUsage,
        osType, upTime, cpuModel, numCores, cpuLoad, cpuSpeed, isActive: true
    })
};

// cpus is all cores. we need the average of all the cores which
// will give us the cpu average
function cpuAverage() {
    const cpus = os.cpus();
    // get ms in each mode, BUT this number is since reboot
    // so get it now, and get it in 100ms and compare
    let idleMs = 0;
    let totalMs = 0;
    // loop through each core
    cpus.forEach((aCore) => {

        // loop through each property of the current core
        for (type in aCore.times) {
            totalMs += aCore.times[type];
        }
        idleMs = aCore.times.idle;
    });
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length
    }

}

// because the times property is time since boot, we will get
// now times, and 100ms from now times. Compare them, that will
// give us current load
const getCpuLoad = () => {
    return new  Promise((resolve, reject) => {
        const start = cpuAverage();
        setTimeout(() => {
            const end = cpuAverage();
            const idleDifference = end.idle = start.idle;
            const totalDifference = end.total = start.total;
            console.log(idleDifference, totalDifference);
            // calc the % of used cpu
            const percentageCpu = 100 - Math.floor(100 * idleDifference / totalDifference);
            console.log('% of use ' + percentageCpu);
            resolve(percentageCpu);
        }, 100);
    })
};


// performanceData()
//     .then((allPerformanceData) =>{
//         console.log('all PerformanceData', allPerformanceData)
//     })
//     .catch(err => console.log(err))
// setInterval(()=> {
//
//     getCpuLoad();
// },1000)
//
