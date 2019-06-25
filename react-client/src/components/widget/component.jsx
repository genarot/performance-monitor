import React from 'react';
import Cpu from "../cpu/component";
import Info from "../info/component";
import Mem from "../mem/component";
import widgetStyle from './widget.module.css';
import classnames from 'classnames';

const Widget = ({data}) => {
    const {
        freeMem, totalMem,
        usedMem, memUsage,
        osType, upTime, macA, cpuModel, numCores, cpuLoad, cpuSpeed
    } =  data;
    const cpu = {cpuLoad};
    const mem = {totalMem, usedMem, freeMem, memUsage};
    const info = {macA, osType, upTime, cpuModel, numCores, cpuSpeed};
    return (
        <div className={classnames(widgetStyle.widget,"col-10")}>
            <Cpu cpuData={cpu} />
            <Info infoData={info}/>
            <Mem memData={mem}/>
        </div>
    )
}

export default Widget;
