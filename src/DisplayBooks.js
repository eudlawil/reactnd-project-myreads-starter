import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import ShelfSelect from './ShelfSelect'

class DisplayBooks extends Component {
  state = {
    //messages: [], //will hold this --> {usermame: 'Amy', text: 'a'}
  };

  render() {
    const { allBooks, shelves, shelf, updateShelf } = this.props
    let books = allBooks.filter(book => book.shelf === shelf.id )

    return (

      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.name}</h2>

            <div className="bookshelf-books">
              <ol className="books-grid">

                {books.map((book, index) => (
                  <li key={index} >
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={
                            {
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${book.imageLinks.thumbnail})`
                            }}>
                        </div>

                        <ShelfSelect shelves={shelves} shelfId={shelf.id} updateShelf={updateShelf} bookId={book.id}/>

                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.author}</div>
                    </div>
                  </li>
                ))}


              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DisplayBooks.propTypes = {
  allBooks: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  shelf: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired
};

export default DisplayBooks;