import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Book from './Book.js';
import * as _ from 'lodash';

class ListBooks extends Component {
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
              <ol className="books-grid">
                {
                  currentlyReading.map(book =>
                    <li key={book.id}>
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
              <ol className="books-grid">
                {
                  wantToRead.map(book =>
                    <li key={book.id}>
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
              <ol className="books-grid">
                {
                  read.map(book =>
                    <li key={book.id}>
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
