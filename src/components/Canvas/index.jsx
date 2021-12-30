import React, { useEffect, useRef } from 'react';

function Canvas({img, keys}) {
    const canvasRef = useRef();
    console.log("key", keys);
    useEffect(() => {
        if(keys) {
            let ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            const size_of_crop = 32;
            // const layerCur = arrLayer[nameLayer];
                    const positionX = Number(keys.split("-")[0]);
                    const positionY = Number(keys.split("-")[1]);
    
                    ctx.drawImage(
                        img,
                        positionX * 32,
                        positionY * 32,
                        size_of_crop,
                        size_of_crop,
                        0,
                        0,
                        size_of_crop,
                        size_of_crop
                    );
        }
        
 
    },[keys])
    return (
        <canvas ref={canvasRef} width={32} height={32}></canvas>
    );
}

export default Canvas;