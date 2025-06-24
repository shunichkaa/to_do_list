import {ReactNode} from "react";

type Props = {
    variant?: string;
    color?: string;
    onClick: () => void;
    title?: string;
    children?: ReactNode;
};

export const Button = ({variant = "text", color = "default", onClick, title, children}: Props) => {
    return (
        <button
            className={`btn ${variant} ${color}`}
            onClick={onClick}
        >
            {children ?? title}
        </button>
    );
};
