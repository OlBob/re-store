const updateCartItems = (cartItems, item, idx) => {
    // Delete element from Array if books count is 0
    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1),
        ]
    }
    // Add element to Array of books
    if (idx === -1) {
        return [
            ...cartItems,
            item
        ]
    }
    // Update element in Array of books
    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1),
    ]
}

const updateCartItem = (book, item = {}, quantity) => {
    const {
        id = book.id,
        title = book.title,
        count = 0,
        total = 0 } = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    }
}

const updateOrderTotal = (cartItems) => {
    return cartItems.reduce((totalPrice, { total }) => totalPrice + total, 0)
}

const updateItemsTotal = (cartItems) => {
    return cartItems.reduce((totalCount, { count }) => totalCount + count, 0)
}

const updateOrder = (state, bookId, quantity) => {
    const { bookList: { books }, shoppingCart: { cartItems } } = state;

    const book = books.find((book) => book.id === bookId);
    const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
    const item = cartItems[itemIndex];

    const newItem = updateCartItem(book, item, quantity);

    const newCartItems = updateCartItems(cartItems, newItem, itemIndex);

    return {
        cartItems: newCartItems,
        orderTotal: updateOrderTotal(newCartItems),
        itemsTotal: updateItemsTotal(newCartItems)
    }
}

const updateShoppingCart = (state, action) => {
    if (state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0,
            itemsTotal: 0
        }
    }

    switch (action.type) {
        case 'BOOK_ADDED_TO_CART':
            return updateOrder(state, action.payload, 1)

        case 'BOOK_REMOVED_FROM_CART':
            return updateOrder(state, action.payload, -1)

        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const item = state.shoppingCart.cartItems.find(({ id }) => id === action.payload)
            return updateOrder(state, action.payload, -item.count)

        default:
            return state.shoppingCart;
    }
}

export default updateShoppingCart;