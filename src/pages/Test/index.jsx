import React, { useEffect } from 'react';
import { Base } from '../Base';
import headbreaker, {Painter} from 'headbreaker';

function Test(props) {
    console.log('headbreaker.Canvas', headbreaker.Canvas);
    // useEffect(() => {
    //     let pettoruti = new Image();
    //     pettoruti.src = 'https://d25tv1xepz39hi.cloudfront.net/2016-01-31/files/1045.jpg';
    //     pettoruti.onload = () => {
    //       const validated = new headbreaker.Canvas('validated-canvas', {
    //         width: 800, height: 900,
    //         pieceSize: 80, proximity: 18,
    //         borderFill: 8, strokeWidth: 1.5,
    //         lineSoftness: 0.18, image: pettoruti,
    //         // used to stick canvas to its current position
    //         fixed: true,
           
    //       });
    //       validated.autogenerate({
    //         horizontalPiecesCount: 5,
    //         verticalPiecesCount: 8
    //       });
    //       validated.puzzle.pieces[4].translate(63, -56);
    //       validated.draw();
    //       validated.attachSolvedValidator();
    //       validated.onValid(() => {
    //         setTimeout(() => {
    //           document.getElementById('validated-canvas-overlay').setAttribute("class", "active");
    //         }, 1500);
    //       })
    //     }

    // })


    var body = <>
        <canvas id='validated-canvas'></canvas>

    </>;

    return (
        <Base body={body}>

        </Base>
    );
}

export default Test;