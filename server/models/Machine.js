const mongoose = require('mongoose');

const MachineSchema = new  mongoose.Schema({
    macA: String,
    cpuLoad: Number,
    freeMem: Number,
    totalMem: Number,
    useMem: Number,
    memUsage: Number,
    osType: String,
    upTime: Number,
    cpuModel: String,
    numCores: Number,
    cpuSpeed: Number
});


module.exports =  new mongoose.Model('Machine', MachineSchema)
