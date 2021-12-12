import clsx from 'clsx';
import styleBase from './Base.module.scss';

import React from 'react';

function Body({children, ...props}) {
    console.log(`props`, props);
    console.log(`children`, children);
    return (
        <>
            <div className={clsx(styleBase['main-body'])} >
                {children}
            </div>
        </>

    );
}

export default Body;