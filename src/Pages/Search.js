import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from '../BooksAPI'
import PropTypes from "prop-types";
import Book from '../Components/Book.js'



class Search extends Component {
    state = {

        query: "",
        searchResult: []

    };


    handleQueryChange = (e) => {

        this.setState({ query: e.target.value });

        //console.log(e.target.value.trim())
        if (e.target.value === '' || e.target.value === undefined) {
            this.setState({ searchResult: [] });
        } else {
            BooksAPI.search(e.target.value.trim()).then(books =>
                this.setState({ searchResult: books }));
        }
    };

    render() {
        const bookShelfUpdate = {};
        this.props.allShelfBooks.map(book => (bookShelfUpdate[book.id] = book.shelf));
        return (
            <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={this.handleQueryChange}
            />
          </div>
        </div>

        { this.state.searchResult.length === 0 && (<div> No Books Found </div>)}
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResult.map((book, key) => (
              <Book
                key={ key }
                book={{ ...book, shelf: bookShelfUpdate[book.id] }}
                onBookShelfChange={this.props.onBookShelfChange}
              />
            ))}
          </ol>
        </div>
      </div>);
    }
}
Search.propTypes = {
    allShelfBooks: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
};
export default Search;