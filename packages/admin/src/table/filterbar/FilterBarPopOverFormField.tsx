import { Box, Button, Popover, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { Refresh } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { FieldRenderProps, Form, useForm } from "react-final-form";

import { IFilterBarField } from "./FilterBar";

export type CometAdminFilterBarPopOverFormFieldClassKeys =
    | "root"
    | "styledBox"
    | "labelWrapper"
    | "hasValueCount"
    | "popoverContentContainer"
    | "buttonsContainer"
    | "submitContainer"
    | "resetCloseContainer";

interface StyleProps {
    open: boolean;
}

const useStyles = makeStyles(
    (theme: Theme) => ({
        root: {
            position: "relative",

            "&:before": {
                opacity: (props: StyleProps) => (props.open ? 1 : 0),
                transition: `opacity ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
                borderLeft: `1px solid ${theme.palette.grey[300]}`,
                borderTop: `1px solid ${theme.palette.grey[300]}`,
                transform: "rotateZ(45deg)",
                backgroundColor: "#ffffff",
                position: "absolute",
                display: "block",
                bottom: "-20px",
                height: "10px",
                content: '""',
                width: "10px",
                left: "50%",
            },
        },
        styledBox: {
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
            cursor: "pointer",

            "&:after": {
                borderRight: "4px solid transparent",
                borderLeft: "4px solid transparent",
                borderTop: `4px solid ${theme.palette.grey[300]}`,
                position: "absolute",
                display: "block",
                content: "''",
                height: 0,
                width: 0,
                right: "10px",
                top: "50%",
            },
        },
        labelWrapper: {
            marginRight: "15px",
            boxSizing: "border-box",
        },
        hasValueCount: {},
        popoverContentContainer: {
            border: `1px solid ${theme.palette.grey[300]}`,

            "& [class*='CometAdminFormFieldContainer-root']": {
                padding: "20px",
                boxSizing: "border-box",
                marginBottom: 0,
            },
        },
        buttonsContainer: {
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${theme.palette.grey[300]}`,
            padding: "20px",
        },
        submitContainer: {
            marginRight: "15px",
        },
        resetContainer: {},
    }),
    { name: "CometAdminFilterBarPopOverFormField" },
);

interface IFormFieldProps extends FieldRenderProps<any> {
    field: IFilterBarField;
    handleSubmit: () => void;
}

export const FilterBarPopOverFormField: React.FunctionComponent<IFormFieldProps> = ({ field }) => {
    const outerForm = useForm();
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const { values } = outerForm.getState();
    const classes = useStyles({ open: open });

    return (
        <Form
            onSubmit={(values) => {
                outerForm.change(field.name, values[field.name]);
            }}
            initialValues={values}
        >
            {({ form, handleSubmit }) => (
                <div className={classes.root}>
                    <div className={classes.styledBox} onClick={handleClick}>
                        <div className={classes.labelWrapper}>
                            <Typography variant="subtitle2">{field.label}</Typography>
                        </div>
                        {outerForm.getFieldState(field.name)?.value !== undefined && (
                            <div className={classes.hasValueCount}>
                                <Typography variant={"subtitle2"}>
                                    {Array.isArray(outerForm.getFieldState(field.name)?.value)
                                        ? outerForm.getFieldState(field.name)?.value.length
                                        : 1}
                                </Typography>
                            </div>
                        )}
                    </div>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={() => {
                            setAnchorEl(null);
                            handleSubmit();
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: -15,
                            horizontal: 65,
                        }}
                        PaperProps={{ square: true }}
                        classes={{
                            paper: "paper",
                        }}
                    >
                        <div className={classes.popoverContentContainer}>
                            <Box style={{ minWidth: 300 }}>
                                {React.createElement(field.component)}
                                <div className={classes.buttonsContainer}>
                                    <div className={classes.submitContainer}>
                                        <Button
                                            fullWidth={true}
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            onClick={() => {
                                                handleSubmit();
                                                setAnchorEl(null);
                                            }}
                                        >
                                            {"Übernehmen"}
                                        </Button>
                                    </div>
                                    <div className={classes.resetContainer}>
                                        <Button
                                            startIcon={<Refresh />}
                                            type="reset"
                                            variant="text"
                                            onClick={() => {
                                                outerForm.change(field.name, undefined);
                                                form.change(field.name, undefined);
                                                setAnchorEl(null);
                                            }}
                                        >
                                            <Typography variant={"button"}>{"Zurücksetzen"}</Typography>
                                        </Button>
                                    </div>
                                </div>
                            </Box>
                        </div>
                    </Popover>
                </div>
            )}
        </Form>
    );
};