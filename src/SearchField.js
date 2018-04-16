import React from 'react'
//import { Link } from 'react-router-dom'
//import { Route } from 'react-router-dom'
import './App.css'
//import SearchBooks from './SearchBooks'

class SearchField extends React.Component {
    state = {
        query: ''
    }

    navigateToSearch = (event)  => {
        if (event.key === 'Enter') {
            console.log("MOOOOI");
            this.props.updateFirstQuery(event.target.value)
            this.setState({query: event.target.value})
        }
    }

    render() {
        return (
            <div className='search-field-wrapper'>
                <input
                    onKeyPress={this.navigateToSearch.bind(this)} //binding this to component
                    className='search-field' 
                    type='text' placeholder='Search new books...'
                    />
            </div>
        )
    }
}

export default SearchField
