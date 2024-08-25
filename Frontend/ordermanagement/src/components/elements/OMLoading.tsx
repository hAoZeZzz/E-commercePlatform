import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function OMLoading() {
    return (
        <Box sx={{ display: 'flex'}}>
            <CircularProgress />
        </Box>
    )
}