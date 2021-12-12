import React from 'react';
import styleComplete from './Complete.module.scss';
import styleBase from '../Base/Base.module.scss';
import styleHoaRoi from '../../assets/scss/base/Effects/Hoaroi.module.scss';

import clsx from 'clsx';

function HeaderComplete(props) {
    return (
        <>
            <div className={clsx(styleComplete['background-main'])}>
                <div className={clsx(styleComplete['background-screen-winner'])}></div>
                <div className={clsx(styleComplete['image-huychuong'])}></div>
                <div
                 
                    className={clsx(styleHoaRoi['container-effect'], 'js-hoa-roi')}
                ></div>
            </div>
        </>
    );
}

export default HeaderComplete;