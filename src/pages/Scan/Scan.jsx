import CountTime from '../../components/CountTime';
import { CacheImageContext } from '../../Provider/CacheImageContext';
import { Base } from '../Base';
import BodyScan from './BodyScan';
import  './scan.scss';
function Scan({onCloseModal,questions, onBackToPrev,countdown ,...props}) {

    const config = {
        propsHeader: { RemoveHQ: true },
        body: <BodyScan questions={questions}></BodyScan>
    }

    return (
        <>
        <BodyScan questions={questions} onClearTime={onCloseModal} onBackToPrev={onBackToPrev}>

        </BodyScan>
        <div style={{position: 'absolute', top: 0, right: 0, color: 'white'}}>
            <CountTime firstValue={countdown} onClearTime={onCloseModal} onBackToPrev={onBackToPrev}/>
            <div className="popup-suggest_scan border" data-bs-toggle="modal" data-bs-target="#modalSuggest">
                <i class="bi bi-question"></i>
              </div>
        </div>
         
        </>
    );
}

export default Scan;