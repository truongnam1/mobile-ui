import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import _ from 'lodash'
import { ToastContainer, ToastMessage } from "react-toastr";
function Toast({ text, type, top, left, time }) {
    // const [count, setCount] = useState(time || 3);
    const timeRef = useRef();
    const container = useRef();
    // useEffect(() => {
    //     timeRef.current = setInterval(() => {
    //         setCount(prev => prev - 1);
    //     }, 1000);

    // }, []);

    // useEffect(() => {
    //     if (count == 0) {
    //         clearInterval(timeRef.current);
    //     }
    // }, [count])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            container.current.clear();
            clearTimeout(timeOut);
        }, 2000)
    },[])

    useEffect(() => {
        return () => {
            container.current = {};
        }
    })


    useEffect(() => {
        if (type == 'suc' && !_.isEmpty(container.current)) {
            container.current.success(text);
        } else if (type == 'wrong' && !_.isEmpty(container.current)) {
            container.current.error(text);
        }
    }, [container.current])

    // const render = () => {

    //     if (count == 0) return <></>;
    //     else return (
    //         // <div className='row toast_map' style={{top: top || 0, left: left || 0 }}>
    //         //     <div className="col-sm-2" >
    //         //         {type == 'suc' ?  <img src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/12/000000/external-verification-tick-mark-for-digital-certification-document-basic-filled-tal-revivo.png" />

    //         //         : <img src="https://img.icons8.com/color-glass/12/000000/break.png" />
    //         //         }
    //         //     </div>
    //         //     <div className="col-sm-10" style={{ textAlign: 'left', paddingLeft: '2px'}}>
    //         //         <span className="text_toast_map">{text}</span>
    //         //     </div>
    //         // </div>
    //         <ToastContainer
    //             ref={container}
    //             className="toast-top-right"
    //         />
    //     )
    // }
    // return (
        // <ToastContainer
        //     ref={container}
        //     className="toast-top-right"
        // />
    // )

    return (
        <ToastContainer
            ref={container}
            className="toast-top-right"
        />
    )


}

export default Toast;