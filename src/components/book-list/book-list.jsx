import React, { Component } from "react";
import './book-list.css';
import BookListItem from "../book-list-item";
import { withBookstoreService } from "../hoc";
import { fetchBooks } from "../../actions"
import { connect } from "react-redux";
import { compose } from "../../utils";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator";

const BookList = ({ books }) => {
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

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks()
    }

    render() {
        const { books, loading, error } = this.props;

        if (loading) return <Spinner />
        if (error) return <ErrorIndicator />

        return <BookList books={books} />
    }
}

const mapStateToProps = ({ books, loading, error }) => {
    return {
        books,
        loading,
        error
    }
}

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return {
        fetchBooks: fetchBooks(dispatch, bookstoreService)
    }
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);