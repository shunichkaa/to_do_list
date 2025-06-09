import { SxProps, Theme } from "@mui/material";

export const getFormContainerSx = (): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'start',
    gap: 1
});

export const getTextFieldSx = (): SxProps<Theme> => ({
    minWidth: '200px'
});