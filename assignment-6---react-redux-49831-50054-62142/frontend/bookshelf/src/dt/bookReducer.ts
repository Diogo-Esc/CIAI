import { Action, applyMiddleware, combineReducers, createStore, Dispatch, Reducer } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux';

import { Book, RdxBookState, initialBookState, Review } from './book';
import { AddBookAction, ADD_BOOK, DeleteBookAction, DELETE_BOOK, ReceiveBooksAction, RECEIVE_BOOKS, REQUEST_BOOKS, SetFilterAction, SET_FILTER } from './bookActions';

export const reducerBooks: Reducer<RdxBookState> = (state = initialBookState, action: Action) => {
  switch (action.type) {
    case ADD_BOOK:
      const book = (action as AddBookAction).data
      return { ...state, data: [...state.data, book] }

    case DELETE_BOOK:
      const book2 = (action as DeleteBookAction).data
      var pos = state.data.indexOf(book2);
      return { ...state, data: [...state.data.slice(0, pos), ...state.data.slice(pos + 1)] }

    case SET_FILTER:
      const filter = (action as SetFilterAction).filter
      return { ...state, filter }

    case REQUEST_BOOKS:
      return { ...state, loading: true }

    case RECEIVE_BOOKS:
      const data = (action as ReceiveBooksAction).data
      return { ...state, data, loading: false }

    default:
      return state
  }
}