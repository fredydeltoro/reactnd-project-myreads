import React, { Component } from 'react'

class Book extends Component {
  handleChange = (event) => {
    let newShelf = event.currentTarget.value;
    this.props.changeShelf(this.props.book, newShelf);
  }

  render() {
    let thumbnail = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail:"";
    let authors = this.props.book.authors ? this.props.book.authors : [];
    let shelf = this.props.book.shelf ? this.props.book.shelf : "none"
    let coma = authors.length > 1 ? ", " : ""
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={this.handleChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">
          {authors ? authors.map((author, index) => author + (index < authors.length-1 ? coma : "" )):""}
        </div>
      </div>
    );
  }
}

export default Book;
