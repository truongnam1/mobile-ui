import React from 'react';
import clsx from 'clsx';

function Button(props) {
    console.log(`props`, props);
    return (
       <button className={clsx('btn', 'btn-primary')}>button</button>
    );
}

export default Button;