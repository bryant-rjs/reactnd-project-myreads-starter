import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    changePage: PropTypes.func,
    onUpdateShelf: PropTypes.func,
    books: PropTypes.array,
    onSearchQuery: PropTypes.func,
    onEmptyResults: PropTypes.func
  }

  state = {
    query: ''
  }

  handleShelfSelect = (book,event) => {
    if(this.props.onUpdateShelf)
      this.props.onUpdateShelf(book, event.target.value);
  }
  
  handleQuery = (query) => {
    this.setState({
      query: query
    });

    if(query) {
      BooksAPI.search(query,20).then(books => {
        if(!books.error)
          this.props.onSearchQuery(books);
        else
          this.props.onEmptyResults();
      })
    }
    else { this.props.onEmptyResults(); }
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
          {this.props.books.map(book => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event) => this.handleShelfSelect(book,event)}>
                      <option value="none" disabled>Move to...</option>
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
