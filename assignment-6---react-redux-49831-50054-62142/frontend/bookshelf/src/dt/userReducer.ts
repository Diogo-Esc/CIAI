import { Action, applyMiddleware, combineReducers, createStore, Dispatch, Reducer } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { initialUserState, RdxUserState } from './user';
import { LOGOUT, ReceiveLoginAction, RECEIVE_LOGIN, REQUEST_LOGIN } from './userActions';

export const reducerUsers: Reducer<RdxUserState> = (state = initialUserState, action:Action) => {
    switch (action.type) {
      case REQUEST_LOGIN:
        return {...state, waiting:true }
    
      case RECEIVE_LOGIN:
        const {username,roles} = (action as ReceiveLoginAction)
        console.log(roles)
        return {...state, waiting:false, username, roles}
        
      case LOGOUT:
        return {...state, username:null, roles:[]}
  
      default:
        return state
    }
  }