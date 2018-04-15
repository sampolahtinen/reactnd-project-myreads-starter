import React from 'react'
import PropTypes from 'prop-types'
import './App.css'

class Book extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        updateShelf: PropTypes.func.isRequired
    }

    state = {
        shelf: this.props.book.shelf,
        showShelfMenu: 'no' //'yes
    }
    /*updateShelf = (book,shelf) => {
        BooksAPI.update(book, shelf).then((res)=>{
          this.getAllBooks()
        })
      }*/
    render() {
        return (
          //  this.setState({shelf: this.props.bookShelf})
            <div className='book'>
                <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}>
                    <div className='book-shelf-changer' >
                        <div className='book-shelf-menu'>
                            <select defaultValue={this.state.shelf} onChange={(event)=>{
                                this.props.updateShelf(this.props.book, event.target.value)
                                this.setState({shelf: event.target.value})
                            }}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead" onClick={()=>{console.log("test")}}>Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    
                </div>
                <div className='book-info-wrapper'>
                    <h3 className='book-title'>{this.props.book.title}</h3>
                    <p className='book-author'>{this.props.book.authors[0]}</p>
                </div>   
            </div>
        )
    }
}

export default Book