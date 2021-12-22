import React, { useEffect, useRef, useState } from 'react';

function CountTime({firstValue, onClearTime, onBackToPrev}) {
    const [count, setCount] = useState(firstValue);
    const time = useRef();
    useEffect(() => {
             time.current = setInterval(() => {
                setCount(prev => prev-1);
            }, 1000)
        
       return () => clearInterval(time.current)
    },[])
    useEffect(() => {
        if(count == 0) {
            clearInterval(time.current);
            onBackToPrev();
            onClearTime();
        }
    }, [count])
    return (
        <div className='time_count'>{`00:${count >=10 ? count : `0${count}`}`}</div>   
    );
}

export default CountTime;