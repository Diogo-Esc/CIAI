import * as React from 'react';
import Navbar from '../components/navbar';
import Homepage from './homepage';
import { Router, navigate } from '@reach/router';
import { Book } from '../dt/book';
import BookPage from './bookpage';

interface State {
    loggedIn: boolean;
    searchResults: Book[];
    bookSelected?: Book;
    searched: String;
    goBackPath: string;
    currentBookId: number;
    isAdmin: boolean;
}

class MainPageHandler extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            loggedIn: false,
            searchResults: [],
            searched: '',
            bookSelected: undefined,
            goBackPath: '/',
            currentBookId: -1,
            isAdmin: false
        };
    }

    updateGoBackPath = (path: string) => {
        this.setState({ goBackPath: path })
    }

    componentDidUpdate() {
        window.scrollTo(0, 0)
    }

    selectViewBook = (book: Book) => {
        this.setState({
            bookSelected: book,
            currentBookId: book.id
        }, () => navigate('/book'))
    }

    logOut = () => {
        this.setState({
            loggedIn: false,
            isAdmin: false
        })
    }

    logInAsAdmin = () => {
        this.setState({
            loggedIn: true,
            isAdmin: true
        })
    }

    logInAsUser = () => {
        this.setState({
            loggedIn: true,
            isAdmin: false
        })
    }

    getBookRating = (book: Book) => {
        var ratingAvg = 0;
        book.reviews.map((review) => {
            ratingAvg += review.rating;
        })
        return ratingAvg / book.reviews.length;
    }

    addBook = (title: string, author: string, description: string) => {
        console.log("POST REQUEST: AddBook ->\ntitle: "+title+ "\nauthor: "+author+ "\ndescription: "+description);
    }

    addReview = (rating: number, text: string) => {
        console.log("POST REQUEST: AddReview ->\nrating: "+rating+ "\text: "+text);
    }

    render = () => {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Navbar addBook={this.addBook} loggedIn={this.state.loggedIn} isAdmin={this.state.isAdmin} logInAsUser={this.logInAsUser} logInAsAdmin={this.logInAsAdmin} logOut={this.logOut}/>
                <Router>
                    <Homepage loggedIn={this.state.loggedIn} path={'/'} selectBook={this.selectViewBook} getBookRating={this.getBookRating}/>
                    <BookPage addReview={this.addReview} path={'/book'} isLoggedIn={this.state.loggedIn} isAdmin={this.state.isAdmin} book={this.state.bookSelected} goBackPath={this.state.goBackPath} getBookRating={this.getBookRating}/>
                </Router>
            </div>
        )
    }
}

export default MainPageHandler