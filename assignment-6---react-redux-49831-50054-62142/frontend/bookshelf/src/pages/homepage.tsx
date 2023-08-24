import React, { useState } from 'react';
import { BookPost } from '../components/feed-post';
import { Typography, Grid, TextField, IconButton, Link, Rating } from '@material-ui/core';
import { Book } from '../dt/book';
import { RouteComponentProps } from '@reach/router';
import HomepageLogo from '../static/library.png';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { filterAction } from '../dt/bookActions';
import { useDispatch } from 'react-redux';

interface Props extends RouteComponentProps{
    isLoggedIn: boolean;
    selectBook: (book: Book) => void;
    // getBookRating: (book: Book) => number;
    books: Book[];
    filter: string;
}

export const Homepage = (props: Props) =>{
    const dispatch = useDispatch()

    const [search, setSearch] = useState("")

    const handleSearchChange = (e: any) => { setSearch(e.target.value) }

    const handleSearch  = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(filterAction(search))
    }

    const clearSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(filterAction(""))
        setSearch("")
    }

    const generatePosts = () => {
        return props.books.map((book) =>
            // <BookPost book={book} loggedIn={props.isLoggedIn()} selectBook={props.selectBook} getBookRating={props.getBookRating} />)
            <BookPost book={book} loggedIn={props.isLoggedIn} selectBook={props.selectBook} />)
    }

    return (
            <div style={{ width: '100%' }}>
                <div style={{ margin: '0 auto', width: '40%', display: 'flex', marginTop: '50px', flexDirection: 'row', justifyItems: 'center', alignItems: 'center' }}>
                    <img src={HomepageLogo} style={{ width: '50%', display: 'block', margin: '0 auto' }} />
                    <Typography variant={'h1'} style={{ marginLeft: '5%', fontSize: '10' }}>Online Library</Typography>
                </div>
                {props.isLoggedIn &&
                <div style={{ margin: '0 auto', paddingTop: '2%', width: '40%', position: 'relative', display: 'block' }}>
                    <div style={{ position: 'relative', width: '90vh' }}>
                        <TextField style={{ width: '90%' }} label={'Search Book'} value={search} onChange={handleSearchChange} />
                        <IconButton onClick={handleSearch}><SearchIcon style={{fontSize:40}}/></IconButton>
                        <div><Rating name="no-value" value={null} style={{marginTop: '10px'}}/>
                        <Link  style={{
                                position: 'relative', float: 'right', marginRight: '50px', marginTop: '10px',
                                display: 'flex'
                            }}>
                                Advanced Search <ArrowDropDownIcon />
                            </Link></div>
                        {props.filter != "" && <div><Typography variant={'caption'} style={{ color: 'grey', marginTop: '5px' }}>Current Search: {props.filter}</Typography>
                        <IconButton onClick={clearSearch}><CancelIcon style={{color: 'grey', fontSize:15}}/></IconButton></div>}
                        
                    </div>
                </div>}

                <Typography variant={'h4'} style={{ marginTop: '60px', marginLeft: '80px' }}>Available Books</Typography>

                <Grid container style={{ padding: '15px', paddingLeft: '70px' }}>
                    {generatePosts()}
                </Grid>
            </div>

        )
}
