const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [
        // {
        //     id: 1,
        //     name: 'book1',
        //     count: 3,
        //     total: 150
        // },
        // {
        //     id: 2,
        //     name: 'book2',
        //     count: 2,
        //     total: 70
        // },
    ],
    orderTotal: 240
}

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

const updateOrder = (state, bookId, quantity) => {
    const { books, cartItems } = state;

    const book = books.find((book) => book.id === bookId);
    const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
    const item = cartItems[itemIndex];

    const newItem = updateCartItem(book, item, quantity);

    return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                books: [],
                loading: true,
                error: null
            }

        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null
            }

        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            }

        case 'BOOK_ADDED_TO_CART':
            return updateOrder(state, action.payload, 1)

        case 'BOOK_REMOVED_FROM_CART':
            return updateOrder(state, action.payload, -1)

        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const item = state.cartItems.find(({ id }) => id === action.payload)
            return updateOrder(state, action.payload, -item.count)

        default:
            return state
    }
}

export default reducer