import clsx from 'clsx';
import styleStart from './Start.module.scss';
import styleBase from '../Base/Base.module.scss';
import { useNavigate } from 'react-router-dom';

function BodyStart(props) {
    const navigate = useNavigate();
    return (
        <>
            <div className={clsx('row')}>
                <div className={clsx(styleStart['image-start'])}>
                    <img src={process.env.PUBLIC_URL + "/assets/images/start.png"} alt="" />
                </div>
            </div>
            <div className={clsx(styleBase['center-flex'], 'row', 'mt-2')}>
                <div 
                onClick={() => {
                    navigate('/scan');
                }}
                className={clsx('btn', 'col-4', styleBase['btn-mobile'], styleStart['btn-start'])}>
                    Bắt đầu1
                </div>

            </div>
        </>
    );
}

export default BodyStart;