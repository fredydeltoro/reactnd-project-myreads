import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Book from './Book.js';
import * as _ from 'lodash';

let bookDragged;

class ListBooks extends Component {
  handleDrag = (event, book) => {
    bookDragged = book;
  }
  handleDrop = (event) => {
    event.preventDefault();
    if (bookDragged) {
      this.props.changeShelf(bookDragged, event.target.id);
      bookDragged = undefined;
    }
  }
  allowDrop = (event) => {
    event.preventDefault();
  }
  render() {
    let wantToRead = this.props.books.wantToRead ? this.props.books.wantToRead : [];
    let currentlyReading = this.props.books.currentlyReading ? this.props.books.currentlyReading : [];
    let read = this.props.books.read ? this.props.books.read : [];
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>


        {_.isEmpty(this.props.books) ? <div></div> : <div className="list-books-content">

          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid" id="currentlyReading" onDrop={this.handleDrop} onDragOver={this.allowDrop}>
                {
                  currentlyReading.map(book =>
                    <li key={book.id} draggable="true" onDragStart={() => this.handleDrag(event, book)}>
                      <Book book={book} changeShelf={this.props.changeShelf}/>
                    </li>
                  )
                }
              </ol>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid" id="wantToRead" onDrop={this.handleDrop} onDragOver={this.allowDrop}>
                {
                  wantToRead.map(book =>
                    <li key={book.id} draggable="true" onDragStart={() => this.handleDrag(event, book)}>
                      <Book book={book} changeShelf={this.props.changeShelf}/>
                    </li>
                  )
                }
              </ol>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid" id="read" onDrop={this.handleDrop} onDragOver={this.allowDrop}>
                {
                  read.map(book =>
                    <li key={book.id} draggable="true" onDragStart={() => this.handleDrag(event, book)}>
                      <Book book={book} changeShelf={this.props.changeShelf}/>
                    </li>
                  )
                }
              </ol>
            </div>
          </div>

        </div>}
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
