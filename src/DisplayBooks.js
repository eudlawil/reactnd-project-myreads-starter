import React, { Component } from 'react';
//import PropTypes from 'prop-types';
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
 // messages: PropTypes.array.isRequired,
 // user: PropTypes.object.isRequired,
};

export default DisplayBooks;

//const { books, shelf } = props;
//"http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
//const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

/* <div className="book-shelf-changer">
<select>
  <option value="move" disabled>Move to...</option>
  <option value="currentlyReading">Currently Reading</option>
  <option value="wantToRead">Want to Read</option>
  <option value="read" selected>Read</option>
  <option value="none">None</option>
</select>
</div> */