//post component, imported into posts class
//the code for an individual post
import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'; //used for showing time created
import makeStyles from './style';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from'../../../actions/posts';
import { PROFILE } from '../../../constants/actionTypes';

const Post = ({post, setCurrentId}) => //creates the form for adding new tickets to the site
{
    const classes = makeStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(PROFILE));

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</> //return 'like' if likes = 1, or likes if it is > 1
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>; //return if no one has liked the post
      };

    return (
        <Card className={classes.card} raised elevation={10}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {(user?.result?.googleId === post?.creatorId || user?.result?._id === post?.creatorId) && (            
                <div className={classes.overlay2}>
                    <Button style={{color: 'red'}} size="small" onClick={() => setCurrentId(post._id)} >
                        <MoreHorizIcon fontSize="large" />
                    </Button>
                </div>
            )}

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            
            <Typography className={classes.title} variant="h4" color="textPrimary" gutterBottom>{post.title}</Typography>

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch (likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creatorId || user?.result?._id === post?.creatorId) && ( //only shows delete button if creator ID matches user ID */}
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete post
                    </Button>
                )}


            </CardActions>

        </Card>
    )
};

export default Post;