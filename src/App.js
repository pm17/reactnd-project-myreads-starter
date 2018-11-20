import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Pages/Search.js'
import Home from './Pages/Home.js'

class BooksApp extends React.Component {

    state = { allShelfBooks: [] };

    componentDidMount() {
        BooksAPI.getAll().then((allShelfBooks) => {

           // console.log(allShelfBooks);
            this.setState({ allShelfBooks });

        });

    }


    handleBookShelfChange =(book, shelf) => {

        BooksAPI.update(book, shelf).then( (resp) => {

            book.shelf = shelf;
            this.setState(state=> (
                {  allShelfBooks: this.state.allShelfBooks.filter(currentBook => currentBook.id !== book.id).concat([book])} 
                ));
        })
    }
    render() {
        return (
            <div className="app">

        <Route exact path='/' render={ ()=>(
          <Home  allShelfBooks={this.state.allShelfBooks} 
          onBookShelfChange={this.handleBookShelfChange}
          />
          )} />


          <Route path='/search-books' render = { () => (
            <Search

            allShelfBooks={this.state.allShelfBooks}
              onBookShelfChange={this.handleBookShelfChange}

             />
            
            )}/>
        
      </div>
        )
    }
}

export default BooksApp