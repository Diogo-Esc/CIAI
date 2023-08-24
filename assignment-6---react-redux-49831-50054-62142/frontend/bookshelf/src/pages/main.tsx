import { Action, applyMiddleware, combineReducers, createStore, Dispatch, Reducer } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/navbar';
import { Homepage } from './homepage';
import { Router, navigate } from '@reach/router';
import { Book, RdxBookState } from '../dt/book';
import { BookPage } from './bookpage';
import { RdxUserState } from '../dt/user';

interface RdxGlobalState {
    users: RdxUserState,
    books: RdxBookState
}



const useBookSelector =
    (fn: (state: RdxBookState) => any) => fn(useSelector((state: RdxGlobalState) => state.books))

const useUserSelector =
    (fn: (state: RdxUserState) => any) => fn(useSelector((state: RdxGlobalState) => state.users))

const useGetBooks = () => {
    var filter = useGetFilter()
    var books = useBookSelector((state: RdxBookState) => state.data.filter(book => book.title.includes(filter)));
    return books;
}

const useGetFilter = () => {
    return useBookSelector( (state:RdxBookState) => state.filter )
}

const useGetUsername = () => {
    return useUserSelector((state: RdxUserState) => state.username)
}

    // filter = useBookSelector( (state:RdxBookState) => state.filter )
    // loading = useBookSelector( (state:RdxBookState) => state.loading )

export const MainPageHandler = () => {

    useEffect(() => { window.scrollTo(0, 0) }, []) //NOT WORKING???

    const [bookSelected, setBookSelected] = useState<Book | undefined>(undefined);

    const selectViewBook = (book: Book) => {
        setBookSelected(book)
        navigate('/book')
    }

    const useIsLoggedIn = () => useUserSelector((state: RdxUserState) => state.username != null)

    const useIsAdmin = () => useUserSelector((state: RdxUserState) => state.roles.includes("ROLE_ADMIN"))

    const useIsReviewer = () => useUserSelector((state: RdxUserState) => state.roles.includes("ROLE_REVIEWER"))

    // const getBookRating = (book: Book) => {
    //     var ratingAvg = 0;
    //     book.reviews.map((review) => {
    //         ratingAvg += review.rating;
    //     })
    //     return ratingAvg / book.reviews.length;
    // }

    const addReview = (rating: number, text: string) => {
        console.log("POST REQUEST: AddReview ->\nrating: " + rating + "\text: " + text);
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Navbar isLoggedIn={useIsLoggedIn()} isAdmin={useIsAdmin()} username={useGetUsername()}/>
            <Router>
                <Homepage filter={useGetFilter()} isLoggedIn={useIsLoggedIn()} path={'/'} books={useGetBooks()} selectBook={selectViewBook} />
                <BookPage addReview={addReview} path={'/book'} isLoggedIn={useIsLoggedIn()} isReviewer={useIsReviewer()} isAdmin={useIsAdmin()} book={bookSelected} />
            </Router>
        </div>
    )
}
