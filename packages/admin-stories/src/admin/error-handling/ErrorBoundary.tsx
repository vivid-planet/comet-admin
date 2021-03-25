import { ErrorBoundary } from "@comet/admin";
import { Link, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

const ViewWithNoError: React.FunctionComponent = () => {
    return (
        <div>
            <Typography>View with No Error</Typography>
            <Typography> Go to knobs and try to render a view with an error</Typography>
        </div>
    );
};

const ViewWithError: React.FunctionComponent = () => {
    throw new Error("Some error occured");
    return (
        <div>
            <Typography>Error</Typography>
        </div>
    );
};
function Story() {
    const renderViewWithErrors = boolean("Render view with error", false);
    return (
        <>
            <Typography variant={"h3"}>Error Boundaries</Typography>

            <Alert severity={"info"}>
                <Typography paragraph={true}>
                    Error boundaries catch errors anywhere in their child component tree, stops the whole application from crashing and show a UI to
                    the User to the affected aria. The rest of the application should still be accessible
                </Typography>
                <Typography paragraph={true}>
                    More infos to Error Boundaries:{" "}
                    <Link href={"https://reactjs.org/docs/error-boundaries.html"}>https://reactjs.org/docs/error-boundaries.html</Link>
                </Typography>
            </Alert>

            <Paper style={{ padding: 30, marginTop: 40 }}>
                <Typography>Error Boundaries</Typography>
                <ErrorBoundary key={`errorBoundary_${renderViewWithErrors}`}>
                    {renderViewWithErrors ? <ViewWithError /> : <ViewWithNoError />}
                </ErrorBoundary>
            </Paper>
        </>
    );
}

storiesOf("@comet/admin/error-handling", module).add("ErrorBoundary", () => <Story />);
