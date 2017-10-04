import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    onUpdateShelf: PropTypes.func,
    books: PropTypes.array,
    addNewBook: PropTypes.func
  }

  state = {
    searchBooks: [],
    query: ''
  }

  handleSearchShelf = (book,event) => {
    // Check if book exists in our book array
    for(var i = 0; i < this.props.books.length; i++ ) {
      if(book.id === this.props.books[i].id) {
        this.props.onUpdateShelf(book, event.target.value);
        return;
      }
    }
    this.props.addNewBook(book, event.target.value);
  }

  getBookShelf = (book) => {
    for(var i = 0; i < this.props.books.length; i++ ) {
      if(book.id === this.props.books[i].id) {
        return this.props.books[i].shelf;
      }
    }
    return 'none';
  }

  getImageLinks = (book) => {
    if(book.imageLinks)
      return book.imageLinks;
    else {
      return {
        "smallThumbnail":"https://dummyimage.com/128x170/cccccc/000000.png&text=image+not+available",
        "thumbnail":"https://dummyimage.com/128x193/cccccc/000000.png&text=image+not+available"
      }
    }
  }

  handleQuery = (query) => {
    this.setState({
      query: query
    });

    if(query) {
      BooksAPI.search(query,20).then(searchBooks => {
        if(!searchBooks.error) {
          searchBooks.map(book => book.shelf = this.getBookShelf(book));
          searchBooks.map(book => book.imageLinks = this.getImageLinks(book));
          this.setState({ searchBooks: searchBooks })
        }
        else {
          this.setState({ searchBooks: [] })
        }
      })
    } else {
      this.setState({ searchBooks: [] })
    }
  }

  render() {
    return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input
            type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={event => this.handleQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {this.state.query}
        <ol className="books-grid">
          {this.state.searchBooks.map(book => (
            <Book
              key={book.id}
              book={book}
              books={this.props.books}
              onUpdateShelf={this.props.onUpdateShelf}
              addNewBook={this.props.addNewBook}
            />
          ))}
        </ol>
      </div>
    </div>
    )
  }
}

export default SearchBooks
