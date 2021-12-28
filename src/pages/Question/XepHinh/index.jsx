import React, { useEffect, useState } from 'react';
import CountTime from '../../../components/CountTime';
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib'
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'
import FetchData from '../../../assets/js/fetchData';

import styleXepHinh from './XepHinh.module.scss'
import clsx from 'clsx';
function XepHinh({ onCloseModal, questions, onBackToPrev }) {

    const [urlImage, setUrlImage] = useState(false);

    useEffect(() => {
        FetchData.urlItem(questions.image_id, (urlImage) => {
            setUrlImage(urlImage);
        }
        )
    }, [])
    const modalSuggest = () => {
        return (
            <div className="modal fade" tabIndex="-1" id="modalSuggestXepHinh" aria-labelledby="modalSuggestXepHinh" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                  <h5 className="modal-title">Gợi ý</h5>
                </div> */}
                        <div className="modal-body d-flex align-items-center justify-content-center" style={{ minHeight: "100px" }}>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            <div className="container">
                                <div className="row mt-2">
                                    <span className='text-center'>Hình mẫu</span>
                                </div>
                                <div className="row">
                                    {urlImage && <img className='mx-auto' src={urlImage} style={{ maxHeight: '50vh' }} />}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div style={{
                'touchAction': 'none'
            }}>

                <div className="count-time">
                    <i class="bi bi-alarm-fill"></i>
                    <CountTime firstValue={600} onClearTime={onCloseModal} onBackToPrev={onBackToPrev} />

                </div>

                <div className="question-box">
                    <div className="row question-item content-question">
                        <div className='text-question col-10 shadow'>
                            {questions.desc}
                            <div className="popup-suggest border" data-bs-toggle="modal" data-bs-target="#modalSuggestXepHinh">
                                <i class="bi bi-question"></i>
                            </div>
                        </div>
                    </div>

                    <div className="question-item" 
                    className={clsx('question-item', styleXepHinh['box-xepHinh'])}
                  >
                        {urlImage && <JigsawPuzzle
                            imageSrc={urlImage}
                            rows={2}
                            columns={3}
                            onSolved={() => onCloseModal()}
                        />}
                    </div>
                </div>

            </div>
            {modalSuggest()}
        </>

    )

}

export default XepHinh;