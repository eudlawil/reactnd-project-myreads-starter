import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import './App.css';
import * as BooksAPI from './BooksAPI'
import ShelfSelect from './ShelfSelect'


class SearchPage extends Component {
  state = {
    books: [ ],
    query: ''
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({query: e.target.value})
    BooksAPI.search(e.target.value).then((books) => {

      if(books && books.length>0) {
        this.setState({ books })
      }
      else {
        this.setState({books: []})
      }
    })

  }

  render() {
    const { myBooks, shelves, updateShelf } = this.props
    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>

          <div className="search-books-input-wrapper">

            <input type="text"
                   placeholder="Search by title or author"
                   onChange={this.handleChange}
                   value={query}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.books ? (
            this.state.books.map((book, index) => {

              // While iterating through each of the books returned from the query
              // see if any are in the books on the books shelf and pull in the
              // shelf it's on for the shelf select.  There is probably a better way
              // to do this.
              let myBook = []
              if (myBooks) {
                myBook = myBooks.filter(function (b) {
                  return (b.id === book.id);
                })
              }
              let myShelf = 'none';
              if (myBook[0] && typeof myBook[0].shelf !== 'undefined') {
                myShelf = myBook[0].shelf;
              }

              return (

                <li key={index} >
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={
                          {
                            width: 128,
                            height: 193,
                            backgroundImage:
                              book.imageLinks !== null && book.imageLinks !== 0 && book.imageLinks
                              ? `url(${book.imageLinks.thumbnail})`
                              :  'url("http://via.placeholder.com/128x193?text=No%20Cover")'
                          }}>
                      </div>

                      <ShelfSelect shelves={shelves} shelfId={myShelf} updateShelf={updateShelf} bookId={book.id}/>

                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
            )})
          ) : (
            ''
          )}



          </ol>
        </div>
      </div>


    )
  }
}

SearchPage.propTypes = {
  myBooks: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
};

export default SearchPage;