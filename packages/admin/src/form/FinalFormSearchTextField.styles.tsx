import { Search } from "@comet/admin-icons";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";

import { useComponentThemeProps } from "../mui/useComponentThemeProps";

export interface CometAdminFinalFormSearchTextFieldThemeProps {
    icon?: React.ReactNode;
}

export type CometAdminFinalFormSearchTextFieldClassKeys = "iconContainer";

export const useStyles = makeStyles<Theme, {}, CometAdminFinalFormSearchTextFieldClassKeys>(
    ({ spacing }) => ({
        iconContainer: {
            paddingRight: spacing(2),
        },
    }),
    { name: "CometAdminFinalFormSearchTextField" },
);

export function useThemeProps() {
    const { icon = <Search />, ...restProps } = useComponentThemeProps("CometAdminFinalFormSearchTextField") ?? {};
    return { icon, ...restProps };
}

// Theme Augmentation
declare module "@material-ui/core/styles/overrides" {
    interface ComponentNameToClassKey {
        CometAdminFinalFormSearchTextField: CometAdminFinalFormSearchTextFieldClassKeys;
    }
}

declare module "@material-ui/core/styles/props" {
    interface ComponentsPropsList {
        CometAdminFinalFormSearchTextField: CometAdminFinalFormSearchTextFieldThemeProps;
    }
}