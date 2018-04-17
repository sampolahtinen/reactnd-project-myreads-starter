import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
//import data from './searchTerms.json'

class SearchBooks extends React.Component {
    static propTypes = {
        selectedBooks: PropTypes.array,
        firstQuery: PropTypes.string,
        updateShelf: PropTypes.func.isRequired
    }
    state = {
        query: this.props.firstQuery,
        books: []
    }

    componentDidMount = () => {
        if(this.state.query === '') return
        this.searchBooks(this.state.query)
    }

    assignShelf = (SearchBooks) => {
        SearchBooks.forEach(book => {
            //Find return the first matched element from the array it is called on. IF not found, return undefined
            let selectedBook = this.props.selectedBooks.find( userBook => userBook.id === book.id  )
            console.log(selectedBook)
            if(selectedBook) {
                book.shelf = selectedBook.shelf
            } else {
                book.shelf = 'none'
            }
        })
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()});
        this.searchBooks(query);
    }

    searchBooks = (query) => {
        if(query === '') return
        BooksAPI.search(query).then((books)=>{
            this.assignShelf(books);
            this.setState({books: books});
            
        })
        //this.context.router.push(`/search?query=${query}`)
    }

    render() {
        return (
            <div>
                <div className='search-field-wrapper'>
                    <input
                        className='search-field' 
                        type='text' 
                        placeholder='Search new books...'
                        //defaultValue={this.props.firstQuery}
                        value={this.state.query}
                        onChange={ event => this.updateQuery(event.target.value)}
                        />
                </div>
                <div className='book-list'>
                    <section className='search-books'>
                        <h2 className='section-title'>Search Results</h2>
                        <hr/>
                        <ol className='books-list'>
                        {this.state.books.length > 0 && 
                            this.state.books.map((book)=>(
                                <li key={book.id} className='book-list-item'>
                                    <Book book={book} updateShelf={this.props.updateShelf}/>
                                </li>
                            ))
                        }
                        </ol>
                    </section>
                </div>
            </div>
        )
    }
}

export default SearchBooks