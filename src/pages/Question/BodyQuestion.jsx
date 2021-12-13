import clsx from 'clsx';
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';

import styleQuestion from './Question.module.scss';
import { useNavigate } from 'react-router-dom';
function BodyStart(props) {
    const settings = {
        className: styleQuestion['artifacts'],
        slidesToScroll: 1,
        slidesToShow: 4,
        variableWidth: true,
    };

    const navigate = useNavigate();

    return (
        <>
            <div className={clsx('row', 'gx-0')}>
                {/* <div className={clsx(styleQuestion['artifacts'])}> */}
                <Slider {...settings}>
                    <div className={clsx(styleQuestion['mySlides-artifacts'])}>
                        <div className={clsx(styleQuestion['mySlides-artifacts--item'])}></div>
                    </div>
                    <div className={clsx(styleQuestion['mySlides-artifacts'])}>
                        <div className={clsx(styleQuestion['mySlides-artifacts--item'])}></div>
                    </div>
                    <div className={clsx(styleQuestion['mySlides-artifacts'])}>
                        <div className={clsx(styleQuestion['mySlides-artifacts--item'], styleQuestion['icon-choice'])}></div>
                    </div>
                    <div className={clsx(styleQuestion['mySlides-artifacts'])}>
                        <div className={clsx(styleQuestion['mySlides-artifacts--item'])}></div>
                    </div>
                    <div className={clsx(styleQuestion['mySlides-artifacts'])}>
                        <div className={clsx(styleQuestion['mySlides-artifacts--item'])}></div>
                    </div>
                    <div className={clsx(styleQuestion['mySlides-artifacts'])}>
                        <div className={clsx(styleQuestion['mySlides-artifacts--item'])}></div>
                    </div>
                    <div className={clsx(styleQuestion['mySlides-artifacts'])}>
                        <div className={clsx(styleQuestion['mySlides-artifacts--item'])}></div>
                    </div>
                    <div className={clsx(styleQuestion['mySlides-artifacts'])}>
                        <div className={clsx(styleQuestion['mySlides-artifacts--item'])}></div>
                    </div>
                   

                </Slider>
                {/* </div> */}
            </div>

            <div className={clsx('row', 'gx-0', styleQuestion['container-decription-history'])}>
                <p>Đây là bộ sưu tập thời đại Hùng Vương và giai đoạn văn hóa Phùng Nguyên, Phú Thọ ok</p>
            </div>
            <div
                className={clsx('row', 'align-items-center', 'justify-content-center')}
            >
                <div
                    onClick={() => navigate('/scan')}
                    className={clsx('col-3', 'btn', styleQuestion['btn-mobile'], styleQuestion['btn-scan'])}
                >
                    QUÉT
                </div>

            </div>
        </>
    );
}

export default BodyStart;