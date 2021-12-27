import React, { useEffect, useState } from 'react';
import CountTime from '../../../components/CountTime';
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib'
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'
import FetchData from '../../../assets/js/fetchData';

import styleXepHinh from './XepHinh.module.scss'
function XepHinh({ onCloseModal, questions, onBackToPrev }) {

    const [urlImage, setUrlImage] = useState(false);

    useEffect(() => {
        FetchData.urlItem(questions.image_id, (urlImage) => {
            setUrlImage(urlImage);
        }
        )
    }, [])

    return (
        // <div className="row">
        //     <div className="col-sm-2">
        //         <CountTime firstValue={4000} onClearTime={onCloseModal} onBackToPrev={onBackToPrev} />
        //     </div>
        //     <div className="col-5-sm" style={{ margin: '15px auto', textAlign: 'center' }}>
        //         <span>Trò chơi ghép hình</span>

        //     </div>
        //     <div className="col-sm-11" 
        //     style={{ margin: '15px auto', textAlign: 'center', border: '1px solid' }}>
        //         <JigsawPuzzle
        //             imageSrc={urlImage}
        //             rows={2}
        //             columns={3}
        //             onSolved={() => onCloseModal()}
        //         />
        //     </div>
        //     <div className="col-5-sm" style={{ margin: '15px auto', textAlign: 'center' }}>
        //         <span>Hình mẫu</span>
        //     </div>
        //     <div className="col-11-sm" style={{ margin: '15px auto', textAlign: 'center' }}>
        //         <img src={urlImage}
        //             style={{ height: '200px', width: '200px' }} />
        //     </div>
        // </div>

        <div className="container-sm border" style={{
            'touchAction': 'none'
        }}>
            <div className="row">
                <CountTime firstValue={10} onClearTime={onCloseModal} onBackToPrev={onBackToPrev} />
            </div>
            <div className="row">
                <span className='text-center'>Trò chơi ghép hình</span>
            </div>
            <div className="row border" style={{maxHeight : "60vh"}}>
               {urlImage && <JigsawPuzzle
                    imageSrc={urlImage}
                    rows={2}
                    columns={3}
                    onSolved={() => onCloseModal()}
                />}
            </div>
            <div className="row mt-2">
                <span className='text-center'>Hình mẫu</span>
            </div>
            <div className="row">
            {urlImage && <img className='mx-auto' src={urlImage} style={{ width: '200px' }} />}
            </div>

        </div>

    )

}

export default XepHinh;