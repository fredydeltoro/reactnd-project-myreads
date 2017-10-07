import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Book from './Book.js';

class SearchBooks extends Component {
  state = {
    booksSearched: []
  }

  handleChange = (event) => {
    if (event.currentTarget.value.length) {
      this.props.search(event.currentTarget.value).then( books => {
        this.setState({booksSearched:books})
      })
    } else {
      this.setState({booksSearched:[]})
    }
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" onChange={this.handleChange} placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          {!this.state.booksSearched.error ?
            (<ol className="books-grid">
              {!this.state.booksSearched.length ? '' :
                this.state.booksSearched.map(book =>
                  <li key={book.id}>
                    <Book key={book.id} book={book} changeShelf={this.props.changeShelf}/>
                  </li>
                )
              }
            </ol>) :
            (<div>Not Found</div>)
          }
        </div>
      </div>
    );
  }
}

export default SearchBooks;
