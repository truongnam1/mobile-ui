import React, { useEffect, useState } from 'react';
import Puzzle from 'react-image-puzzle';
import CountTime from '../../../components/CountTime';
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib'
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'
import FetchData from '../../../assets/js/fetchData';
function XepHinh({ onCloseModal, questions, onBackToPrev }) {

    const [dataReturn, setDataReturn] = useState(<div></div>);
    useEffect(() => {

        FetchData.urlItem(questions.image_id, (urlImage) => {
            console.log(`urlImage`, urlImage);
            setDataReturn(
                <div className="row">
                    <div className="col-sm-2">
                        <CountTime firstValue={40} onClearTime={onCloseModal} onBackToPrev={onBackToPrev} />
                    </div>
                    <div className="col-5-sm" style={{ margin: '15px auto', textAlign: 'center' }}>
                        <span>Trò chơi ghép hình</span>

                    </div>
                    <div className="col-sm-11" style={{ margin: '15px auto', textAlign: 'center', border: '1px solid' }}>
                        {/* <Puzzle
                            image='https://hinhnen123.com/wp-content/uploads/2021/07/Bo-suu-tap-1001-hinh-anh-mang-dep-an-tuong-nhat-nam-2021.jpg'
                            onDone={() => {
                                onCloseModal();
                            }}
                            level={2}
                            className="asd"
                            style={{margin: 'auto'}}
                        /> */}
                        <JigsawPuzzle
                            imageSrc={urlImage}
                            rows={2}
                            columns={3}
                            onSolved={() => onCloseModal()}
                        />
                    </div>
                    <div className="col-5-sm" style={{ margin: '15px auto', textAlign: 'center' }}>
                        <span>Hình mẫu</span>
                    </div>
                    <div className="col-11-sm" style={{ margin: '15px auto', textAlign: 'center' }}>
                        <img src={urlImage}
                            style={{ height: '200px', width: '200px' }} />
                    </div>
                </div>

            );
        })
    }, [])
    return dataReturn;

}

export default XepHinh;