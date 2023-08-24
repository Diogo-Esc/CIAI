import * as React from 'react';
import BookPost from '../components/feed-post';
import { Typography, Grid, TextField, IconButton, Link, Rating } from '@material-ui/core';
import { Book, bookData } from '../dt/book';
import { RouteComponentProps } from '@reach/router';
import HomepageLogo from '../static/library.png';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface Props {
    loggedIn: boolean;
    // handleSearch: (search: string) => void;
    selectBook: (book: Book) => void;
    getBookRating: (book: Book) => number;
}

class Homepage extends React.Component<Props & RouteComponentProps>{
    generatePosts = () => {
        return bookData.map((book) =>
            <BookPost book={book} loggedIn={this.props.loggedIn} selectBook={this.props.selectBook} getBookRating={this.props.getBookRating} />)
    }

    render = () => {
        return (
            <div style={{ width: '100%' }}>
                <div style={{ margin: '0 auto', width: '40%', display: 'flex', marginTop: '50px', flexDirection: 'row', justifyItems: 'center', alignItems: 'center' }}>
                    <img src={HomepageLogo} style={{ width: '50%', display: 'block', margin: '0 auto' }} />
                    <Typography variant={'h1'} style={{ marginLeft: '5%', fontSize: '10' }}>Online Library</Typography>
                </div>
                {this.props.loggedIn &&
                <div style={{ margin: '0 auto', paddingTop: '2%', width: '40%', position: 'relative', display: 'block' }}>
                    <div style={{ position: 'relative', width: '90vh' }}>
                        <TextField style={{ width: '90%' }} label={'Search Book'} />
                        <IconButton><SearchIcon style={{fontSize:40}}/></IconButton>
                        <div><Rating name="no-value" value={null} style={{marginTop: '10px'}}/>
                        <Link  style={{
                                position: 'relative', float: 'right', marginRight: '50px', marginTop: '10px',
                                display: 'flex'
                            }}>
                                Advanced Search <ArrowDropDownIcon />
                            </Link></div>
                        
                    </div>
                </div>}

                <Typography variant={'h4'} style={{ marginTop: '60px', marginLeft: '80px' }}>Available Books</Typography>

                <Grid container style={{ padding: '15px', paddingLeft: '70px' }}>
                    {this.generatePosts()}
                </Grid>
            </div>

        )
    }
}

export default Homepage