import React, { FunctionComponent } from "react";
import cn from "classnames";


interface ICloseSvgProps {
    className?: string;
    onClick?: () => void;
    width: string;
    height: string;
}


const CloseSvg: FunctionComponent<ICloseSvgProps> = ({ className, ...props }): JSX.Element => (
    <svg
        className={cn(['CloseSvg', className])}
        {...props}
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 37C28.9411 37 37 28.9411 37 19C37 9.05887 28.9411 1 19 1C9.05887 1 1 9.05887 1 19C1 28.9411 9.05887 37 19 37Z"
            stroke="#232323"
        />
        <rect
            x="12.707"
            y="12"
            width="20"
            height="1"
            transform="rotate(45 12.707 12)"
            fill="#232323"
        />
        <rect
            x="12"
            y="26.1422"
            width="20"
            height="1"
            transform="rotate(-45 12 26.1422)"
            fill="#232323"
        />
    </svg>
)


export default CloseSvg;
