import { Chip, MenuItem, Paper, Theme, Typography } from "@material-ui/core";
import MuiInputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import { SvgIconComponent } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";
import ClearIcon from "@material-ui/icons/Clear";
import DropdownIcon from "@material-ui/icons/KeyboardArrowDown";
import { withStyles } from "@material-ui/styles";
import classNames from "classnames";
import * as React from "react";
import Select from "react-select";
import AsyncSelect, { Props as ReactSelectAsyncProps } from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import { Props as ReactSelectProps } from "react-select/base";
import CreatableSelect, { Props as ReactSelectCreatableProps } from "react-select/creatable";
import { IndicatorContainerProps, ValueContainerProps } from "react-select/src/components/containers";
import { ControlProps } from "react-select/src/components/Control";
import { IndicatorProps } from "react-select/src/components/indicators";
import { MenuProps, NoticeProps } from "react-select/src/components/Menu";
import { MultiValueProps } from "react-select/src/components/MultiValue";
import { OptionProps } from "react-select/src/components/Option";
import { PlaceholderProps } from "react-select/src/components/Placeholder";
import { SingleValueProps } from "react-select/src/components/SingleValue";

import styles from "./ReactSelect.styles";

function NoOptionsMessage<OptionType, IsMulti extends boolean>(props: NoticeProps<OptionType, IsMulti>) {
    return (
        <Typography className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }: any) {
    return <div ref={inputRef} {...props} />;
}

export const ControlInput = ({ ...props }: InputBaseProps) => <MuiInputBase classes={{ root: "root", focused: "focused" }} {...props} />;

function Control<OptionType, IsMulti extends boolean>(props: ControlProps<OptionType, IsMulti>) {
    const InputProps = {
        inputComponent,
        inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
        },
    };
    return <ControlInput type="text" fullWidth {...InputProps} {...props.selectProps.textFieldProps} />;
}

function Option<OptionType, IsMulti extends boolean>(props: OptionProps<OptionType, IsMulti>) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            disabled={props.isDisabled}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder<OptionType, IsMulti extends boolean>(props: PlaceholderProps<OptionType, IsMulti>) {
    return (
        <div className={props.selectProps.classes.placeholder} {...props.innerProps}>
            {props.children}
        </div>
    );
}

function SingleValue<OptionType>(props: SingleValueProps<OptionType>) {
    return (
        <div className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </div>
    );
}

function ValueContainer<OptionType, IsMulti extends boolean>(props: ValueContainerProps<OptionType, IsMulti>) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue<OptionType>(props: MultiValueProps<OptionType>) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu<OptionType, IsMulti extends boolean>(props: MenuProps<OptionType, IsMulti>) {
    return (
        <Paper className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

function IndicatorsContainer<OptionType, IsMulti extends boolean>(props: IndicatorContainerProps<OptionType, IsMulti>) {
    return <div className={props.selectProps.classes.indicatorsContainer}>{props.children}</div>;
}

function IndicatorSeparator<OptionType, IsMulti extends boolean>(props: IndicatorContainerProps<OptionType, IsMulti>) {
    return <span className={props.selectProps.classes.indicatorSeparator} />;
}

function ClearIndicator<OptionType, IsMulti extends boolean>({ selectProps, clearValue }: IndicatorProps<OptionType, IsMulti>) {
    const Icon = selectProps.clearIcon ? selectProps.clearIcon : ClearIcon;
    return (
        <div className={`${selectProps.classes.indicator} ${selectProps.classes.clearIndicator}`} onClick={clearValue}>
            <Icon fontSize="inherit" color="inherit" />
        </div>
    );
}

function DropdownIndicator<OptionType, IsMulti extends boolean>({ selectProps }: IndicatorProps<OptionType, IsMulti>) {
    const DefaultIcon = selectProps.dropdownIcon ? selectProps.dropdownIcon : DropdownIcon;
    const OpenIcon = selectProps.dropdownIconOpen ? selectProps.dropdownIconOpen : DropdownIcon;
    const Icon = selectProps.menuIsOpen ? OpenIcon : DefaultIcon;

    return (
        <div className={`${selectProps.classes.indicator} ${selectProps.classes.dropdownIndicator}`}>
            <Icon fontSize="inherit" color="inherit" />
        </div>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
    IndicatorsContainer,
    IndicatorSeparator,
    ClearIndicator,
    DropdownIndicator,
};

export interface IVPAdminSelectProps<OptionType> {
    classes: {
        input: string;
        valueContainer: string;
        chip: string;
        chipFocused: string;
        noOptionsMessage: string;
        singleValue: string;
        placeholder: string;
        paper: string;
        indicatorSeparator: string;
        indicatorsContainer: string;
    };
    theme: Theme;
    selectComponent: React.ComponentType<ReactSelectProps<OptionType>>;
    clearIcon?: SvgIconComponent;
    dropdownIcon?: SvgIconComponent;
    dropdownIconOpen?: SvgIconComponent;
}

class SelectWrapper<OptionType> extends React.Component<IVPAdminSelectProps<OptionType> & ReactSelectProps<OptionType>> {
    public render() {
        const { classes, theme, components: origComponents, selectComponent, ...rest } = this.props;
        const selectStyles = {
            input: (base: any) => ({
                ...base,
                color: theme.palette.text.primary,
                "& input": {
                    font: "inherit",
                },
            }),
        };

        const SelectComponent = this.props.selectComponent;
        return (
            <SelectComponent
                classes={classes}
                menuPortalTarget={document.body}
                styles={selectStyles}
                components={{ ...components, ...origComponents }}
                placeholder=""
                {...rest}
            />
        );
    }
}
const ExtendedSelectWrapper = withStyles(styles, { name: "VPAdminSelect", withTheme: true })(SelectWrapper);

const vividStyles = {
    dropdownIndicator: (styles: any) => ({ ...styles, cursor: "pointer", padding: "6px" }),
    clearIndicator: (styles: any) => ({ ...styles, cursor: "pointer", padding: "6px" }),
    menuPortal: (styles: any) => ({ ...styles, zIndex: 1500 }),
};

export class ReactSelect<OptionType> extends React.Component<ReactSelectProps<OptionType>> {
    public render() {
        return <ExtendedSelectWrapper selectComponent={Select} {...this.props} styles={{ ...vividStyles }} />;
    }
}
export class ReactSelectAsync<OptionType, IsMulti extends boolean> extends React.Component<ReactSelectAsyncProps<OptionType, IsMulti>> {
    public render() {
        return <ExtendedSelectWrapper selectComponent={AsyncSelect} {...this.props} styles={{ ...vividStyles }} />;
    }
}
export class ReactSelectCreatable<OptionType, IsMulti extends boolean> extends React.Component<ReactSelectCreatableProps<OptionType, IsMulti>> {
    public render() {
        return <ExtendedSelectWrapper selectComponent={CreatableSelect} {...this.props} styles={{ ...vividStyles }} />;
    }
}
export class ReactSelectAsyncCreatable<OptionType, IsMulti extends boolean> extends React.Component<
    ReactSelectCreatableProps<OptionType, IsMulti> & ReactSelectAsyncProps<OptionType, IsMulti>
> {
    public render() {
        return <ExtendedSelectWrapper selectComponent={AsyncCreatableSelect} {...this.props} styles={{ ...vividStyles }} />;
    }
}
