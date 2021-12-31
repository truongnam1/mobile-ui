import React from 'react';

function AnimationText({text, top, left, size, color}) {
    return (
        <div className='animate__bounceInDown animate__animated' 
        style={{position: 'fixed', top: top || 0, left: left || 0, zIndex: 2, fontSize: size || '50px', fontFamily: 'cursive', color: color || 'black' }} >
            {text}
        </div>
    );
}

export default AnimationText;