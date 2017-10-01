import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    changePage: PropTypes.func,
    onUpdateShelf: PropTypes.func,
    books: PropTypes.array,
    onSearchQuery: PropTypes.func,
    onEmptyResults: PropTypes.func,
    addNewBook: PropTypes.func
  }

  state = {
    searchBooks: [],
    query: ''
  }

  handleSearchShelf = (book,event) => {

    // Check if book exists in our book array
    for(var i = 0; i < this.props.books.length; i++ ) {
      if(book.id === this.props.books[i].id)
        this.props.onUpdateShelf(book, event.target.value);
      else {
        this.props.addNewBook(book, event.target.value);
      }
    }
  }

  getBookShelf = (book) => {
    for(var k = 0; k < this.props.books.length; k++ ) {
      if(book.id === this.props.books[k].id) {
        return this.props.books[k].shelf;
      }
    }
    return 'none';
  }

  handleQuery = (query) => {
    this.setState({
      query: query
    });

    if(query) {
      BooksAPI.search(query,20).then(searchBooks => {
        if(!searchBooks.error) {
          searchBooks.map(book => book.shelf = this.getBookShelf(book));
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
        <a className="close-search" onClick={this.props.changePage}>Close</a>
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
