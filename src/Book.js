import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object,
    books: PropTypes.array,
    onUpdateShelf: PropTypes.func,
    addNewBook: PropTypes.func
  }

  handleShelfSelect = (book,event) => {
    // Check if book exists in our book array
    for(var i = 0; i < this.props.books.length; i++ ) {
      if(book.id === this.props.books[i].id) {
        this.props.onUpdateShelf(book, event.target.value);
        return;
      }
    }
    this.props.addNewBook(book, event.target.value);
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf} onChange={(event) => this.handleShelfSelect(this.props.book,event)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      </li>
    )
  }
}

export default Book
