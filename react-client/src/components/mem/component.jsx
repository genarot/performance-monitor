import React from 'react';
import drawCircle from '../../utilities/canvasLoadAnimation';
import classnames from "classnames";
import widgetStyle from "../widget/widget.module.css";

const Mem = ({memData}) => {
    const {totalMem, usedMem, freeMem, memUsage} = memData;
    const canvas = document.querySelector(`.${memData.memWidgetID}`);
    drawCircle(canvas, memUsage * 100);
    const totalMemOnGB = Math.ceil((totalMem/1073741824*100)/100);
    const freeMemInGB = ((freeMem/1073741824*100)/100).toFixed(2);
    return (
        <div className={"col-sm-3"}>
            <h3>Memory Usage</h3>
            <div className={classnames(widgetStyle["canvas-wrapper"])}>
                <canvas className={memData.memWidgetID} width={"200"} height={"200"}>
                </canvas>
                <div className={widgetStyle["mem-text"]}>{memUsage*100}%</div>
            </div>
            <div>
                Total Memory: {totalMemOnGB} GB
            </div>
            <div>
                Free Memory: {freeMemInGB} GB
            </div>
        </div>
    )
}

export default Mem;
