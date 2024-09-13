import React from "react";
import { Stats, useGetStatsQuery } from "../../graphql/schema";
import OMLoading from "../../components/elements/OMLoading";
import OMAlert from "../../components/elements/OMAlert";
import { Container, Grid, IconButton } from "@mui/material";
import OMHeader from "../../components/elements/OMHeader";
import PersonIcon from "@mui/icons-material/Person";
import FolderShared from "@mui/icons-material/FolderShared";
import AddCircle from "@mui/icons-material/AddCircle";
import StatsGrid from "./StatsGrid";

export default function HomePage() {
    const {data: statsData, loading: statsLoading, error: statsError} = useGetStatsQuery();

    if(statsLoading) {
        return <OMLoading />
    }

    if(statsError || !statsData) {
        return <OMAlert message="Error retreiving stats data" />
    }

    const stats = statsData.stats as Stats;

    return (
        <Container>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12}>
                    <OMHeader header="Order Manage Platform" />
                </Grid>
                <Grid item xs={4}>
                    <IconButton onClick={() => window.open('/customers')}>
                        <PersonIcon fontSize="large" color="secondary" /> Customers
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton onClick={() => window.open('/orders')}>
                        <FolderShared fontSize="large" color="secondary" /> Orders
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton onClick={() => window.open('/customers/newcustomer')}>
                        <AddCircle fontSize="large" color="secondary" /> New Customer
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <StatsGrid stats={stats} />
                </Grid>
            </Grid>
        </Container>
    )
}