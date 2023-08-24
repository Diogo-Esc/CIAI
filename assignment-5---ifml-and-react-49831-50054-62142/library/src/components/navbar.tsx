import * as React from 'react';
import { AppBar, Toolbar, Typography, ButtonBase, Grid, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, FormControlLabel, Checkbox, FormGroup, TextField } from '@material-ui/core';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoIcon from '@mui/icons-material/AddAPhoto';
import PersonIcon from '@mui/icons-material/Person';
import { navigate } from '@reach/router';
import logo from '../static/library.png';

interface State {
    loginDialogOpen: boolean;
    addBookDialogOpen: boolean;
    currBookTitle: string;
    currBookAuthor: string;
    currBookDescription: string;
}

interface Props {
    loggedIn: boolean,
    isAdmin: boolean;
    logOut: () => void;
    logInAsUser: () => void;
    logInAsAdmin: () => void;
    addBook: (title: string, author: string, description: string) => void;
}

class Navbar extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            loginDialogOpen: false,
            addBookDialogOpen: false,
            currBookTitle: '',
            currBookAuthor: '',
            currBookDescription: '',
        }
    }

    goToHome = (event: React.MouseEvent) => {
        navigate('/')
    }

    handleBookTitleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currBookTitle: event.target.value
        })
    }

    handleBookAuthorChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currBookAuthor: event.target.value
        })
    }

    handleBookDescriptionChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currBookDescription: event.target.value
        })
    }

    handleLoginDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            loginDialogOpen: !this.state.loginDialogOpen
        })
    }

    handleAddBookDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            addBookDialogOpen: !this.state.addBookDialogOpen,
            currBookTitle: '',
            currBookAuthor: '',
            currBookDescription: ''
        })
    }

    handleAddBook = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.addBook(this.state.currBookTitle, this.state.currBookAuthor, this.state.currBookDescription);
        this.setState({
            addBookDialogOpen: !this.state.addBookDialogOpen,
            currBookTitle: '',
            currBookAuthor: '',
            currBookDescription: ''
        })
    }

    handleLoginAsUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.logInAsUser();
        this.setState({
            loginDialogOpen: false
        })
    }
    handleLoginAsAdmin = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.logInAsAdmin();
        this.setState({
            loginDialogOpen: false
        })
    }

    render = () => {
        return (
            <AppBar style={{ background: '#DEB887', position: 'relative', height: '60px' }} elevation={0}>
                <Toolbar style={{ padding: '10px' }}>
                    <img src={logo} style={{ alignSelf: 'start', height: '40px', cursor: 'pointer' }} onClick={this.goToHome} />
                    <div style={{ right: '20px', position: 'absolute', marginBottom: 'auto' }}>
                        {this.props.loggedIn ?
                            <Grid container >
                                <Grid item style={{ display: 'contents' }}>
                                    <Button onClick={this.handleAddBookDialog} style={{ marginRight: '20px', color: 'white', marginBottom: '5%' }} >
                                        <AddIcon /><Typography>Add Book</Typography>
                                    </Button>
                                    <Dialog open={this.state.addBookDialogOpen} onClose={this.handleAddBookDialog} fullWidth>
                                        <DialogTitle>Add New Book</DialogTitle>
                                        <DialogContent>
                                            <Grid
                                                container
                                                direction="row">
                                                <Grid item xs={6}>
                                                    {/* <input type={'file'}
                            ref={(ref) => this.importRef = ref}
                            id={'input-file'} style={{
                                display: 'none',
                            }} /> */}
                                                    <ButtonBase style={{
                                                        border: '#f44336 1px solid',
                                                        width: '250px', height: '250px',
                                                        // backgroundImage: `url(${this.state.currentImage})`,
                                                        backgroundSize: 'cover',
                                                        cursor: 'pointer'
                                                    }}>
                                                        <AddPhotoIcon style={{ fontSize: '150px' }} />
                                                    </ButtonBase>

                                                </Grid>
                                                <Grid container xs={6} direction={'column'}>
                                                    <Grid item>
                                                        <TextField label={"Book Title"} onChange={this.handleBookTitleChange} value={this.state.currBookTitle} style={{ marginBottom: '15px' }} />

                                                    </Grid>
                                                    <Grid item style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '15px' }}>
                                                        <TextField label={'Author'} onChange={this.handleBookAuthorChange} value={this.state.currBookAuthor} style={{ marginRight: '5px' }} />
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField multiline={true} onChange={this.handleBookDescriptionChange} value={this.state.currBookDescription} label={'Description'} fullWidth placeholder={'Insert a description for your book.'} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <DialogActions>
                                                <Button onClick={this.handleAddBookDialog} style={{ marginRight: 'auto' }}>Cancel</Button>
                                                <Button variant={'contained'} onClick={this.handleAddBook} style={{ marginRight: 'auto' }}>Add Book</Button>
                                            </DialogActions>
                                        </DialogContent>
                                    </Dialog>
                                    <Button style={{ marginRight: '20px', color: 'white', marginBottom: '5%' }}>
                                        <FavoriteIconBorder /> <Typography>My Books</Typography>
                                    </Button>
                                </Grid>
                                <Grid item >
                                    <Grid container alignItems="center">
                                        <ButtonBase onClick={this.props.logOut}>
                                            <Avatar style={{ marginRight: '10px' }} src="https://cdn1.iconfinder.com/data/icons/ordinary-people/512/bookworm-512.png">R</Avatar>{this.props.isAdmin ? <Typography> Admin1 </Typography> : <Typography> User1 </Typography>}
                                        </ButtonBase>
                                    </Grid>
                                </Grid>
                            </Grid> :
                            <div style={{ marginTop: '15%' }}>
                                <Button onClick={this.handleLoginDialog} variant={'outlined'} style={{ color: 'white', marginBottom: '25%' }}>
                                    <PersonIcon /> Login</Button>
                                <Dialog open={this.state.loginDialogOpen} onClose={this.handleLoginDialog}>
                                    <DialogTitle>Login</DialogTitle>
                                    <DialogContent style={{ width: '400px', margin: '0 auto' }}>
                                        <DialogContentText>Insert your username and password to Login</DialogContentText>
                                        <FormGroup>
                                            <TextField variant={'outlined'}
                                                style={{ marginBottom: '30px', width: '80%' }} label={'Username'} />
                                            <TextField variant={'outlined'} type={'password'}
                                                style={{ marginBottom: '15px', width: '80%' }} label={'Password'} />
                                            <FormControlLabel control={<Checkbox />} label={'Keep me signed in'} />
                                        </FormGroup>
                                    </DialogContent>
                                    <div style={{ padding: '20px' }}>
                                        <div style={{ display: 'block' }}>
                                            <Button variant={'contained'} >Sign up</Button>
                                            <Button variant={'contained'} style={{ marginLeft: '3%' }} color={'primary'} onClick={this.handleLoginAsUser}>Login</Button>
                                            <Button variant={'contained'} style={{ marginLeft: '3%' }} color={'primary'} onClick={this.handleLoginAsAdmin}>Login As Admin</Button>
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
}

export default Navbar