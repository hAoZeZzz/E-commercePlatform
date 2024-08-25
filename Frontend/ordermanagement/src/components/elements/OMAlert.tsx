import React from "react";
import { Box, Alert } from "@mui/material";

interface OMAlertProps {
    message: string
}

export default function OMAlert({message} : OMAlertProps) {
    return (
        <Box sx={{ display: 'flex'}}>
            <Alert severity='error'>{message}</Alert>
        </Box>
    )
}