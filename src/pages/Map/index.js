import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import codebeautty from './codebeautify.json'
import styleBase from '../Base/Base.module.scss';
function MapComponent(props) {
    const imageE = useRef();
    const canvasRef = useRef();
    useEffect(() => {
        const layers = codebeautty.maps.Map_1.layers[0].tiles;
        imageE.current.src='https://i.ibb.co/KzSwmBv/ztwPZOI.png?fbclid=IwAR0gBT_O7lVJ1gHYpvl7fnVG3S5Jyjdpt89lXby4L4CPi08Tqx1eV0SlUMc'
        imageE.current.onload = function() {
          let ctx = canvasRef.current.getContext("2d");
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          const size_of_crop = 32;
          Object.keys(layers).forEach(layer => {
                const positionX = Number(layer.split('-')[0]);
                const positionY = Number(layer.split('-')[1]);
                const titleSheetX =  layers[layer].x;
                const titleSheetY =  layers[layer].y;
                ctx.drawImage(
                    imageE.current,
                  titleSheetX * 32,
                  titleSheetY * 32,
                  size_of_crop,
                  size_of_crop,
                  positionX * 32,
                  positionY * 32,
                  size_of_crop,
                  size_of_crop
               );
             
          });
        }
    }, [])
    return (
        <div className={clsx('container-sm', 'border', styleBase.main)}>
            {console.log(codebeautty)}
            <canvas style={{width: '100%'}} ref={canvasRef} width={codebeautty.maps.Map_1.width*codebeautty.maps.Map_1.mapWidth/10} height={codebeautty.maps.Map_1.height*codebeautty.maps.Map_1.mapHeight/10}></canvas>
            <img ref={imageE} />
            {/* https://i.ibb.co/KzSwmBv/ztwPZOI.png?fbclid=IwAR0gBT_O7lVJ1gHYpvl7fnVG3S5Jyjdpt89lXby4L4CPi08Tqx1eV0SlUMc */}
        </div>
    );
}

export default MapComponent;