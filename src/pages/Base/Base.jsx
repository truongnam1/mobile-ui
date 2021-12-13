import React from 'react';
import clsx from 'clsx';

import styleBase from './Base.module.scss';

import Body from './Body';
import Header from './Header';
import Overlay from './Overlay';



function Base({ header = '', body = '', overlay = '', ...props }) {
    // console.log(`styleBase`, styleBase);
    console.log(props);
    const {propsHeader, propsBody, propsOverlay} = props;
    return (
        <>
            <div className={clsx('container-sm', 'border', styleBase.main)}>
                <Header {...propsHeader}>
                    {header}
                </Header>
                <Body>
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