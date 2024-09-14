
const priceAfterDiscount = (price, percentage) => {
    let amt = price * (percentage / 100);
    amt = price - amt;
    return amt.toFixed(2);
}

export { priceAfterDiscount }