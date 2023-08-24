import { Action, applyMiddleware, combineReducers, createStore, Dispatch, Reducer } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import './App.css';
import thunkMidleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import axios from 'axios'
import { MainPageHandler } from './pages/main';
import { reducerBooks } from './dt/bookReducer';
import { reducerUsers } from './dt/userReducer';
import { fetchBooks } from './dt/bookActions';


const logger = createLogger()

const reducer = combineReducers({users:reducerUsers, books: reducerBooks})

const store = createStore(reducer, applyMiddleware( thunkMidleware, logger ) )

const Page = () => {
  const dispatch = useDispatch()

  useEffect(() => { dispatch(fetchBooks()) }, [])

  return <MainPageHandler/>
}

function App() {
  return <Provider store={store}>
            {/* <MainPageHandler/> */}
            <Page/>
         </Provider>
}

export default App;
