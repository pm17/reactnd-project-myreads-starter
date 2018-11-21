import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import Shelf from '../Components/Shelf.js';


class Home extends Component{

    render(){

         return (

            <div className="list-books">
             <div className="list-books-title">
                 <h1>MyReads</h1>
             </div>
             <div className="list-books-content">
             <Shelf bookShelfName = "Currently Reading" shelfBooks = { this.props.allShelfBooks.filter(book => book.shelf === "currentlyReading") }  onBookShelfChange={this.props.onBookShelfChange} />
             <Shelf bookShelfName = "Want to read"      shelfBooks ={  this.props.allShelfBooks.filter(book => book.shelf === "wantToRead")  }       onBookShelfChange={this.props.onBookShelfChange} />
             <Shelf bookShelfName = "Read"              shelfBooks = { this.props.allShelfBooks.filter(book => book.shelf === "read")}               onBookShelfChange={this.props.onBookShelfChange} />
             </div>
              
          
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>

        );
    }
}

Home.propTypes = {
  allShelfBooks: PropTypes.array.isRequired,
  onBookShelfChange: PropTypes.func.isRequired
}


export default Home