import * as React from 'react';
import { Typography, Avatar, Grid } from '@material-ui/core';
import { navigate } from '@reach/router';
import { Book } from '../dt/book';
import StarIcon from '@mui/icons-material/Star';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const BookPost = (
    props: {
        book: Book,
        loggedIn: boolean,
        selectBook: (book: Book) => void,
        // getBookRating: (book: Book) => number,
    }
) => {
    

    const onClick = (event: React.MouseEvent) => {
        props.selectBook(props.book)
        navigate('/book')
    }

    return (
            <Grid item style={{ height: '20%', display: 'inline-block', marginLeft: '1%', marginRight: '1%', marginTop: '15px' }}>
                <a onClick={onClick} style={{ cursor: 'pointer' }}>
                    <div style={{
                        width: '250px', height: '250px', background: `url(${props.book.images? props.book.images[0].url: 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'}) 50% 50% no-repeat`, backgroundSize:
                            'cover'
                    }} />
                </a>
                <Grid container style={{ width: '250px', display: 'flex', marginTop: '5px' }}>
                    <Grid item xs={4} sm={6} style={{ height: '25px' }}>
                        <Typography variant={'subtitle2'} style={{
                            width: '210px', textOverflow: 'ellipsis', height: '20px', overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        }}>{props.book.title}</Typography>
                    </Grid>
                    <div style={{ marginLeft: 'auto', height: '25px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant={'caption'}>{3}</Typography>
                            <BookmarkIcon style={{ width: '20px', color: '#ff6d75' }} />
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant={'caption'}>{props.getBookRating(props.book)}</Typography>
                            <StarIcon style={{ width: '20px', color: 'gold' }} />
                        </div> */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant={'caption'}>4</Typography>
                            <StarIcon style={{ width: '20px', color: 'gold' }} />
                        </div>
                    </div>
                    <Grid item style={{ display: 'flex' }} xs={12}>
                            <Avatar style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                            {props.book.authors.map((author) => <Typography variant={'caption'}
                            style={{ cursor: 'pointer', marginLeft: '5px' }}>{author.name}</Typography>)}
                        
                    </Grid>
                </Grid>
            </Grid>
        )
}