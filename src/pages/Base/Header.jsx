import clsx from 'clsx';
// import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styleBase from './Base.module.scss';


function Header({ children, visibleTopMain,onSetTypeModal, ...props }) {
    let navigate = useNavigate();
    // console.log(`propsHeader`, props);
    const { RemoveHQ, removeBack } = props;

    // const elTop = useRef();
    // console.log(`visibleTopMain`, visibleTopMain);

    return (
        <div
            className={clsx
                (
                    styleBase['main-top']
                    , 'row'
                    , 'gx-0'
                    , {
                        "position-fixed": visibleTopMain,
                        [styleBase['display-none']]: !visibleTopMain
                    }

                )
            }>
            <div className={clsx(
                {
                    [styleBase['display-none']]: removeBack
                }
            )}>
                {/* <div className={clsx(styleBase['container-back_button'])}>
                    <i
                        onClick={() => navigate('/start')}
                        className={clsx('bi', 'bi-chevron-left')}
                    >
                    </i>
                </div> */}
            </div>
            <div
                className={clsx(
                    styleBase['between-flex']
                    , styleBase['container-home-and-question'],
                    { [styleBase['display-none']]: RemoveHQ }

                )}
            >
                <i onClick={() => navigate('/start')} className={clsx('bi', 'bi-house-fill')}></i>
                <i className={clsx('bi', 'bi-patch-question-fill')} onClick={() => {
                    onSetTypeModal('map');
                }}></i>
            </div>
            {children}
        </div>
    );
}

export default Header;