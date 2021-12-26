import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styleBase from './Base.module.scss';

import Body from './Body';
import Header from './Header';
import Overlay from './Overlay';
import { store, useGlobalState } from 'state-pool';



function Base({ isLoading, ...props }) {
    // console.log(`styleBase`, styleBase);
    


    var { propsHeader, propsBody, propsOverlay } = props;
    var { top, header, headerBody, body, overlay } = props;
    const elMain = useRef();

    const [visibleTopMain, setVisibleTopMain] = useState(false);

    useEffect(() => {
        
        elMain.current.addEventListener('scroll', () => {
            // isVisible = true;s
            // console.log('dang scroll');
            setVisibleTopMain(true);
        })

        setTimeout(() => {
            console.log('scroll top');
            elMain.current.scrollTop = 10;
        }, 10000)

    }, [])

    if (visibleTopMain) {
        setTimeout(() => {
            setVisibleTopMain(false);
        }, 2000)
    }
    
    useLayoutEffect(() => {
        store.setState('elMain', elMain);
    },[])

    return (
        <>
            <div ref={elMain} className={clsx('container-sm', 'border', styleBase.main)}>
                {top}
                <Header {...propsHeader} visibleTopMain={visibleTopMain}>
                    {header}
                </Header>
                {headerBody}
                <Body isLoading={isLoading} {...props}>
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
