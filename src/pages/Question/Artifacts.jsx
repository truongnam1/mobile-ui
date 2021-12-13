import clsx from "clsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styleQuestion from './Question.module.scss';
import FetchData from "../../assets/js/fetchData";
import { useEffect, useMemo, useState } from "react";

function Artifacts(props) {
    const settings = {
        className: styleQuestion['artifacts'],
        slidesToScroll: 1,
        // slidesToShow: 4,
        variableWidth: true,
    };

    const [artifacts, setArtifacts] = useState([]);

    useEffect(() => {
        const fetchData = new FetchData();

        fetchData.question(
            (data) => {
                setArtifacts(data);
            }
        )

    }, [])


    return (
        <Slider {...settings}>
            {/* <div className={clsx(styleQuestion['mySlides-artifacts'])}>
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
            </div> */}

            {
               artifacts.questions && artifacts.questions.map(({ id, ...rest }, index) => (
                    <div key={index} className={clsx(styleQuestion['mySlides-artifacts'])}>
                        <div className={clsx(styleQuestion['mySlides-artifacts--item'])}>{index}</div>
                    </div>
                ))
            }
            </Slider>

    );
}

export default Artifacts;