import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import React from "react";
import { useField, useFormikContext } from "formik";

interface OMCheckBoxOProps {
    name: string,
    label: string,
    legend: string,
    otherProps: any
}

export default function OMCheckBox({name, label, legend, otherProps}: OMCheckBoxOProps) {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    function handleChange(event: any) {
        const {checked} = event.target;
        setFieldValue(name, checked);
    }

    const configCheckBox = {
        ...otherProps,
        ...field,
        onChange: handleChange,
        checked: meta.value
    }

    const configFormControl: any = {};

    if (meta && meta.touched && meta.error) {
        configFormControl.error = true
    }

    return (
        <FormControl {...configFormControl}>
            <FormLabel component='legend'>{legend}</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox {...configCheckBox}
                        label={label} />} label={undefined}>
                </FormControlLabel>
            </FormGroup>
        </FormControl>
    )
} 