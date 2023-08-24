import * as React from 'react';
import { Typography, Avatar, Grid } from '@material-ui/core';
import { navigate } from '@reach/router';
import { Book } from '../dt/book';
import StarIcon from '@mui/icons-material/Star';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface State {
}

interface Props {
    book: Book;
    loggedIn: boolean;
    selectBook: (book: Book) => void;
    getBookRating: (book: Book) => number;
}

class BookPost extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount = () => {
        this.setState({
        })
    }

    onClick = (event: React.MouseEvent) => {
        this.props.selectBook(this.props.book)
        navigate('/')
    }

    render = () => {
        return (
            <Grid item style={{ height: '20%', display: 'inline-block', marginLeft: '1%', marginRight: '1%', marginTop: '15px' }}>
                <a onClick={this.onClick} style={{ cursor: 'pointer' }}>
                    <div style={{
                        width: '250px', height: '250px', background: `url(${this.props.book.image}) 50% 50% no-repeat`, backgroundSize:
                            'cover'
                    }} />
                </a>
                <Grid container style={{ width: '250px', display: 'flex', marginTop: '5px' }}>
                    <Grid item xs={4} sm={6} style={{ height: '25px' }}>
                        <Typography variant={'subtitle2'} style={{
                            width: '210px', textOverflow: 'ellipsis', height: '20px', overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        }}>{this.props.book.title}</Typography>
                    </Grid>
                    <div style={{ marginLeft: 'auto', height: '25px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant={'caption'}>{3}</Typography>
                            <BookmarkIcon style={{ width: '20px', color: '#ff6d75' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant={'caption'}>{this.props.getBookRating(this.props.book)}</Typography>
                            <StarIcon style={{ width: '20px', color: 'gold' }} />
                        </div>
                    </div>
                    <Grid item style={{ display: 'flex' }} xs={12}>
                            <Avatar style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                        <Typography variant={'caption'}
                            style={{ cursor: 'pointer' }}>{this.props.book.author}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default BookPost