import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styleBase from './Base.module.scss';


function Header({ children, ...props }) {
    let navigate = useNavigate();
    return (
        <div className={clsx(styleBase['main-top'], 'row', 'gx-0')}>
            <div className="">
                <div className={clsx(styleBase['container-back_button'])}>
                    <i className={clsx('bi', 'bi-chevron-left')}></i>
                </div>
            </div>

            <div className="">
                <div
                    className={clsx(
                        styleBase['between-flex']
                        , styleBase['container-home-and-question']
                    )}
                >
                    <i onClick={() => navigate('/start')} className={clsx('bi', 'bi-house-fill')}></i>
                    <i className={clsx('bi', 'bi-patch-question-fill')}></i>
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;