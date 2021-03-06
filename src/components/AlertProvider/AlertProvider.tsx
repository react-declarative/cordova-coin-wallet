import * as React from 'react';

import { observer } from "mobx-react";

import Snackbar from "@mui/material/Snackbar";

import ioc from '../../lib/ioc';

const AUTO_HIDE_DURATION = 5000;

interface IAlertProviderProps {
    children: React.ReactChild;
}

export const AlertProvider = ({
    children,
}: IAlertProviderProps) => {
    const { current } = ioc.alertService;
    return (
        <>
            {!!current && (
                <Snackbar
                    open
                    key={current.key}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={AUTO_HIDE_DURATION}
                    sx={{
                        marginBottom: ioc.layoutService.hasFooter ? '50px' : 0,
                    }}
                    onClose={ioc.alertService.hideCurrent}
                    message={current.message}
                />
            )}
            {children}
        </>
    );
};

export default observer(AlertProvider);