import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import styleScan from './Scan.module.scss';
import ScanQr from './ScanQr.js';
// import toastr from 'reactjs-toastr';
// import 'reactjs-toastr/lib/toast.css';
import 'animate.css';
import AnimationText from '../../components/Text';
import Toast from '../../components/Toast';
import { useNavigate } from 'react-router-dom';
function BodyScan({ ...props }) {
    const navigate = useNavigate();
    let { questions, onClearTime,onBackToPrev } = props;

    const [showText, setShowText] = useState(false);
    const [dataToast, setDataToast] = useState({});

    const scanQr = useMemo(() => {
        console.log('khoi tao');
        return new ScanQr();
    }, []);
    // const preventSpamToast = useRef(0);
    useEffect(() => {
        console.log(`props`, props);
        console.log(`question scan`, questions);
        // scanQr._start();
        return () => scanQr._stopCamera();
    }, []);

    // console.log(typeof preventSpamToast);

    // const valueOfToast = (value) => {
    //     console.log("value", value);
    //     if (value == 'wrong') {
    //         console.log("preventSpamToast", preventSpamToast.current);
    //         if (preventSpamToast.current == 0) {
    //             setShowText(value);
    //             preventSpamToast.current = 1;
    //             const timeOut = setTimeout(() => {
    //                 preventSpamToast.current = 0;
    //                 setShowText(false);
    //                 clearTimeout(timeOut);
    //             }, 3000)
    //         }

    //     } else {
    //         setShowText(value);
    //         setTimeout(() => {
    //             setShowText(false);
    //             onClearTime();
    //         }, 3000);
    //     }

    // }
    // useEffect(() => {
    //     // console.log("oi odi oi");
    //     if (questions) {
    //         console.log("preventSpamToast", preventSpamToast);
    //         scanQr.question(questions.correct_answer, (value) => {
    //             console.log('callback question');


    //             return valueOfToast(value);
    //         });
    //     } else {
    //         console.log('wrong');
    //         scanQr._checkIn();
    //     }
    // }, [])

    useEffect(() => {
        // console.log("oi odi oi");
        if (questions) {
            // console.log("preventSpamToast", preventSpamToast);
            // scanQr.question(questions.correct_answer, () => {
            //     console.log('dap an chinh xac');


            //     // return valueOfToast(value);
            // }, () => {
            //     console.log('dap an sai');
            // });

            scanQr.question(questions.correct_answer, {
                cbCorrect: () => {
                    console.log('dap an chinh xac');
                    setDataToast({ status: 'success', text: 'Chúc mừng bạn đã tìm đúng địa điểm', })
                    setShowText(true);
                    setTimeout(() => {
                        setShowText(false);
                        onClearTime();
                    }, 2000)
                },
                cbWrong: () => {
                    console.log('dap an sai');
                    setDataToast({ status: 'wrong', text: 'Địa điểm hiện tại không chính xác', hash: new Date() })
                    setShowText(true);
                    const timeOut = setTimeout(() => {
                        setShowText(false);
                        clearTimeout(timeOut);
                    }, 2000);

                }
            })

        } else {
            scanQr._checkIn((data) => {
                if (data) {
                    const dataString = JSON.stringify(data);
                    // console.log(dataString);
                    sessionStorage.setItem('dataMap', dataString);
                    navigate('/map')

                }
            });
        }
    }, [])


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
                    {/* {showText == 'right' ? <Toast text={"Hoàn toàn chính xác"} type={'suc'} top={'5%'} left={'46%'} time={3} />
                        : showText == 'wrong' ? <Toast text={"Sai rồi"} type={'wrong'} top={'5%'} left={'46%'} time={3} /> : <></>

                    } */}

                    {showText ? <Toast {...{ dataToast }} /> : <></>}
                </div>
                {modalSuggest()}
            </div>
        </div>
    );
}

export default BodyScan;