import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from '../BooksAPI'
import PropTypes from "prop-types";
import Book from '../Components/Book.js'



class Search extends Component {
    state = {

        query: "",
        searchResult: [],
        flag: 0

    };


    handleQueryChange = (e) => {

        this.setState({ query: e.target.value });

        //console.log(e.target.value.trim())
        if (e.target.value === '' || e.target.value === undefined) {
            this.setState({ searchResult: [] , flag: 0});
        } else {
            BooksAPI.search(e.target.value.trim()).then(books =>{
              if(books.length){
                console.log(books);
                this.setState({ searchResult: books , flag :0})
              }
              if(books.error === "empty query" )
              {
                console.log(books)
                this.setState({ searchResult: [], flag: 1 })

              }
            })
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

        <div className="search-books-results">
          <ol className="books-grid">
          { this.state.searchResult.length === 0 && this.state.flag === 0 && (<div> No Books Found </div>)}
          { this.state.flag === 1 && (<div> Please use a more suitable query to look for books! </div>)}

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