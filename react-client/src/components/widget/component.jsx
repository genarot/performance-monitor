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
        osType, upTime, macA, cpuModel, numCores, cpuLoad, cpuSpeed,
        isActive
    } =  data;
    // console.log('replacen', macA.replace(/:/g,'_'))
    const cpuWidgetID = `cpu-widget-${macA.toString().replace(/:/g,'_')}`;
    const memWidgetID = `mem-widget-${macA.toString().replace(/:/g,'_')}`;
    const cpu = {cpuLoad, cpuWidgetID};
    const mem = {totalMem, usedMem, freeMem, memUsage, memWidgetID};
    const info = {macA, osType, upTime, cpuModel, numCores, cpuSpeed};

    let notActiveDiv ='';
    if ( !isActive ) {
        notActiveDiv = <div className={widgetStyle["not-active"]}>Offline</div>
    }
    return (
        <div className={classnames(widgetStyle.widget,"col-10","row")}>
            {notActiveDiv}
            <Cpu cpuData={cpu} />
            <Mem memData={mem}/>
            <Info infoData={info}/>
        </div>
    )
}

export default Widget;
