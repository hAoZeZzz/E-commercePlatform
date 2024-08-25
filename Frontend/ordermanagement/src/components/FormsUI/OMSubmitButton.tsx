import React from "react";
import { useFormikContext } from 'formik';
import { FullWidth } from "ag-grid-community/dist/lib/components/framework/componentTypes";
import { Button } from "@mui/material";

interface OMSubmitButtonProps {
    children: any,
    otherProps: any
}

export default function OMSubmitButton ({children, otherProps}: OMSubmitButtonProps) {
    const { submitForm } = useFormikContext();

    function handleSubmut () {
        submitForm()
    }

    const configButton = {
        ...otherProps,
        color: 'primary',
        variant: 'contained',
        fullWidth: true,
        onClick: handleSubmut
    }

    return(
        <Button {...configButton}>
            {children}
        </Button>
    )
}