import { CometAdminSaveSplitButtonThemeProps } from "@comet/admin";
import { Check, Error, Save, ThreeDotSaving } from "@comet/admin-icons";
import * as React from "react";

export const cometAdminSaveSplitButtonProps = (): CometAdminSaveSplitButtonThemeProps => ({
    saveIcon: <Save />,
    savingIcon: <ThreeDotSaving />,
    successIcon: <Check />,
    errorIcon: <Error />,
});
