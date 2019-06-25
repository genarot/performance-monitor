import React from 'react';
import drawCircle from '../../utilities/canvasLoadAnimation';
import widgetStyle from '../widget/widget.module.css';
import classnames from 'classnames';

const Cpu = ({cpuData}) => {
    console.log('cpudata', cpuData);
    const canvas = document.querySelector('canvas');
    drawCircle(canvas, cpuData.cpuLoad);
    console.log(canvas);
    return (
        <div className={"col-sm-3 cpu"}>
            <h3>CPU Load</h3>
            <div className={classnames(widgetStyle["canvas-wrapper"])}>
                <canvas className="canvas">
                </canvas>
                <div className={widgetStyle["cpu-text"]}>{cpuData.cpuLoad}</div>
            </div>
        </div>
    )
};

export default Cpu;
