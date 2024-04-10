import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import "./styles.css";
import { PostData, UserData } from "../../types";
import { UserAvatar } from "../UserAvatar";
import { createPost, updatePost } from "../../api/apiAction";
import { Dispatch, SetStateAction } from "react";

type PostEditorProps = {
  setOpen: (open: boolean) => void;
  open: boolean;
  user?: UserData;
  lastPostId?: number;
  updatePosts: Dispatch<SetStateAction<PostData[]>>;
  isUpdate: boolean;
  post?: PostData;
};

export const PostEditor: React.FC<PostEditorProps> = ({ open, setOpen, user, updatePosts, lastPostId, isUpdate, post }) => {
  const handleClose = () => {
    setOpen(!open);
  }

  const initialFormData = isUpdate
  ? { content: post?.content || '', imageUrl: post?.imageUrl || '', userId: user?.id || '' , title:"Update Post"}
  : { content: '', imageUrl: '', userId: user?.id || '' , title:"New Post" };

  const {title,content,imageUrl} = initialFormData;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          
          if(formJson.imageUrl === ''){
            delete formJson.imageUrl;
          }
          formJson.userId = user?.id;
          formJson.id = !isUpdate ? lastPostId!+1: post?.id;

          if(!isUpdate){
            createPost('posts',formJson,updatePosts);
          }else{
            updatePost(`posts/${formJson.postId}`,formJson,updatePosts)
          }

          handleClose();
        },
      }}
    >
      <DialogTitle color={'#1976d2'} textAlign="center" style={{display:'flex',alignItems: 'center'}}><UserAvatar user={user}></UserAvatar><CreateIcon style={{fontSize:18,marginRight:6,marginLeft:6}}/>{title}</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          rows={4}
          required
          label="What on your mind?"
          margin="dense"
          id="content"
          name="content"
          fullWidth
          defaultValue={content}
        />
        <TextField id="imageUrl" name="imageUrl" label="Image Url" fullWidth defaultValue={imageUrl}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button type="submit" style={{fontWeight:700}}>SUBMIT</Button>
      </DialogActions>
    </Dialog>
  );
};
