import { Typography } from "@mui/material";
import React from "react";

interface OMHeaderProps {
    header: string
}

export default function OMHeader({header}: OMHeaderProps) {
    return (
        <Typography component='div' variant='h5' display='block' gutterBottom align='center'>
            {header}
        </Typography>
    )
}