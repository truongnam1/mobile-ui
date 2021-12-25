import React, { useEffect, useRef } from 'react';
import './dice.css'
function Dice({status, randomAngle, isDice}) {
    const cube = useRef();
    const handleDice = (randomAngle) => {
		const angleArray = [[0,0,0],[-310,-362,-38],[-400,-320,-2],[135,-217,-88],[-224,-317,5],[-47,-219,-81],[-133,-360,-53]];
		//this array of degree that show the deffrent number 1 2 3 4 5 6 on cube ie
			/*ANIMATION */
			cube.current.style.animation = 'animate 1.4s linear';
			cube.current.style.transform = 'rotateX('+angleArray[randomAngle][0]+'deg) rotateY('+angleArray[randomAngle][1]+'deg) rotateZ('+angleArray[randomAngle][2]+'deg)';
			cube.current.style.transition = '1s linear'

			cube.current.addEventListener('animationend',function(e){
				cube.current.style.animation = '';
			});
    }
    useEffect(() => {
        if(isDice) {
            handleDice(randomAngle);
        }
        
    }, [status])
    return (
        <div class="containerByT">
        <div class="cube" id="cube" ref={cube}>
            <div class="front">
                <span class="fas fa-circle"></span>
            </div>
            <div class="back">
                   
                    <pre class="firstPre"><span class="fas fa-circle"></span>    <span class="fas fa-circle"></span>    <span class="fas fa-circle"></span></pre><br></br>
                    <pre class="secondPre"><span class="fas fa-circle"></span>    <span class="fas fa-circle"></span>    <span class="fas fa-circle"></span></pre>
            </div>
            <div class="top">
                <span class="fas fa-circle"></span>
                <span class="fas fa-circle"></span>
            </div>
            <div class="left">
                <span class="fas fa-circle"></span>
                <span class="fas fa-circle"></span>
                <span class="fas fa-circle"></span>

            </div>
            <div class="right">
                <span class="fas fa-circle"></span>
                <span class="fas fa-circle"></span>
                <span class="fas fa-circle"></span>
                <span class="fas fa-circle"></span>
                <span class="fas fa-circle"></span>

            </div>
            <div class="bottom">
                <span class="fas fa-circle"></span>
                <span class="fas fa-circle"></span>
                <span class="fas fa-circle"></span>
                <span class="fas fa-circle"></span>

            </div>
        </div>
    </div>
    );
}

export default Dice;