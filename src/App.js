import React from 'react'
//import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import DisplayBooks from './DisplayBooks'
import SearchPage from './SearchPage'

//const shelves = ['Currently Reading', 'Want to Read', 'Read'];
const shelves = [ { id:'currentlyReading',
                    name: 'Currently Reading'
                  },
                  { id:'wantToRead',
                    name: 'Want To Read'
                  },
                  {
                    id: 'read',
                    name: 'Read'
                  }
                ];

class BooksApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      books: [
  
      ],
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      lisa: {}
    }
    this.updateShelf = this.updateShelf.bind(this)
  }



  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(this)
      console.log(books)
    })

  }

  updateShelf(id, newShelf) {
    //const index = this.state.books.findIndex(x=> x.id === id);
    const index = 0;
    this.setState(state => ({
      books: [
          ...state.books.slice(0,index),
          Object.assign({}, state.books[index], newShelf ),
          ...state.books.slice(index+1)
      ]
    }))
  }

  // updateShelf(id, newShelf) {
  //   console.log( this, id, newShelf)
  //   this.setState(state  => ({ lisa: newShelf }));
  // }


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            {shelves.map((shelf, index) => (
              <DisplayBooks allBooks={this.state.books} shelves={shelves} shelf={shelf} updateShelf={this.updateShelf} key={index} />
            ))}

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp