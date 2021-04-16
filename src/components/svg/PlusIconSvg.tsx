import React, {FunctionComponent} from 'react';
import cn from 'classnames';


interface IPlusSvgProps {
    className?: string;
}

const PlusIconSvg: FunctionComponent<IPlusSvgProps> = ({ className, ...props }) => (
    <svg
        className={cn(['plusIconSvg', className])}
        width="15"
        height="12"
        viewBox="0 0 15 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M13.5002 6.83329H8.6391V11C8.6391 11.4583 8.2016 11.8333 7.66688 11.8333C7.13216 11.8333 6.69466 11.4583 6.69466 11V6.83329H1.83355C1.29883 6.83329 0.861328 6.45829 0.861328 5.99996C0.861328 5.54163 1.29883 5.16663 1.83355 5.16663H6.69466V0.999959C6.69466 0.541626 7.13216 0.166626 7.66688 0.166626C8.2016 0.166626 8.6391 0.541626 8.6391 0.999959V5.16663H13.5002C14.0349 5.16663 14.4724 5.54163 14.4724 5.99996C14.4724 6.45829 14.0349 6.83329 13.5002 6.83329Z" fill="#C2C2C2" />
    </svg>
);


export default PlusIconSvg;
