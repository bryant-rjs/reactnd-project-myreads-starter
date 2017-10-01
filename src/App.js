import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books =>
      this.setState({ books: books })
    )
  }

  updateBookShelf = (book, value) => {
    const newBook = book;
    newBook.shelf = value;
    this.setState(() => ({
      books: this.state.books.map(b => {return (b.id === book.id) ? newBook : b})
    }))
    BooksAPI.update(book,value);
  }

  addBook = (book,value) => {
    const newBook = book;
    newBook.shelf = value;
    this.setState(state => ({
      books: state.books.concat([ newBook ])
    }))
    BooksAPI.update(book,value);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            onUpdateShelf={this.updateBookShelf}
            books={this.state.books}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            onUpdateShelf={this.updateBookShelf}
            books={this.state.books}
            addNewBook={this.addBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
