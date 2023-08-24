import { Action, applyMiddleware, combineReducers, createStore, Dispatch, Reducer } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
const requestLogin = () => ({type:REQUEST_LOGIN})


export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export interface ReceiveLoginAction extends Action { username:string, roles:string[] }
const receiveLogin = (username:string, roles:string[]) => ({type:RECEIVE_LOGIN, username, roles})


export const LOGOUT = 'LOGOUT'
export const logout = () => ({type:LOGOUT})


export const remoteLogin = (username:string, password:string) => 
  (dispatch:Dispatch) => {
    dispatch(requestLogin())
    axios.post("/login", {username: username,
    password: password} )
    //.then( resp => console.log(resp) )
    .then( resp => {
        const { token } = resp.data
        localStorage.setItem('token', token)
        console.log(token.toString())
     dispatch(receiveLogin(username, resp.data.roles))})
    //decrypt JWT token and pass roles into receiveLogin()
      // get token from headers and save it in browser's memory
      //

  }