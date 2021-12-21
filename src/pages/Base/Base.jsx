import React, { useEffect,useLayoutEffect,useMemo,useRef, useState } from 'react';
import clsx from 'clsx';

import styleBase from './Base.module.scss';

import Body from './Body';
import Header from './Header';
import Overlay from './Overlay';



function Base({ header = '', body = '', overlay = '',isLoading, ...props }) {
    // console.log(`styleBase`, styleBase);
    
    var {propsHeader, propsBody, propsOverlay} = props;
    const elMain = useRef();
   
    const [visibleTopMain,setVisibleTopMain] = useState(false);

    useEffect(() => {
        elMain.current.addEventListener('scroll', () => {
            // isVisible = true;s
            // console.log('dang scroll');
            setVisibleTopMain(true);
        })

    }, [])

    if (visibleTopMain) {
        setTimeout(() => {
            setVisibleTopMain(false);
        },22000)
    }

    return (
        <>
            <div ref={elMain} className={clsx('container-sm', 'border', styleBase.main)}>
                <Header {...propsHeader } visibleTopMain={visibleTopMain}>
                    {header}
                </Header>
                <Body isLoading={isLoading}>
                    {body}
                </Body>
                <Overlay>
                    {overlay}
                </Overlay>
                {props.children}
            </div>
        </>

    );
}

export default Base;