import React, { Component } from "react";
import './book-list.css';
import BookListItem from "../book-list-item";
import { withBookstoreService } from "../hoc";
import { booksRequested, booksLoaded, booksError } from "../../actions"
import { connect } from "react-redux";
import { compose } from "../../utils";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator";

class BookList extends Component {

    componentDidMount() {
        // 1. receive data
        const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props;

        booksRequested() // Nullify books & loading state when going between pages
        bookstoreService.getBooks()
            .then(data => booksLoaded(data))
            .catch((err) => booksError(err));
        // console.log(data);

        // 2. dispatch action to store

    }

    render() {
        const { books, loading, error } = this.props;

        if (loading) return <Spinner />
        if (error) return <ErrorIndicator />

        return (
            <ul className="book-list">
                {
                    books.map((book) => {
                        return <li key={book.id}><BookListItem book={book} /></li>
                    })
                }
            </ul>
        )
    }
}

const mapStateToProps = ({ books, loading, error }) => {
    return {
        books,
        loading,
        error
    }
}

const mapDispatchToProps = {
    booksRequested,
    booksLoaded,
    booksError
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);