const mongoose = require('mongoose');

const MachineSchema = new  mongoose.Schema({
    macA: string,
    cpuLoad: Number,

});


module.exports =  new mongoose.Model('Machine', MachineSchema)
