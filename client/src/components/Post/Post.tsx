import { Typography, Card, CardHeader, CardMedia, CardContent, IconButton, CardActions, Badge } from "@mui/material";
import { Edit, Delete, ThumbUp } from '@mui/icons-material';
import { PostData, UserData } from "../../types";
import { UserAvatar } from "../UserAvatar";
import "./styles.css";
import moment from "moment";

type PostsProps = {
  user?: UserData;
  post: PostData;
  isActiveUser: boolean;
  openDelete: (post: PostData) => void
  openUpdate: (post: PostData) => void
  updateLikes:(post: PostData) => void
};

export const Post: React.FC<PostsProps> = ({ user, post, isActiveUser, openDelete, openUpdate, updateLikes }) => {

  return (
    <Card sx={{ maxWidth: 600 }} style={{ marginBottom: 20 }} >
      <CardHeader
        avatar={<UserAvatar user={user}></UserAvatar>}
        title={user?.name}
        subheader={moment(post.date).format('MMMM Do YYYY, h:mm:ss a')}
      />
      {post.imageUrl &&
        <CardMedia component="img" height="200" width='100%' image={post.imageUrl} alt={post.id.toString()}
        />
      }
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {isActiveUser &&
          <><IconButton aria-label="edit post" onClick={()=> openUpdate(post)}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete post" onClick={()=> openDelete(post)}>
            <Delete />
          </IconButton></>
        }
        <IconButton aria-label="like" style={{ marginLeft: 'auto' }}>
          <Badge color="primary" badgeContent={post.likes?post.likes:0} onClick={()=> updateLikes(post)}>
            <ThumbUp color="primary" className="icon-with-badge" />
          </Badge>
        </IconButton>
      </CardActions>
    </Card>
  );
};
