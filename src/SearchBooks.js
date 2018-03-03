import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

export default class SearchBooks extends Component {

  state = {
    query:''
  }

  updateQuery = (query) => {
    this.setState({query: query})
    if(query !== ''){ this.props.searchAction(query) }
  }


  updateShelterToSearchResult = (res) => {
    let coincidence
    coincidence = this.props.books.filter((bo) => (bo.id === res.id))
    if(coincidence[0] != null) {
      res.shelf = coincidence[0].shelf
    }
    else {
      res.shelf = 'none'
    }
    return res
  }

  render(){


    let searchLibraryResults
    if(Array.isArray(this.props.searchResults) ) {
      searchLibraryResults = this.props.searchResults.map((se) => (this.updateShelterToSearchResult(se)))
    } else {
      searchLibraryResults = []
    }


    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {}
            <input
              type='text'
              placeholder='Search by title or author'
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchLibraryResults.map((book) => (
              <Book key={book.id}  book={book} updateShelf={this.props.updateShelf} />
            ))}
          </ol>
        </div>
      </div>
    )
  }

}