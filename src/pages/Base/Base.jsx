import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styleBase from './Base.module.scss';

import Body from './Body';
import Header from './Header';
import Overlay from './Overlay';
import { store } from 'state-pool';



function Base({ isLoading, onSetTypeModal, visibleNavbar = true, ...props }) {
    // console.log(`styleBase`, styleBase);



    var { propsHeader, propsBody, propsOverlay } = props;
    var { top, header, headerBody, body, overlay } = props;
    const elMain = useRef();

    const [visibleTopMain, setVisibleTopMain] = useState(false);

    useEffect(() => {
        function handleVisibleTopMain() {
            setVisibleTopMain(true);
        }

        elMain.current.addEventListener('scroll', handleVisibleTopMain);

        return () => elMain.current?.removeEventListener('scroll', handleVisibleTopMain);

    }, [])

    if (visibleTopMain) {
        setTimeout(() => {
            setVisibleTopMain(false);
        }, 2000)
    }


    useLayoutEffect(() => {
        store.setState('elMain', elMain);
    }, [])

    return (
        <>
            <div ref={elMain} className={clsx('container-sm', 'border', styleBase.main)}>
                {top}
                <Header {...propsHeader} visibleTopMain={visibleTopMain && visibleNavbar} onSetTypeModal={onSetTypeModal}>
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
