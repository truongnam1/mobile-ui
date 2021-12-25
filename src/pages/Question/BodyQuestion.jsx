import clsx from 'clsx';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styleQuestion from './Question.module.scss';
import { useNavigate } from 'react-router-dom';
import TracNghiem from './TracNghiem';
import XepHinh from './XepHinh';
import Scan from '../Scan/Scan';
function BodyQuestion({ questions, onCloseModal, onBackToPrev, randomAngle }) {
    var arrIndexQuestion = JSON.parse(sessionStorage.getItem('arrIndexQuestion'));

    // var arrIndexQuestion = [1,2,3,4,5];

    // console.log(arrIndexQuestion);
    // const indexQuestionRd =  arrIndexQuestion[Math.floor(Math.random()* arrIndexQuestion.length)];

    // const indexQuestionRd = Math.floor(Math.random() * 5);

    // const [typeQuestion, setTypeQuestion] = useState(questions[indexQuestionRd]);

    // const typeQuestion = questions[indexQuestionRd];

    // arrIndexQuestion =  arrIndexQuestion.filter(indexQuestion => indexQuestion !== indexQuestionRd)
    // sessionStorage.setItem('arrIndexQuestion', `[${arrIndexQuestion.toString()}]`);
    console.log('set lai index');

    // const typeQuestion = useMemo(() => {
    //     var arrIndexQuestion = JSON.parse(sessionStorage.getItem('arrIndexQuestion'));

    //     console.log(arrIndexQuestion);
    //     // const indexQuestionRd =  arrIndexQuestion[Math.floor(Math.random()* arrIndexQuestion.length)];

    //     const indexQuestionRd = Math.floor(Math.random() * 5);

    //     return questions[indexQuestionRd];
    // }, []);


    const [typeQuestion, setTypeQuestion] = useState(() => {
        var indexQuestionRd = Math.floor(Math.random()* arrIndexQuestion.length);
        sessionStorage.setItem('testKey' + indexQuestionRd, indexQuestionRd);
        return questions[indexQuestionRd];
    },[]);

    // const [typeQuestion, setTypeQuestion] = useState(questions[2]);

    const navigate = useNavigate();
    console.log(`typeQuestion`, typeQuestion);


    const questionItem = useMemo(() => {
        console.log('type', typeQuestion.type);

        switch (typeQuestion.type) {
            case 'trac_nghiem':
                const rd = Math.random();
                console.log('rd', rd);
                return (<TracNghiem
                    onCloseModal={onCloseModal}
                    questions={typeQuestion}
                    onBackToPrev={onBackToPrev}
                    rd={rd}
                />)

            case 'xep_hinh':
                return (<XepHinh
                    onCloseModal={onCloseModal}
                    questions={typeQuestion}
                    onBackToPrev={onBackToPrev}
                />)

            case 'scan':

                return (<Scan
                    onCloseModal={onCloseModal}
                    questions={typeQuestion}
                    onBackToPrev={onBackToPrev}
                ></Scan>)
            default:
                return <><h2>loi</h2></>

        }


    },[])
    // const questionItem = () => {
    //     console.log('type', typeQuestion.type);
    //     switch (typeQuestion.type) {
    //         case 'trac_nghiem':
    //             const rd = Math.random();
    //             console.log('rd', rd);
    //             return (<TracNghiem
    //                 onCloseModal={onCloseModal}
    //                 questions={typeQuestion}
    //                 onBackToPrev={onBackToPrev}
    //                 rd={rd}
    //             />)

    //         case 'xep_hinh':
    //             return (<XepHinh
    //                 onCloseModal={onCloseModal}
    //                 questions={typeQuestion}
    //                 onBackToPrev={onBackToPrev}
    //             />)

    //         case 'scan':

    //             return (<Scan
    //                 onCloseModal={onCloseModal}
    //                 questions={typeQuestion}
    //                 onBackToPrev={onBackToPrev}
    //             ></Scan>)
    //         default:
    //             return <><h2>loi</h2></>

    //     }

    // }
    

    return (
        <>
            <div className={clsx(styleQuestion['main-question'])}>
                {questionItem}
            </div>
        </>
    );
}

export default BodyQuestion;