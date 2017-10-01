import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
//import update from 'react-addons-update'
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

  updatePage = () => {
    this.setState((state)=>({
      showSearchPage: !state.showSearchPage
    }))
  }

  updateBookShelf = (book, value) => {
    const newBook = book;
    newBook.shelf = value;
    this.setState(() => ({
      books: this.state.books.map(b => {return (b.id === book.id) ? newBook : b})
    }))

    BooksAPI.update(book,value);
  }

  updateSearchResults = (books) => {
    const newBooks = books;
    this.setState(() => ({
      books: newBooks
    }))
  }

  /*
  clearBooks = () => {
    this.setState({ books: [] })
  }
  */

  addBook = (book,value) => {
    this.setState(state => ({
      books: state.books.concat([ book ])
    }))
    BooksAPI.update(book,value);
  }

  /*
  getBookById = (id) => {
    //const myBook = this.state.books.filter(book => book.id === id);
    var myBook = '';
    for(var i = 0; i < this.state.books.length; i++ ) {
      if(this.state.books[i].id === id) {
        myBook = this.state.books[i];
      }
    }
    return myBook;
  }
  */

  render() {
    return (
      <div className="app">
        {console.log(this.state)}
        {this.state.showSearchPage ? (
          <SearchBooks
            changePage={this.updatePage}
            onUpdateShelf={this.updateBookShelf}
            books={this.state.books}
            onSearchQuery={this.updateSearchResults}
            addNewBook={this.addBook}
          />
        ) : (
          <ListBooks
            changePage={this.updatePage}
            onUpdateShelf={this.updateBookShelf}
            books={this.state.books}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
