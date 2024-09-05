import React from "react";
import { Customer } from "../../graphql/schema";
import { Container, Grid } from "@mui/material";
import OMHeader from "../../components/elements/OMHeader";
import CustomerForm from "./customersForm/CustomerForm";

export default function NewCustomerPage() {
    const customer = {} as Customer;
    return(
        <Container>
            <Grid item spacing={12}>
                <Grid item xs={12}>
                    <OMHeader header={"New Customer Details"} />
                </Grid>
                <Grid item xs={12}>
                    <CustomerForm customer={customer} />
                </Grid>
            </Grid>
        </Container>
    )
}