import React, { useEffect, useRef } from 'react';
import styleHoaRoi from '../../assets/scss/base/Effects/Hoaroi.module.scss';
import HoaRoi from '../../assets/js/effects/HoaRoi';
import clsx from 'clsx';

function HoaRoiComponent(props) {
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
    <div
        ref={refContainerHoaRoi}
        className={clsx(styleHoaRoi['container-effect'])}
    ></div>
    );
}

export default HoaRoiComponent;