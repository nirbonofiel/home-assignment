import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import "./styles.css";
import { PostData } from "../../types";
import { deletePost } from "../../api/apiAction";
import { Dispatch, SetStateAction } from "react";

type DeletePostProps = {
  setOpen: (open: boolean) => void;
  open: boolean;
  post?: PostData;
  updatePosts: Dispatch<SetStateAction<PostData[]>>;
};

export const DeletePost: React.FC<DeletePostProps> = ({ open, setOpen, post, updatePosts }) => {
  const handleClose = () => {
    setOpen(!open);
  }

  if(!post) return null;

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
          formJson.postId = Number(formJson.postId)
          console.log(formJson);
          deletePost(`posts/${formJson.postId}`,updatePosts);
          handleClose();
        },
      }}
    >
      <DialogTitle color="error" >Delete</DialogTitle>
      <DialogContent>
        <input type="hidden" name="postId" value={post?.id} />
        <Typography variant="body1">
          Are you sure you want to delete this post?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">CANCEL</Button>
        <Button type="submit" color="error" style={{fontWeight:700}}>CONFIRM</Button>
      </DialogActions>
    </Dialog>
  );
};
