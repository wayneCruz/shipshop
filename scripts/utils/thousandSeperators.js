// Define a function named thousands_separators that adds thousands separators to a number.
export function thousandsSeparators(num)
{
    // Convert the number to a string and split it into an array containing the integer part and the decimal part.
    var num_parts = num.toString().split(".");
    // Add thousands separators to the integer part using a regular expression.
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Join the integer and decimal parts back together with a period and return the result.
    return num_parts.join(".");
}