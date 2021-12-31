import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import styleScan from './Scan.module.scss';
import ScanQr from './ScanQr.js';
// import toastr from 'reactjs-toastr';
// import 'reactjs-toastr/lib/toast.css';
import 'animate.css';
import AnimationText from '../../components/Text';
import Toast from '../../components/Toast';
function BodyScan({ ...props }) {

    let { questions, onClearTime, onBackToPrev } = props;
    console.log(`props`, props);
    console.log(`question scan`, questions);
    const [showText, setShowText] = useState(false);
    const scanQr = useMemo(() => {
        // const scanQr = new ScanQr();
        console.log('khoi tao');
        return new ScanQr();
    }, []);

    useEffect(() => {
        // scanQr._start();
        return () => scanQr._stopCamera();
    }, []);

    useEffect(() => {
        if (questions) {

            scanQr.question(questions.correct_answer, () => {
                console.log('callback question');
                setShowText(true);
                setTimeout(() => {
                    setShowText(false);
                    onClearTime();
                }, 3000)
            });
        } else {
            console.log('wrong');
            scanQr._checkIn();
        }
    },[])


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
        <div className={clsx(styleScan['camera'])}>
            <div className={clsx('row')}>
                <div className={clsx('col', styleScan['view-camera'])} >
                    <div className={clsx('w-100')} id="reader"></div>
                </div>

            </div>
            <div className={clsx('row', 'flex-grow-1', styleScan['control-camera'])} >
                <div className={clsx('text-center', 'col-6', styleScan['item-control-camera'])} >
                    <i className={clsx('bi', 'bi-brightness-high')} ></i>
                </div>
                <div
                    className={clsx('text-center', 'col-6', styleScan['item-control-camera'], styleScan['switch-camera'])} >
                    <i
                        onClick={() => {
                            scanQr._changeCamera();
                        }}
                        className={clsx('bi', 'bi-camera')}
                    >
                    </i>
                    {/* <i className={clsx('bi', 'bi-camera-fill',)}></i> */}
                    {/* {showText && <AnimationText text={"Chính xác"} size={'100px'} top={'30%'} left={'36%'} color={'green'}/>} */}
                    {showText && <Toast text={"Hoàn toàn chính xác"} type={'suc'} top={'5%'} left={'46%'} time={2}/>}
                </div>
                {modalSuggest()}
            </div>
        </div>
    );
}

export default BodyScan;