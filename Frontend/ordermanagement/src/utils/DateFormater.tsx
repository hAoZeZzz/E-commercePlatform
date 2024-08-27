import { format } from "date-fns";
import { DATE_FORMAT, DATE_FORMAT_DATE_PICKER } from "../types/Constants";

export function formatDate (datevalue: Date) {
    if (!datevalue) return format(new Date(), DATE_FORMAT);

    return format(new Date(datevalue), DATE_FORMAT);
}

export function formatDatePicker(datevalue: Date) {
    if (!datevalue) return format(new Date(), DATE_FORMAT_DATE_PICKER);

    return format(new Date(datevalue), DATE_FORMAT_DATE_PICKER);
}