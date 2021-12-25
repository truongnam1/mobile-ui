import React, {useState,useRef} from 'react';
import CountTime from '../../../components/CountTime';
import './tracnghiem.css'
function TracNghiem({onCloseModal,questions, onBackToPrev}) {
    const [isChoose, setIsChoose] = useState();
    const toast = useRef();
    const [pick, setPick] = useState(false);
    const answer = useRef();
    const [stopTime, setStopTime] = useState(false);
    const AreYouSureAboutThat = () => {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div> */}
                <div className="modal-body">
                  Bạn có chắc muốn chọn đáp án này?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                    setIsChoose(5);
                    answer.current = 5;
                }}>Hủy</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                     setStopTime(true);
                     const time = setTimeout(() => {
                        setIsChoose(5);
                        
                        clearTimeout(time);
                     },2000);
                     const timeToOut = setTimeout(() => {
                         onCloseModal();
                         if(answer.current != questions?.answer) {
                            onBackToPrev();
                         }
                         clearTimeout(timeToOut);
                     }, 4000)
                  }}>Chọn</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
    console.log('screen trac nghiem');
    return (
        <div className="row">
                    <div className="col-sm-2" style={{marginLeft: 'auto', textAlign: 'left'}}>
                        <CountTime firstValue={50} onClearTime={onCloseModal} onBackToPrev={onBackToPrev} onChangeStatusTime={stopTime}/>
                    </div>
                    <div className="col-sm-11"  style={{margin: '15px auto', padding: '10px', background: 'pink', borderRadius: '20px'}}>
                        <p style={{wordBreak: 'break-all'}}>Câu hỏi: {questions?.question}</p>
                    </div>
                    {questions?.selects.map((item, index) => {
                        return (
                            <div ref={index} data-bs-toggle="modal" data-bs-target="#exampleModal" 
                            className={`col-sm-7 ${isChoose == index ? 'choose':''} ${ answer.current == index ? answer.current == questions?.answer ? 'blink-text' : 'wrong':''}`} 
                            style={{margin: '10px auto', background: 'pink', borderRadius: '20px', padding: '5px'}}
                            onClick={() => {
                                setIsChoose(index);
                                const pick = setTimeout(() => {                               
                                    answer.current = index;
                                    clearTimeout(pick)
                                },0)
                            }}
                            >
                                <span style={{paddingLeft: '10px'}}>{item}</span>
                            </div>
                        )
                    })}

                    <div className="col-sm-9"  style={{margin: '15px auto', padding: '10px', background: 'pink', borderRadius: '10px'}}>
                        <span>
                            Gợi ý:{questions?.suggest}
                        </span>
                    </div>
                    {AreYouSureAboutThat()}
                </div>
    );
}

export default TracNghiem;