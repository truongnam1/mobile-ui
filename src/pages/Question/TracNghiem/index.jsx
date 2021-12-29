import React, { useState, useRef, useEffect } from 'react';
import CountTime from '../../../components/CountTime';
import './tracnghiem.scss'
function TracNghiem({ onCloseModal, questions, onBackToPrev }) {
  const [isChoose, setIsChoose] = useState();
  const toast = useRef();
  const [pick, setPick] = useState(false);
  const answer = useRef(5);
  const [stopTime, setStopTime] = useState(false);


  // useEffect(() => {
  //   return () => {
  //     const backDrop = document.querySelector('.modal-backdrop');
  //     if(backDrop.classList.contains('show')) {
  //         backDrop.remove();
  //     }
  //   }
  // }, [])
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
                }, 2000);
                const timeToOut = setTimeout(() => {
                  if (answer.current != questions?.answer) {
                    onCloseModal('timeover');
                    onBackToPrev();
                  } else onCloseModal();
                  clearTimeout(timeToOut);
                }, 4000)
              }}>Chọn</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const modalSuggest = () => {
    return (
      <div className="modal fade" tabIndex="-1" id="modalSuggest" aria-labelledby="modalSuggest" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <div className="modal-header">
              <h5 className="modal-title">Gợi ý</h5>
            </div> */}
            <div className="modal-body d-flex align-items-center justify-content-center" style={{ minHeight: "100px" }}>
              {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
              Gợi ý: {questions?.suggest}
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <>
     
        <div className="count-time">
        <i class="bi bi-alarm-fill"></i>
          <CountTime firstValue={1} onClearTime={onCloseModal} onBackToPrev={onBackToPrev} onChangeStatusTime={stopTime} />
           
        </div>

        <div className="question-box">
          <div className="row question-item content-question">
            <div className='text-question col-10 shadow'>
              {questions.question}

              <div className="popup-suggest border" data-bs-toggle="modal" data-bs-target="#modalSuggest">
                <i class="bi bi-question"></i>
              </div>

            </div>
          </div>

          <div className="question-item content-selects">
            {questions.selects.map((item, index) => {
              return (
                <div key={index} data-bs-toggle="modal" data-bs-target={answer.current == 5 ?"#exampleModal" : ""}
                  className='row content-select'
                >
                  <div className={`text-select col-10 shadow-sm ${isChoose == index ? 'choose' : ''} ${answer.current == index && isChoose == 5 ? answer.current == questions?.answer ? 'blink-text' : 'wrong' : ''}`}
                    onClick={() => {
                      if(answer.current == 5) {
                        setIsChoose(index);
                        const pick = setTimeout(() => {
                          answer.current = index;
                          clearTimeout(pick)
                        }, 0)
                      }
                      
                    }}
                  >
                    {item}
                  </div>
                </div>


              )
            })}
          </div>
        </div>
        {/* <div className='suggest'>
          Gợi ý: {questions?.suggest}
        </div> */}
        {AreYouSureAboutThat()}
        {modalSuggest()}
     
    </>

  );
}

export default TracNghiem;