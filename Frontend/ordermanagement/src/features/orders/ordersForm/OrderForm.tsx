import React, { useState } from "react";
import { Order, OrderModelInput, Status, useAddOrUpdateOrderMutation } from "../../../graphql/schema";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { formatDatePicker } from "../../../utils/DateFormater";
import { Container } from "@mui/system";
import { Formik, Form } from "formik";
import { Alert, Grid, Snackbar, Typography } from "@mui/material";
import OMSelect from "../../../components/FormsUI/OMSelect";
import OMDatePicker from "../../../components/FormsUI/OMDatePicker";
import OMTextField from "../../../components/FormsUI/OMTextField";
import OMCheckBox from "../../../components/FormsUI/OMCheckBox";
import OMSubmitButton from "../../../components/FormsUI/OMSubmitButton";
import statuses from "../../../data/statuses.json";
import OMLoading from "../../../components/elements/OMLoading";

interface OrderFormProps {
    order: Order,
}

const FORM_VALIDATION = yup.object().shape({
    orderDate: yup.date().required("Order Date is Required!"),
    description: yup.string().required("Description is Required!"),
    depositAmount: yup.number().required("Desposit amount is required"),
    // email: yup.string().email("Invalid email Format").required("Email is required"),
    otherNotes: yup.string(),
    totalAmount: yup.number().required("Total Amount is Required!"),
    isDelivery: yup.boolean(),
    status: yup.string()
})

export default function OrderForm({order} : OrderFormProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const INITIAL_FORM = {
        customerId: order.customerId,
        id: order.id,
        orderDate: formatDatePicker(order.orderDate ?? new Date()),
        description: order.description || "",
        depositAmount: order.depositAmount || 0,
        otherNotes: order.otherNotes || "",
        totalAmount: order.totalAmount || 0,
        isDelivery: order.isDelivery || false,
        status: order.status || Status.Draft
    };

    const [addOrUpdateOrder, {loading: addOrUpdateOrderLoading, error: addOrUpdateOrderError}] = useAddOrUpdateOrderMutation();
    const handleClose = (event: any) => {
        if(event.reason === "clickaway") {
            return;
        }

        setOpen(false);
    }

    async function addOrUpdateOrderDetails(values: OrderModelInput) {
        const response = await addOrUpdateOrder({
            variables: {
                order: values
            }
        });

        setOpen(true);

        const order = response.data?.addOrUpdateOrder as Order;
        if (order.id) {
            navigate(`/orders/${order.id}`);
        }
    }

    if (addOrUpdateOrderLoading) {
        return <OMLoading />
    }

    if (addOrUpdateOrderError) {
        return (
            <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="error">Error Retreiving order data</Alert>
            </Snackbar>
        )
    }

    return (
        <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: "100%"}}>
                    {!order.id ? "Order details successfully added" : "Order details successfully updated"}
                </Alert>
            </Snackbar>
            <div>
                <Formik
                    initialValues={INITIAL_FORM}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={addOrUpdateOrderDetails}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <OMSelect
                                    name="status"
                                    otherProps={{label:"Order Status"}}
                                    options={statuses}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMDatePicker
                                    name="orderDate"
                                    otherProps={{label:"Order Date"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="description"
                                    otherProps={{label:"Description"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="otherNotes"
                                    otherProps={{
                                        label:"Other Notes",
                                        multiline: true,
                                        rows: 3
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Pricing Information</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="totalAmount"
                                    otherProps={{label:"Total Amount", type: "number"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="depositAmount"
                                    otherProps={{label:"Deposit Amount", type: "number"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMCheckBox
                                    name="isDelivery"
                                    legend="Include Delivery"
                                    label="Include Delivery"
                                    otherProps={{label:"Delivery"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMSubmitButton
                                    otherProps={{}}
                                >
                                    {!order.id ? "Add New Order": "Update Order"}
                                </OMSubmitButton>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </div>
        </Container>
    )
}