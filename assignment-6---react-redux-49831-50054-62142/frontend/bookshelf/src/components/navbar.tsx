import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, ButtonBase, Grid, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, FormControlLabel, Checkbox, FormGroup, TextField } from '@material-ui/core';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { navigate } from '@reach/router';
import logo from '../static/library.png';
import { Author, Image } from '../dt/book';
import { useDispatch } from 'react-redux';
import { logout, remoteLogin } from '../dt/userActions';
import { addBook, remoteAddBook, deleteBook, remoteDeleteBook } from '../dt/bookActions';
import Select from 'react-select'
import axios from 'axios'

interface Props {
    isLoggedIn: boolean;
    isAdmin: boolean;
    username: string;
}

const useInput: (initialState: string, label: string) => [JSX.Element, string, React.Dispatch<React.SetStateAction<string>>]
  =
  (initialState, label) => {
    const [text, setText] = useState(initialState)

    const handleChange = (e: any) => { setText(e.target.value) }

    const input = <TextField label={label} onChange={handleChange} value={text} style={{ marginBottom: '15px' }} />

    return [input, text, setText]
  }

  const useSelect: (initialState: number[]) => [JSX.Element, number[], React.Dispatch<React.SetStateAction<number[]>>]
  =
  (initialState) => {
    const [list, setList] = useState(initialState)

    const handleChange = (e: any) => { setList(e.map((el :any)  => el.value)) }

    const options = [ //TODO fetch authors from backend

        { value: 1, label: 'Philip K. Dick' },
        { value: 2, label: 'Anton Brock' },
        { value: 3, label: 'Diogo Escaleira' },
        { value: 4, label: 'André Real' },
        { value: 5, label: 'João Ricardo Viegas da Costa Seco' },
        
      ]

    let select= <Select placeholder={"Select Authors of the Book"} options={options} onChange={handleChange} isMulti/>

    return [select, list, setList]
  }




export const Navbar = (props: Props) => {
    const dispatch = useDispatch()

    const [inputTitle, title, setTitle] = useInput("", "Book Title")
    const [inputImageUrl, imageUrl, setImageUrl] = useInput("", "Cover Image Url")
    const [inputUsername, username, setUsername] = useInput("", "Username")
    const [inputPassword, password, setPassword] = useInput("", "Password")
    const [authorSelect, authors, setAuthors] = useSelect([])    

    const [addBookDialogOpen, setAddBookDialogOpen] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    const goToHome = (event: React.MouseEvent) => {
        navigate('/')
    }

    const handleLoginDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        setLoginDialogOpen(!loginDialogOpen);
    }

    const handleAddBookDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddBookDialogOpen(!addBookDialogOpen);
        setTitle('');
        setAuthors([]);
        setImageUrl('');
    }

    const handleAddBook = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(remoteAddBook(title, authors, imageUrl));
        setAddBookDialogOpen(!addBookDialogOpen);
        setTitle('');
        setAuthors([]);
        setImageUrl('');
    }

    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(remoteLogin(username, password))
        setLoginDialogOpen(!loginDialogOpen)
    }

    const handleLogOut = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(logout())
    }

    function loginAllowed(){
        return username == "" || password == "";
    }

    function addBookAllowed(){
        return title == "" || imageUrl == "" || authors.length==0;
    }


        return (
            <AppBar style={{ background: '#DEB887', position: 'relative', height: '60px' }} elevation={0}>
                <Toolbar style={{ padding: '10px' }}>
                    <img src={logo} style={{ alignSelf: 'start', height: '40px', cursor: 'pointer' }} onClick={goToHome} />
                    <div style={{ right: '20px', position: 'absolute', marginBottom: 'auto' }}>
                        {props.isLoggedIn ?
                            <Grid container >
                                <Grid item style={{ display: 'contents' }}>
                                    <Button onClick={handleAddBookDialog} style={{ marginRight: '20px', color: 'white', marginBottom: '5%' }} >
                                        <AddIcon /><Typography>Add Book</Typography>
                                    </Button>
                                    <Dialog open={addBookDialogOpen} onClose={handleAddBookDialog} fullWidth>
                                        <DialogTitle>Add New Book</DialogTitle>
                                        <DialogContent>
                                        <Grid container direction="row">
                                            <Grid container xs={6} direction={'column'}>
                                                <Grid item>
                                                    <p>{inputTitle}</p>
                                                </Grid>
                                                <Grid item>
                                                    <p>{inputImageUrl}</p>
                                                </Grid>
                                            </Grid>
                                            <Grid container xs={6} >
                                                <Grid item>
                                                    <p>{authorSelect}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                            <DialogActions>
                                                <Button onClick={handleAddBookDialog} style={{ marginRight: 'auto' }}>Cancel</Button>
                                                <Button disabled={addBookAllowed()} variant={'contained'} onClick={handleAddBook} style={{ marginRight: 'auto' }}>Add Book</Button>
                                            </DialogActions>
                                        </DialogContent>
                                    </Dialog>
                                    <Button style={{ marginRight: '20px', color: 'white', marginBottom: '5%' }}>
                                        <FavoriteIconBorder /> <Typography>My Books</Typography>
                                    </Button>
                                </Grid>
                                <Grid item >
                                    <Grid container alignItems="center">
                                        <ButtonBase onClick={handleLogOut}>
                                            <Avatar style={{ marginRight: '10px' }} src="https://cdn1.iconfinder.com/data/icons/ordinary-people/512/bookworm-512.png">R</Avatar><Typography> {props.username} </Typography>
                                        </ButtonBase>
                                    </Grid>
                                </Grid>
                            </Grid> :
                            <div style={{ marginTop: '15%' }}>
                                <Button onClick={handleLoginDialog} variant={'outlined'} style={{ color: 'white', marginBottom: '25%' }}>
                                    <PersonIcon /> Login</Button>
                                <Dialog open={loginDialogOpen} onClose={handleLoginDialog}>
                                    <DialogTitle>Login</DialogTitle>
                                    <DialogContent style={{ width: '400px', margin: '0 auto' }}>
                                        <DialogContentText>Insert your username and password to Login</DialogContentText>
                                        <FormGroup>
                                               <p>{inputUsername}</p> 
                                               <p>{inputPassword}</p>
                                            <FormControlLabel control={<Checkbox />} label={'Keep me signed in'} />
                                        </FormGroup>
                                    </DialogContent>
                                    <div style={{ padding: '20px' }}>
                                        <div style={{ display: 'block' }}>
                                            <Button variant={'contained'} >Sign up</Button>
                                            <Button disabled={loginAllowed()} variant={'contained'} style={{ marginLeft: '3%' }} color={'primary'} onClick={handleLogin}>Login</Button>
                                        </div>
                                        <div style={{ display: 'block', float: 'left', marginTop: '10px' }}>
                                            <a href='/' style={{ display: 'block' }}>Forgot your password?</a>
                                        </div>
                                    </div>
                                </Dialog>
                            </div>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        )
}