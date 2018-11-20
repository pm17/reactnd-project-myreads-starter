import React, { Component } from 'react'
import PropTypes from "prop-types";
import Book from './Book.js'


class Shelf extends Component {

    render() {

        return (

            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.bookShelfName}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.props.shelfBooks.map(book => (
                      <Book
                      key={book.id}
                      book={book}
                      onBookShelfChange={this.props.onBookShelfChange} 
                      />
                    ))}
                  </ol>
              </div>
             </div>
        )
    }


}
Shelf.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  onBookShelfChange: PropTypes.func.isRequired
}


export default Shelf