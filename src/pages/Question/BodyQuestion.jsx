import clsx from 'clsx';
import { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styleQuestion from './Question.module.scss';
import { useNavigate } from 'react-router-dom';
import TracNghiem from './TracNghiem';
import XepHinh from './XepHinh';
import Scan from '../Scan/Scan';
function BodyQuestion({ questions, onCloseModal, onBackToPrev, randomAngle }) {
    // const [typeQuestion, setTypeQuestion] = useState(questions[randomAngle % questions.length]);
    const [typeQuestion, setTypeQuestion] = useState(questions[0]);

    console.log(randomAngle);
    const navigate = useNavigate();
    console.log(`typeQuestion`, typeQuestion);
    const questionItem = () => {
        switch (typeQuestion.type) {
            case 'trac_nghiem':

                return (<TracNghiem
                    onCloseModal={onCloseModal}
                    questions={typeQuestion}
                    onBackToPrev={onBackToPrev}
                />)

            case 'xep_hinh':
                return (<XepHinh
                    onCloseModal={onCloseModal}
                    questions={questions[0]}
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

    }

    return (
        <>
            <div className={clsx(styleQuestion['main-question'])}>
                {questionItem()}
            </div>
        </>
    );
}

export default BodyQuestion;