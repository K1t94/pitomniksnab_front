import React, { FunctionComponent } from 'react';
import cn from 'classnames';


interface ITrashIconSvg {
    className?: string;
    onClick(): void;
}


const TrashIcon: FunctionComponent<ITrashIconSvg> = ({ className, ...props }): JSX.Element => (
    <svg
        className={cn(['TrashIconSvg', className])}
        {...props}
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.83268 4.16634H3.16602H1.49935C1.03911 4.16634 0.666016 4.53944 0.666016 4.99967C0.666016 5.45991 1.03911 5.83301 1.49935 5.83301H2.33268V16.6663C2.33268 18.0471 3.45197 19.1663 4.83268 19.1663H13.166C14.5467 19.1663 15.666 18.0471 15.666 16.6663V5.83301H16.4993C16.9596 5.83301 17.3327 5.45991 17.3327 4.99967C17.3327 4.53944 16.9596 4.16634 16.4993 4.16634H14.8327H13.166V3.33301C13.166 1.9523 12.0467 0.833008 10.666 0.833008H7.33268C5.95197 0.833008 4.83268 1.9523 4.83268 3.33301V4.16634ZM6.49935 4.16634H11.4993V3.33301C11.4993 2.87277 11.1263 2.49967 10.666 2.49967H7.33268C6.87244 2.49967 6.49935 2.87277 6.49935 3.33301V4.16634ZM12.3327 5.83301H5.66602H3.99935V16.6663C3.99935 17.1266 4.37244 17.4997 4.83268 17.4997H13.166C13.6263 17.4997 13.9993 17.1266 13.9993 16.6663V5.83301H12.3327Z"
            fill="#8E8E93"
        />
    </svg>

)


export default TrashIcon;
