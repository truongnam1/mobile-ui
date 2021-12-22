import clsx from 'clsx';
import styleBase from './Base.module.scss';

import React, { useRef,useEffect } from 'react';

function Body({children,isLoading, ...props}) {
    console.log(`props`, props);
    console.log(`children`, children);
    return (
        <>
            <div className={clsx(styleBase['main-body'])} >
                {children}
                {isLoading && 
                    <>
                        <div className="spinner-border text-primary" role="status" style={{position: 'fixed', top: '50%', right: '50%'}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <span style={{position: 'fixed', top: '50%', right: '45%', zIndex: 3000}}>{props?.text}</span>
                    </>
                    
                }
               
            </div>
        </>

    );
}

export default Body;