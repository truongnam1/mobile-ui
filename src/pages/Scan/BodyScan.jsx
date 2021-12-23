import clsx from 'clsx';
import { useEffect, useMemo, useRef } from 'react';
import styleScan from './Scan.module.scss';
import ScanQr from './ScanQr.js';
// import toastr from 'reactjs-toastr';
// import 'reactjs-toastr/lib/toast.css';
import 'animate.css';
function BodyScan({ ...props }) {

    var { questions, onClearTime, onBackToPrev } = props;
    console.log(`props`, props);
    console.log(`question scan`, questions);

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
               
                setTimeout(() => {
                    onClearTime();
                }, 2000)
            });
        } else {
            scanQr._checkIn();
        }
    })



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
                </div>

            </div>
        </div>
    );
}

export default BodyScan;