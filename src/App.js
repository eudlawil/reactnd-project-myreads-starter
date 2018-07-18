import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import DisplayBooks from './DisplayBooks'
import SearchPage from './SearchPage'


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

      ]
    }
    this.updateShelf = this.updateShelf.bind(this)
  }

  componentWillMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })

  }

  updateShelf(id, newShelf) {
    BooksAPI.update({id: id}, newShelf.shelf).then(()=> {
        BooksAPI.getAll().then((books) => {
          this.setState({ books })
        })
    } )
  }

  // Leaving this here so I have an example of updating
  // local state that's an array of objects
  //
  // updateShelf(id, newShelf) {
  //   const index = this.state.books.findIndex(x=> x.id === id);
  //   this.setState(state => ({
  //     books: [
  //         ...state.books.slice(0,index),
  //         Object.assign({}, state.books[index], newShelf ),
  //         ...state.books.slice(index+1)
  //     ]
  //   }))
  // }

  render() {
    return (
      <div className="app">

        <Route path='/search' render={({ history }) => (
          <SearchPage myBooks={this.state.books} shelves={shelves} updateShelf={this.updateShelf} />
        )}/>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            {shelves.map((shelf, index) => (
              <DisplayBooks allBooks={this.state.books} shelves={shelves} shelf={shelf} updateShelf={this.updateShelf} key={index} />
            ))}

            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp