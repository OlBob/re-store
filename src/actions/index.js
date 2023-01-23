const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST',
    }
}

const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    }
}

const booksError = (err) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: err
    }
}

const fetchBooks = (dispatch, bookstoreService) => () => {
    dispatch(booksRequested()) // Nullify books & loading state when going between pages
    bookstoreService.getBooks()
        .then(data => dispatch(booksLoaded(data)))
        .catch((err) => dispatch(booksError(err)));
}

export {
    fetchBooks
}