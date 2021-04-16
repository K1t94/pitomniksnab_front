import React, {FunctionComponent} from 'react';
import cn from 'classnames';


interface IMinusIconSvgProps {
    className?: string;
}

const MinusIconSvg: FunctionComponent<IMinusIconSvgProps> = ({ className, ...props }) => (
    <svg
        className={cn(['minusIconSvg', className])}
        width="15"
        height="2"
        viewBox="0 0 15 2"
        fill="none"
        {...props}
    >
        <path
            d="M0.52832 0.999959C0.52832 0.539722 0.901417 0.166626 1.36165 0.166626H13.3061C13.7663 0.166626 14.1394 0.539722 14.1394 0.999959C14.1394 1.4602 13.7663 1.83329 13.3061 1.83329H1.36165C0.901417 1.83329 0.52832 1.4602 0.52832 0.999959Z"
            fill="#C2C2C2"
        />
    </svg>

);


export default MinusIconSvg;
