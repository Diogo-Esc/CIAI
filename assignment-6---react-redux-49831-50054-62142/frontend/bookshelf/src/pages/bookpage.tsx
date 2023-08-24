import React, { useEffect, useState } from 'react';
import { Typography, Grid, CardHeader, CardContent, Card, Button, Avatar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField } from '@material-ui/core';
import { Author, Book } from '../dt/book';
import { RouteComponentProps, Redirect } from '@reach/router';
import { navigate } from '@reach/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import StarIcon from '@material-ui/icons/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Reviews from '../components/reviews';
import { useDispatch } from 'react-redux';
import {deleteBook, remoteAddBook, remoteDeleteBook} from '../dt/bookActions';
import Select from 'react-select';

export interface Props extends RouteComponentProps {
    isLoggedIn: boolean;
    isAdmin: boolean;
    isReviewer: boolean;
    book?: Book;
    // getBookRating: (book: Book) => number;
    addReview: (rating: number, text: string) => void;
}

const genericDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue purus feugiat felis sollicitudin efficitur. Ut in lorem sed neque porta tincidunt. Donec cursus quam a leo laoreet, vitae pulvinar justo scelerisque. Pellentesque tempor eget arcu non lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer a diam vel nibh consectetur pulvinar nec id libero. In hac habitasse platea dictumst. Nulla accumsan tellus magna, et bibendum urna euismod ac. Nulla varius tellus in condimentum posuere. Quisque quis pulvinar orci, vel lacinia mi. Pellentesque ipsum elit, cursus sit amet maximus ut, interdum dapibus tellus. Quisque quis viverra magna. Pellentesque lobortis tellus congue orci dictum egestas. Integer nec nibh mollis, viverra dolor a, pharetra tellus. Ut nulla magna, lobortis volutpat lacinia at, volutpat a elit.\nQuisque ac lorem condimentum, volutpat nisi eget, vulputate arcu. Pellentesque a libero sit amet diam pharetra tempor ac non lacus. Pellentesque ipsum orci, lacinia ut leo at, convallis tempor sem. Phasellus euismod, sem vehicula auctor laoreet, tellus lorem eleifend erat, non vulputate ligula tellus eget sem. Nam consequat ipsum eu dolor vestibulum rhoncus. Cras eget fermentum dolor, vel aliquet quam. Proin a egestas neque. Praesent auctor risus sed laoreet interdum.";

const genericReviews = [
    {
        rating: 5,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget sem arcu. Ut tincidunt est vitae fringilla pulvinar. Integer ac dolor eu mi aliquet auctor id non eros. Duis mattis enim nunc. Ut et turpis tincidunt, sagittis ex eu, accumsan dui. Quisque vulputate risus eu facilisis sodales. Sed vel venenatis purus, et tristique justo. Aliquam facilisis mauris et accumsan laoreet. Quisque iaculis libero ac nisl fringilla congue. Nullam nec feugiat dui. Nulla facilisi. Nam ullamcorper risus sit amet sapien vehicula, condimentum iaculis mi cursus. Donec egestas maximus turpis, in consectetur eros varius id. Etiam id blandit magna. Nunc euismod porta orci, sit amet hendrerit tortor mollis feugiat. Sed tortor est, auctor sed sapien vitae, vestibulum tincidunt sem.",
        user: "John Smith"
    },
    {
        rating: 3,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget sem arcu. Ut tincidunt est vitae fringilla pulvinar. Integer ac dolor eu mi aliquet auctor id non eros. Duis mattis enim nunc. Ut et turpis tincidunt, sagittis ex eu, accumsan dui. Quisque vulputate risus eu facilisis sodales. Sed vel venenatis purus, et tristique justo. Aliquam facilisis mauris et accumsan laoreet. Quisque iaculis libero ac nisl fringilla congue. Nullam nec feugiat dui. Nulla facilisi. Nam ullamcorper risus sit amet sapien vehicula, condimentum iaculis mi cursus. Donec egestas maximus turpis, in consectetur eros varius id. Etiam id blandit magna. Nunc euismod porta orci, sit amet hendrerit tortor mollis feugiat. Sed tortor est, auctor sed sapien vitae, vestibulum tincidunt sem.",
        user: "Mary Rose"
    }
];

const useInput: (initialState: string, label: string) => [JSX.Element, string, React.Dispatch<React.SetStateAction<string>>]
  =
  (initialState, label) => {
    const [text, setText] = useState(initialState)

    const handleChange = (e: any) => { setText(e.target.value) }

    const input = <TextField label={label} onChange={handleChange} value={text} style={{ marginBottom: '15px' }} />

    return [input, text, setText]
  }

  const options = [ //TODO fetch authors from backend

        { value: 1, label: 'Philip K. Dick' },
        { value: 2, label: 'Anton Brock' },
        { value: 3, label: 'Diogo Escaleira' },
        { value: 4, label: 'André Real' },
        { value: 5, label: 'João Ricardo Viegas da Costa Seco' },
        
      ]

      function getDefaultAuthors (authors: string[]){
          var defaultAuthors: number[] = [];
          options.map((option) => {
        if(authors.includes(option.label)){
            defaultAuthors.push(option.value);
        }
        })
        return defaultAuthors;
      }

  const useSelect: (initialState: number[]) => [JSX.Element, number[], React.Dispatch<React.SetStateAction<number[]>>]
  =
  (initialState) => {

    const [list, setList] = useState(initialState)

    const handleChange = (e: any) => { setList(e.map((el :any)  => el.value)) }

    let selectedAuthors = list.map((e : number) => options[e-1])    

    let select= <Select placeholder={"Select Authors of the Book"} defaultValue={selectedAuthors} options={options} onChange={handleChange} isMulti />

    return [select, list, setList]
  }

