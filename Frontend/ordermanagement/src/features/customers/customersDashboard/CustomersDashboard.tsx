import React from "react";
import { useGetCustomersQuery } from "../../../graphql/schema";

export default function CustomersDashboard() {
    const {data:customerData, loading, error} = useGetCustomersQuery();

    if (loading) {
        return <div>Loading...</div>
    }

    if (error || !customerData) {
        return <div>Error!!!</div>
    }

    return (
        <div>
            <h2>Customers</h2>
            <ul>
                {customerData.customers?.map(customer => (
                    <li key={customer?.id}>{customer?.firstName}</li>
                ))}
            </ul>
        </div>
    )
}