export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
    state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) =>
        acc + item.price * item.qty, 0));
    //calc shipping price
    state.shippingPrice = addDecimal(state.itemsPrice > 500 ? 0 : 50)

    //tax price
    state.taxPrice = addDecimal(Number((0.18 * state.itemsPrice).toFixed(2)))

    //total price
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)

    localStorage.setItem('cart', JSON.stringify(state))

    return state
}