import React, { useState } from "react";
import { Customer } from "../../../graphql/schema";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { Formik, Form } from "formik";
import { Grid, Typography } from "@mui/material";
import OMTextField from "../../../components/FormsUI/OMTextField";
import OMSelect from "../../../components/FormsUI/OMSelect";
import OMSubmitButton from "../../../components/FormsUI/OMSubmitButton";
import countries from "../../../data/countries.json"

interface CustomerFormProps {
    customer: Customer
}

const FORM_VALIDATION = yup.object().shape({
    firstName: yup.string().required("First Name is Required!"),
    lastName: yup.string().required("Last Name is Required!"),
    contactNumber: yup.string().required("Contact Number is required"),
    email: yup.string().email("Invalid email Format").required("Email is required"),
    addressLine1: yup.string().required("Address is Required!"),
    addressLine2: yup.string().required("Address is Required!"),
    city: yup.string().required("City is Required!"),
    state: yup.string().required("State is Required!"),
    country: yup.string().required("Country is Required!"),
})

export default function CustomerForm({customer}: CustomerFormProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const INITIAL_FORM = {
        id: customer.id,
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        contactNumber: customer.contactNumber || "",
        AddressLine1: customer.address?.addressLine1 || "",
        AddressLine2: customer.address?.addressLine2 || "",
        city: customer.address?.city || "",
        state: customer.address?.state || "",
        country: customer.address?.country || "",
    };

    function addOrUpdateCustomerDetails(values: any) {
        console.log(values);
    }

    return (
        <Container>
            <div>
                <Formik
                    initialValues={INITIAL_FORM}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={addOrUpdateCustomerDetails}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <OMTextField
                                    name="firstName"
                                    otherProps={{label: "First Name"}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <OMTextField
                                    name="lastName"
                                    otherProps={{label: "Last Name"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="email"
                                    otherProps={{label: "Email"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="contactNumber"
                                    otherProps={{label: "Contact Number"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">Detailed Address: </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="addressLine1"
                                    otherProps={{label: "Address Line 1"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="addressLine2"
                                    otherProps={{label: "Address Line 2"}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <OMTextField
                                    name="city"
                                    otherProps={{label: "City"}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <OMTextField
                                    name="state"
                                    otherProps={{label: "State"}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <OMSelect
                                    name="country"
                                    otherProps={{label: "Country"}}
                                    options={countries}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMSubmitButton
                                    otherProps={{}}
                                >
                                    {!customer.id ? "Add New Customer": "Update Customer"}
                                </OMSubmitButton>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </div>
        </Container>
    )
}