import * as React from "react";

import ErrorDialog, { ErrorDialogOptions } from "./ErrorDialog";
import { ErrorDialogContext } from "./ErrorDialogContext";

const RenderCounter = () => {
    const renderCount = React.useRef(0);
    renderCount.current = renderCount.current + 1;
    return <div>RenderCount: {JSON.stringify(renderCount)}</div>;
};

const ChildrenContainer = React.memo(({ children }) => {
    return <>{children}</>;
});

export const ErrorDialogProvider: React.FunctionComponent = ({ children }) => {
    const [errorOptions, setErrorOptions] = React.useState<ErrorDialogOptions | null>(null);

    const showError = React.useCallback(
        (options: ErrorDialogOptions) => {
            console.log("## ShowError: ", options);
            setErrorOptions(options);
        },
        [setErrorOptions],
    );
    React.useEffect(() => {
        console.log("## Options changed: ", errorOptions);
    }, [errorOptions]);

    return (
        <>
            <RenderCounter />
            <ErrorDialogContext.Provider value={{ showError }}>
                <ChildrenContainer>{children}</ChildrenContainer>
                {errorOptions && <ErrorDialog errorOptions={errorOptions} />}
            </ErrorDialogContext.Provider>
        </>
    );
};
