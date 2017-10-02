import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
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
        searchBooks.map(book => (
          console.log(book.imageLinks)
        ))
        if(!searchBooks.error) {
          searchBooks.map(book => book.shelf = this.getBookShelf(book));
          //searchBooks.map(book => {return (book.imageLinks) ? book.imageLinks : book.imageLinks = ''})
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
        <Link
          to="/"
          className="close-search">
          Close
        </Link>
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
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event) => this.handleSearchShelf(book,event)}>
                      <option value="moveTo" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
    )
  }
}

export default SearchBooks
