import * as React from 'react';
import { TextField, Typography, Avatar, IconButton, Rating, RatingClasses } from '@material-ui/core';
import { Review } from '../dt/book';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export interface Props {
    addReview: (rating: number, text: string) => void;
    reviews: Review[];
    isAdmin: boolean;
}
export interface State {
    reviews: Review[];
    currReviewText: string;
    currReviewRating: number;
}

class Reviews extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            reviews: this.props.reviews,
            currReviewRating: 0,
            currReviewText: ''
        };
    }

    handleReviewTextChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currReviewText: event.target.value
        })
    }

    handleReviewRatingChange = (event:  React.SyntheticEvent<Element, Event>, value: number | null) => {
        if(value){this.setState({
            currReviewRating: value
        })}
        
    }

    sendReview = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.addReview(this.state.currReviewRating, this.state.currReviewText);
        this.setState({
            currReviewRating: 0,
            currReviewText: ''
        })
    }

    componentDidMount = () => {
    }

    renderPastReviews = () => {
        return this.props.reviews.map((review, i) => {
            return (
            <div key={'review-' + i} style={{marginBottom: '20px', display: 'flex'}}>
                <Avatar style={{marginRight: '20px'}} />
                <div style={{display: 'inline-block', verticalAlign: 'middle'}}>
                    <Typography style={{display: 'inline-block', marginRight: '10px'}}>
                        <b>{review.user}</b>
                    </Typography>
                    <div style={{ display: 'flex',  alignItems: 'center' }}>
                            <Typography>Rating: {review.rating}</Typography>
                            <StarIcon style={{ width: '20px', color: 'gold' }} />
                        </div>
                    <Typography>{review.text}</Typography>
                    {this.props.isAdmin && <IconButton ><DeleteOutlineIcon style={{ color: 'red', fontSize: 18 }} /></IconButton>}
                </div>
            </div>)
        });
    }

    render() {
        return (
            <div style={{ width: '100%', }}>
                <div style={{marginBottom: '20px', width: '100%', display: 'flex'}}>
                        <Avatar style={{marginRight: '20px'}} />
                        <TextField placeholder={'Leave a Review'}
                            value={this.state.currReviewText}
                            onChange={this.handleReviewTextChange}
                            fullWidth
                            style={{display: 'inline-block', width: '75%'}} />
                        <Rating name="no-value" value={this.state.currReviewRating} onChange={this.handleReviewRatingChange} style={{marginLeft: '2%', alignSelf:'center'}}/>
                        <IconButton onClick={this.sendReview}><SendIcon style={{ color: 'green', marginLeft: '5%', fontSize:50}} /></IconButton>
                    </div>
                <div>
                <Typography  style={{
                                position: 'relative', float: 'right', marginRight: '50px', marginTop: '10px',
                                display: 'flex'
                            }}>
                                Order By <ArrowDropDownIcon />
                            </Typography>
                    {this.renderPastReviews()}
                </div>
            </div>
        );
    }
}

export default Reviews;