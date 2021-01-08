import { Typography } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import { Field, FieldContainerLabelAbove } from "@vivid-planet/comet-admin";
import { FinalFormReactSelectStaticOptions } from "@vivid-planet/comet-admin-react-select";
import * as React from "react";
import { Form } from "react-final-form";

function Story() {
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry", isDisabled: true },
        { value: "vanilla", label: "Vanilla" },
        { value: "cherry", label: "Cherry" },
    ];
    return (
        <div style={{ width: "300px" }}>
            <Typography>Consider replacing ReactSelect with Autocomplete</Typography>

            <Form
                onSubmit={(values) => {
                    //
                }}
                render={({ handleSubmit, pristine, invalid }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="flavor"
                            label="Flavor"
                            fieldContainerComponent={FieldContainerLabelAbove}
                            component={FinalFormReactSelectStaticOptions}
                            placeholder=""
                            isClearable
                            defaultOptions
                            options={options}
                        />
                    </form>
                )}
            />
        </div>
    );
}

storiesOf("comet-admin-form", module).add("React Select Disabled Option", () => <Story />);