export const BookPage = (props: Props) => {
    const dispatch = useDispatch()

    useEffect(() => { window.scrollTo(0, 0) }, []);

    const [editBookDialogOpen, setEditBookDialogOpen] = useState(false);
    if(props.book){
        var defaultTitle = props.book.title;
        var defaultImage = props.book.images? props.book.images[0].url : "";
        var defAuthors = getDefaultAuthors(props.book.authors.map((author) => author.name));
    }
    else {
        var defaultTitle = "";
        var defaultImage = "";
        var defAuthors: number[] = [];
    }
    const [inputTitle, title, setTitle] = useInput(defaultTitle, "Book Title")

    const [inputImageUrl, imageUrl, setImageUrl] = useInput(defaultImage, "Cover Image Url")

    const [authorSelect, authors, setAuthors] = useSelect(defAuthors)   

    const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/')
    }

    const handleEditBookDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEditBookDialogOpen(!editBookDialogOpen);
        setTitle(defaultTitle);
        setAuthors(defAuthors);
        setImageUrl(defaultImage);
    }

    const handleEditBook = (event: React.MouseEvent<HTMLButtonElement>) => {
        //dispatch(remoteEditBook(title, authors, imageUrl));
        setEditBookDialogOpen(!editBookDialogOpen);
        setTitle(defaultTitle);
        setAuthors(defAuthors);
        setImageUrl(defaultImage);
    }

    function editBookAllowed(){
        return title == "" || imageUrl == "" || authors.length==0;
    }

    const handleDeleteBook = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (props.book) {
            dispatch(remoteDeleteBook(props.book));
        }
        navigate('/')
    }

    return (
        !props.book ? <Redirect from={'/book'} to={'/'} noThrow /> : <div>
            <Button style={{ marginTop: '20px' }} onClick={handleButton}><ChevronLeftIcon />Go Back</Button>
            <Grid container>
                {props.book && <Dialog open={editBookDialogOpen} onClose={handleEditBookDialog} fullWidth>
                    <DialogTitle>Edit Book</DialogTitle>
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
                            <Button onClick={handleEditBookDialog} style={{ marginRight: 'auto' }}>Cancel</Button>
                            <Button disabled={editBookAllowed()} variant={'contained'} onClick={handleEditBook} style={{ marginRight: 'auto' }}>Edit Book</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>}
                <Grid item xs={3} style={{ padding: '30px' }}>
                    <div>
                        <img src={props.book.images ? props.book.images[0].url : 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} style={{ width: '100%' }} />

                        <Card>

                            <CardHeader style={{ position: 'relative', float: 'left', top: '0px' }}
                                title={props.book ? props.book.title : ''}
                            />

                            <CardContent style={{ marginTop: '10%' }} >
                                {/* <Typography style={{ display: 'flex' }}><StarIcon style={{ marginRight: '10px'}} />Average Rating: {props.book ? props.getBookRating(props.book) : ''}</Typography> */}
                                <ul><Typography style={{ display: 'inline' }}><StarIcon style={{ marginRight: '10px' }} />Average Rating: 4</Typography></ul>
                                <ul><Avatar style={{ display: 'inline-block' }} />
                                    {props.book && props.book.authors.map((author) => <Typography style={{ display: 'inline-block' }}>{author.name}</Typography>)}</ul>

                                {props.isAdmin && <IconButton onClick={handleDeleteBook}><DeleteForeverIcon style={{ color: 'red', fontSize: 40 }} /></IconButton>}
                                {props.isReviewer && <IconButton onClick={handleEditBookDialog}><EditIcon style={{ color: 'blue', fontSize: 40 }} /></IconButton>}
                            </CardContent>

                        </Card>
                    </div>
                </Grid>
                <Grid item xs={9} style={{ padding: '20px' }}>
                    <Typography variant={'h5'}>{props.book ? props.book.title : ''}</Typography>
                    {/* {!props.isAdmin() && <Typography style={{ marginTop: '15px', marginBottom: '15px' }}>{props.book ? props.book.description : ''}</Typography>} */}
                    {!props.isAdmin && <Typography style={{ marginTop: '15px', marginBottom: '15px' }}>{genericDescription}</Typography>}
                    <Typography variant={'h6'} style={{ marginTop: '20px', marginBottom: '10px' }}>Reviews:</Typography>
                    {/* {props.isLoggedIn() ? <Reviews addReview={props.addReview} isAdmin={props.isAdmin()} reviews={props.book.reviews} /> : 
                        <Typography variant={'caption'} style={{ marginTop: '15px', marginBottom: '15px' }}>Log in to see this book's reviews</Typography>} */}
                    {props.isLoggedIn ? <Reviews addReview={props.addReview} isAdmin={props.isAdmin} reviews={genericReviews} /> :
                        <Typography variant={'caption'} style={{ marginTop: '15px', marginBottom: '15px' }}>Log in to see this book's reviews</Typography>}
                </Grid>
            </Grid>
        </div >
    )
}