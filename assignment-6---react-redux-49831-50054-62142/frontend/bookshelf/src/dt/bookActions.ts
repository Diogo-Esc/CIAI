import { Action, applyMiddleware, combineReducers, createStore, Dispatch, Reducer } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

import {Book, RdxBookState, Review} from './book';
import { title } from 'process';

export const ADD_BOOK = 'ADD_BOOK'
export interface AddBookAction extends Action { data: Book }
export const addBook = (data:Book) => ({type:ADD_BOOK, data})

export const DELETE_BOOK = 'DELETE_BOOK'
export interface DeleteBookAction extends Action { data : Book }
export const deleteBook = (data:Book) => ({type:DELETE_BOOK, data})


export const SET_FILTER = 'SET_FILTER'
export interface SetFilterAction extends Action { filter: string }
export const filterAction = (filter:string) => ({type:SET_FILTER, filter})


export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'
export interface ReceiveBooksAction extends Action { data: Book[] }
const receiveBooks = (data:Book[]) => ({type:RECEIVE_BOOKS, data})


export const REQUEST_BOOKS = 'REQUEST_BOOKS'
const requestBooks = () => ({type:REQUEST_BOOKS})

export const fetchBooks = () =>
  (dispatch:any) => {
    dispatch(requestBooks())
    axios.get("http://localhost:8080/user/books")
      .then( response => {
        const books = response.data
        dispatch(receiveBooks(books))
      }).catch(error => {
        const errorMessage = error.message
        //dispatch(fetchBookFailure(errorMessage))
      })
  }


  export const remoteAddBook = (title:string, authors:number[], image:string) =>
  (dispatch:Dispatch) => {

    axios.post("http://localhost:8080/user/books", {
      "title": title,
      "authors": authors, // Author Backend Problem
      "images": [image]
    } )
    //.then( resp => console.log(resp) )
        .then( resp => dispatch(addBook({ title: resp.data.title, images:resp.data.images, authors:resp.data.authors, id: resp.data.id })))


  }




export const remoteDeleteBook = (book : Book) =>
    (dispatch:Dispatch) => {
      axios.delete("/user/books/" + book.id)
          .then(resp => dispatch(deleteBook(book)))
    }