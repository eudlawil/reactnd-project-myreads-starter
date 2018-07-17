
import React, { Component } from 'react';
//import PropTypes from 'prop-types';
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
    console.log(e.target.value)
    this.setState({query: e.target.value})
    BooksAPI.search(e.target.value).then((books) => {

      if(books && books.length>0) {
        console.log(books)
        this.setState({ books })
      }
      else {
        this.setState({books: []})
      }
    })
    
  }

  render() {
    const { myBooks, shelves, updateShelf } = this.props
    console.log("myBooks passed in", myBooks)
    const { query } = this.state
    const shelf =  {
                      id: 'none',
                      name: 'None'
                    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
              let myBook = {}
              if (myBooks) {
                myBook = myBooks.filter(function (b) {
                  return (b.id === book.id);
                })
              }
              console.log("myBook", index,  myBook)
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
                    
                    <ShelfSelect shelves={shelves} shelf={shelf} updateShelf={updateShelf} bookId={book.id}/>
                    

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
 // messages: PropTypes.array.isRequired,
 // user: PropTypes.object.isRequired,
};

export default SearchPage;

// backgroundImage: `url(${book.imageLinks.thumbnail})`
//const { books, shelf } = props;

            /*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */


          //  {this.state.books.map((book, index) => (
          //   <li key={index} >
          //     <div className="book">
          //       <div className="book-top">
          //         <div className="book-cover" style={
          //             {
          //               width: 128,
          //               height: 193,
          //               backgroundImage: `url(${book.imageLinks.thumbnail})`
          //             }}>
          //         </div>

          //         <ShelfSelect shelves={shelves} shelf={book.shelf} updateShelf={updateShelf} bookId={book.id}/>

          //       </div>
          //       <div className="book-title">{book.title}</div>
          //       <div className="book-authors">{book.author}</div>
          //     </div>
          //   </li>
          // ))}