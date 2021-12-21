import React from 'react';
import Puzzle from 'react-image-puzzle';
function XepHinh({onCloseModal,questions, onBackToPrev}) {
    return (
        <div className="row">
            <div className="col-5-sm" style={{margin: '15px auto', textAlign: 'center'}}>
                <span>Trò chơi ghép hình</span>
                
            </div>
            <div className="col-sm-11" style={{margin: '15px auto', textAlign: 'center'}}>
                <Puzzle
                    image='https://hinhnen123.com/wp-content/uploads/2021/07/Bo-suu-tap-1001-hinh-anh-mang-dep-an-tuong-nhat-nam-2021.jpg'
                    onDone={() => {
                        onCloseModal();
                    }}
                    level={3}
                    className="asd"
                    style={{margin: 'auto'}}
                />
            </div>
            <div className="col-5-sm" style={{margin: '15px auto', textAlign: 'center'}}>
                <span>Hình mẫu</span>  
            </div>
            <div className="col-11-sm" style={{margin: '15px auto', textAlign: 'center'}}>
                    <img src='https://hinhnen123.com/wp-content/uploads/2021/07/Bo-suu-tap-1001-hinh-anh-mang-dep-an-tuong-nhat-nam-2021.jpg' 
                    style={{height: '200px', width: '200px'}}/>
            </div>
        </div>
       
    );
}

export default XepHinh;