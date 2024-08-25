import { TextField } from "@mui/material";
import React from "react";
import { useField} from "formik";

interface OMDatePickerProps {
    name: string,
    otherProps: any
}

export default function OMDatePicker ({name, otherProps}: OMDatePickerProps) {
    const [field, meta] = useField(name);

    const configDatePicker = {
        ...field,
        ...otherProps,
        type: 'date',
        fullWidth: true,
        variant: 'outlined',
        InputLabelProps: {
            shrink: true
        }
    };

    if (meta && meta.touched && meta.error) {
        configDatePicker.error = true
        configDatePicker.helperText = meta.error;
    }

    return (
        <TextField {...configDatePicker} />
    )
}