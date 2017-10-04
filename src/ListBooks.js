import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends Component {
  static propTypes = {
    onUpdateShelf: PropTypes.func,
    books: PropTypes.array
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.filter(book => book.shelf === 'currentlyReading')
                  .map(book => (
                    <Book
                      key={book.id}
                      book={book}
                      books={this.props.books}
                      onUpdateShelf={this.props.onUpdateShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.filter(book => book.shelf === 'wantToRead')
                  .map(book => (
                    <Book
                      key={book.id}
                      book={book}
                      books={this.props.books}
                      onUpdateShelf={this.props.onUpdateShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.filter(book => book.shelf === 'read')
                  .map(book => (
                    <Book
                      key={book.id}
                      book={book}
                      books={this.props.books}
                      onUpdateShelf={this.props.onUpdateShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>
            Add a Book
          </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
