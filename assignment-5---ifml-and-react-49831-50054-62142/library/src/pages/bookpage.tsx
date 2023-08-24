import * as React from 'react';
import { Typography, Grid, CardHeader, CardContent, Card, Button, Avatar, IconButton } from '@material-ui/core';
import { Book } from '../dt/book';
import { RouteComponentProps, Redirect } from '@reach/router';
import { navigate } from '@reach/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import StarIcon from '@material-ui/icons/Star';
import Reviews from '../components/reviews';

export interface Props {
    isLoggedIn: boolean;
    isAdmin: boolean;
    book?: Book;
    goBackPath: string,
    getBookRating: (book: Book) => number;
    addReview: (rating: number, text: string) => void;
}

export interface State {
}

class BookPage extends React.Component<Props & RouteComponentProps, State> {

    constructor(props: Props & RouteComponentProps) {
        super(props)
        this.state = {
        }
    }

    handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate(this.props.goBackPath)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render = () => {
        return (
            !this.props.book ? <Redirect from={'/book'} to={'/'} noThrow /> : <div>
                <Button style={{ marginTop: '20px' }} onClick={this.handleButton}><ChevronLeftIcon />Go Back</Button>
                <Grid container>
                    <Grid item xs={3} style={{ padding: '30px' }}>
                        <div>
                            <img src={this.props.book ? this.props.book.image : ''} style={{ width: '100%' }} />

                            <Card>
                                <div>
                                <CardHeader style={{ position: 'relative', float:'left',top:'0px' }} 
                                title={this.props.book ? this.props.book.title : ''} 
                                />
                            </div>
                            
                                <CardContent style={{ marginTop:'10%'}} >
                                   <Typography style={{ display: 'flex' }}><StarIcon style={{ marginRight: '10px'}} />Average Rating: {this.props.book ? this.props.getBookRating(this.props.book) : ''}</Typography>
                                    <Avatar style={{ display: 'inline-block' }} /><Typography style={{ display: 'inline-block' }}>{this.props.book ? this.props.book.author : ''}</Typography>
                                                                        
                                
                                </CardContent>
              
                            </Card>                            
                        </div>
                    </Grid>
                    <Grid item xs={9} style={{ padding: '20px' }}>
                        <Typography variant={'h5'}>{this.props.book ? this.props.book.title : ''}</Typography>
                        {!this.props.isAdmin && <Typography style={{ marginTop: '15px', marginBottom: '15px' }}>{this.props.book ? this.props.book.description : ''}</Typography>}
                        
                        <Typography variant={'h6'} style={{ marginTop: '20px', marginBottom: '10px' }}>Reviews:</Typography>
                        {this.props.isLoggedIn ? <Reviews addReview={this.props.addReview} isAdmin={this.props.isAdmin} reviews={this.props.book.reviews} /> : 
                        <Typography variant={'caption'} style={{ marginTop: '15px', marginBottom: '15px' }}>Log in to see this book's reviews</Typography>}
                    </Grid>
                </Grid>
            </div >
        )
    }
}

export default BookPage