import React, { useEffect, useRef } from 'react';
import './dice.css'
function Dice({ status, randomAngle, isDice }) {
    const cube = useRef();
    const handleDice = (randomAngle) => {
        // const angleArray = [[0,0,0],[-310,-362,-38],[-400,-320,-2],[135,-217,-88],[-224,-317,5],[-47,-219,-81],[-133,-360,-53]];
        // //this array of degree that show the deffrent number 1 2 3 4 5 6 on cube ie
        // 	/*ANIMATION */
        // 	cube.current.style.animation = 'animate 1.4s linear';
        // 	cube.current.style.transform = 'rotateX('+angleArray[randomAngle][0]+'deg) rotateY('+angleArray[randomAngle][1]+'deg) rotateZ('+angleArray[randomAngle][2]+'deg)';
        // 	cube.current.style.transition = '1s linear'

        // 	cube.current.addEventListener('animationend',function(e){
        // 		cube.current.style.animation = '';
        // 	});


        let elDiceOne = document.getElementById('dice1');


        const dice = setTimeout(() => {

            for (let i = 1; i <= 6; i++) {
                elDiceOne.classList.remove('show-' + i);
                if (randomAngle === i) {
                    elDiceOne.classList.add('show-' + i);
                }
            }
            clearTimeout(dice);
        }, 1000);

    }
    useEffect(() => {
        if (isDice) {
            handleDice(randomAngle);
        }

    }, [status])
    return (
        <div className="game" style={{ zIndex: 20000, position: 'fixed', left: '38%' }}>
            <div className="container">
                <div id='dice1' className="dice dice-one">
                    <div id="dice-one-side-one" className='side one'>
                        <div className="dot one-1"></div>
                    </div>
                    <div id="dice-one-side-two" className='side two'>
                        <div className="dot two-1"></div>
                        <div className="dot two-2"></div>
                    </div>
                    <div id="dice-one-side-three" className='side three'>
                        <div className="dot three-1"></div>
                        <div className="dot three-2"></div>
                        <div className="dot three-3"></div>
                    </div>
                    <div id="dice-one-side-four" className='side four'>
                        <div className="dot four-1"></div>
                        <div className="dot four-2"></div>
                        <div className="dot four-3"></div>
                        <div className="dot four-4"></div>
                    </div>
                    <div id="dice-one-side-five" className='side five'>
                        <div className="dot five-1"></div>
                        <div className="dot five-2"></div>
                        <div className="dot five-3"></div>
                        <div className="dot five-4"></div>
                        <div className="dot five-5"></div>
                    </div>
                    <div id="dice-one-side-six" className='side six'>
                        <div className="dot six-1"></div>
                        <div className="dot six-2"></div>
                        <div className="dot six-3"></div>
                        <div className="dot six-4"></div>
                        <div className="dot six-5"></div>
                        <div className="dot six-6"></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dice;