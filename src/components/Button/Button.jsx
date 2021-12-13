import React from 'react';
import clsx from 'clsx';

function Button({children,...props}) {
    console.log(`props`, props);
    return (
       <button className={clsx('btn', 'btn-primary')}  {...props}>{children ?? 'rỗng'}</button>
    );
}

export default Button;