import clsx from 'clsx';
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';

import styleStart from './Start.module.scss';
import styleBase from '../Base/Base.module.scss';
import { useNavigate } from 'react-router-dom';

function BodyStart(props) {
    const navigate = useNavigate();
    return (
        <>
            <div className={clsx('row')}>
                <div className={clsx(styleStart['image-start'])}>
                    <img src="../assets/image/start.png" alt="" />
                </div>
            </div>
            <div className={clsx(styleBase['center-flex'], 'row', 'mt-2')}>
                <div 
                onClick={() => {
                    navigate('/question');
                }}
                className={clsx('btn', 'col-4', styleBase['btn-mobile'], styleStart['btn-start'])}>
                    Bắt đầu1
                </div>

            </div>
        </>
    );
}

export default BodyStart;