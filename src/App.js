import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import * as _ from 'lodash'
import './App.css'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  addBook = () => this.setState({ showSearchPage: true })
  closeSearch = () => this.setState({ showSearchPage: false })
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    var theBook = _.find(this.state.books, function (bookOnCollection) {
      if (bookOnCollection.id === book.id) {
        bookOnCollection.shelf = shelf;
        return bookOnCollection;
      }
    })
    if (theBook) {
      this.setState({books:this.state.books});
    } else if(shelf !== 'none'){
      book["shelf"] = shelf;
      this.setState({books: this.state.books.concat([book])})
    } else {
      this.setState({books: this.state.books.filter((b) => b.id !== book.id)})
    }
  }


  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books: books})
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks books={_.groupBy(this.state.books, 'shelf')} addBook={this.addBook} changeShelf={this.changeShelf} />
          )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <SearchBooks onBack={this.closeSearch} search={BooksAPI.search} changeShelf={this.changeShelf} />
            )}
            />
      </div>
    )
  }
}

export default BooksApp
