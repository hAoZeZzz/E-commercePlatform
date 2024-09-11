import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Customer, Order, useDeleteOrderMutation, useGetOrdersByIdQuery } from '../../graphql/schema';
import OMLoading from '../../components/elements/OMLoading';
import OMAlert from '../../components/elements/OMAlert';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import OrderFrom from './ordersForm/OrderForm';
import OMHeader from '../../components/elements/OMHeader';
import Delete from '@mui/icons-material/Delete';

export default function OrderPage() {
    const params = useParams();
    const orderId = parseInt(params.orderId || '0');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const {data: orderData, loading: orderLoading, error: orderError} = useGetOrdersByIdQuery({
        variables: {
            id: orderId
        }
    });

    const [deleteOrder, {loading:deleteOrderLoading, error:deleteOrderError}] = useDeleteOrderMutation();

    async function deleteOrderdDetails() {
        const response = await deleteOrder({
            variables:{
                id: orderId
            }
        });

        if(!response.errors) {
            navigate('/orders');
        }
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    if (orderLoading || deleteOrderLoading) {
        return <OMLoading />
    }
    
    if (orderError || !orderData || !orderData.orders) {
        return <OMAlert message='Error retreiving order data' />
    }

    if (deleteOrderError) {
        return <OMAlert message='Error of deleting order data'/>;
    }
    
    const order = orderData.orders[0] as Order;
    const customer = order.customer as Customer;

    return (
        <Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Order Details?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to remove this order. Confirm to continue or cancel
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={deleteOrderdDetails} color='error' autoFocus>Delete</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                <Button variant='outlined' color="error" startIcon={<Delete />} onClick={handleClickOpen}>
                        Delete
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <OMHeader header={`Order Details of ${customer.firstName} ${customer.lastName}`} />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <OrderFrom order={order} />
                </Grid>
            </Grid>
        </Container>
    )
}