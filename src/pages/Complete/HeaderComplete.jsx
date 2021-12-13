import React, { useEffect, useRef, useState } from 'react';
import styleComplete from './Complete.module.scss';
import styleBase from '../Base/Base.module.scss';
import styleHoaRoi from '../../assets/scss/base/Effects/Hoaroi.module.scss';
import HoaRoi from '../../assets/js/effects/HoaRoi';
import clsx from 'clsx';

function HeaderComplete(props) {
    const refContainerHoaRoi = useRef();

    useEffect(() => {
        if (refContainerHoaRoi.current) {
            console.log('khoi tao hoa roi');
            window.confettiful = new HoaRoi(refContainerHoaRoi.current);
        }

        return () => {
            console.log('huy hoa roi');
            clearInterval(window.confettiful.confettiInterval);
        }
    }, []);


   

    return (
        <>
            <div className={clsx(styleComplete['background-main'])}>
                <div className={clsx(styleComplete['background-screen-winner'])}></div>
                <div className={clsx(styleComplete['image-huychuong'])}></div>
                <div
                    ref={refContainerHoaRoi}
                    className={clsx(styleHoaRoi['container-effect'])}
                ></div>
            </div>
        </>
    );
}

export default HeaderComplete;