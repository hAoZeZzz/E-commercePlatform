import React, { useState } from "react";
import { Order, Status } from "../../../graphql/schema";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { formatDatePicker } from "../../../utils/DateFormater";
import { Container } from "@mui/system";
import { Formik, Form } from "formik";
import { Grid, Typography } from "@mui/material";
import OMSelect from "../../../components/FormsUI/OMSelect";
import OMDatePicker from "../../../components/FormsUI/OMDatePicker";
import OMTextField from "../../../components/FormsUI/OMTextField";
import OMCheckBox from "../../../components/FormsUI/OMCheckBox";
import OMSubmitButton from "../../../components/FormsUI/OMSubmitButton";
import statuses from "../../../data/statuses.json";

interface OrderFromProps {
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

export default function OrderFrom({order} : OrderFromProps) {
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

    function addOrUpdateOrderDetails(values: any) {
        console.log(values);
    }

    return (
        <Container>
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
                                    otherProps={{label:"Total Amount"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="depositAmount"
                                    otherProps={{label:"Deposit Amount"}}
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