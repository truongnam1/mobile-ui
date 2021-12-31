import React, { useEffect, useRef, useState } from 'react';
import './dice.css'
function Dice({status, randomAngle, isDice}) {
    const [numberDice, setNumberDice] = useState('');
    const handleDice = (randomAngle) => {
            const dice = setTimeout( () => {
                        if(randomAngle == 1) {
                            setNumberDice('show-' + 1);
                        } else if(randomAngle == 2) {
                           setNumberDice('show-' + 6);
                        } else if(randomAngle == 3) {
                           setNumberDice('show-' + 4);
                        } else if (randomAngle == 4) {
                           setNumberDice('show-' + 5);
                        } else if(randomAngle == 5) {
                           setNumberDice('show-' + 2);
                        } else  setNumberDice('show-' + 3);
                clearTimeout(dice);
            }, 1000);
            // ${randomAngle == 1 ? 'show-1' : randomAngle == 2 ? 'show-6' : randomAngle == 3 ? 'show-4' : randomAngle == 4 ? 'show-5' : randomAngle == 5 ? 'show-2' : randomAngle == 6 ? 'show-3' : ''}
    }
    useEffect(() => {
        if(isDice) {
            handleDice(randomAngle);
        }
        
    }, [status])
    return (
        <div className="game" style={{zIndex: 20000, position: 'fixed', left: '38%'}}>
            <div className="container">
            <div id='dice1' className={`dice dice-one ${numberDice}`}>
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