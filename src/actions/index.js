const booksRequested = () => {
    return {
        type: 'BOOKS_REQUESTED',
    }
}

const booksLoaded = (newBooks) => {
    return {
        type: 'BOOKS_LOADED',
        payload: newBooks
    }
}

const booksError = (err) => {
    return {
        type: 'BOOKS_ERROR',
        payload: err
    }
}

export {
    booksRequested,
    booksLoaded,
    booksError
}