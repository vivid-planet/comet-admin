import * as React from "react";

interface IWindowSize {
    width: number;
    height: number;
}

// TODO: Use from "@vivid-planet/react-admin-common" when published
export default function useWindowSize(): IWindowSize {
    const getSize = (): IWindowSize => ({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [windowSize, setWindowSize] = React.useState<IWindowSize>(getSize());

    React.useEffect(() => {
        const handleResize = () => {
            setWindowSize(getSize());
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
}
