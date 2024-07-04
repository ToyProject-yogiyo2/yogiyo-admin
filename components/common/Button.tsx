type Color = "default" | "submit";
type Size = "default" | "wideButton";

interface ButtonProps {
    onClick?: () => void;
    text: string;
    size: Size;
    color: Color;
}

export const Button = ({ text, onClick, color, size }: ButtonProps) => {
    return (
        <button
            className={`${buttonTheme.color[color]},${buttonTheme.theme[size]}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

const buttonTheme = {
    color: {
        default: " bg-yogiyo-blue",
        submit: "bg-yogiyo-blue w-full",
    },
    theme: {
        default: "border rounded-xl px-6 py-2 text-white text-xl font-bold",
        wideButton: "border rounded-xl px-6 py-2 text-white text-xl font-bold w-full",
    },
};
