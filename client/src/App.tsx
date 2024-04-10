import { useCallback, useEffect, useState } from "react";
import { Header, PostEditor } from "./components";
import { PostData, UserData } from "./types";
import { getPosts, getUsers, updatePost } from "./api/apiAction";
import { Post } from "./components/Post";
import { DeletePost } from "./components/DeletePost";

function App() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [activeUser,setActiveUser] = useState<UserData>();
  const [currentPost,setCurrentPost] = useState<PostData>();
  const [lastPostId,setLastPostId] = useState<number>();
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const [isDeletePostOpen, setIsDeletePostOpen] = useState(false);
  const [isUpdateEditor, setIsUpdateEditor] = useState(false);

  const storedUnselectedNumbers = window.localStorage.getItem('UnselectedNumbers');
  const initialNumbers = [1,2,3,4,5,6,7,8,9,10];
  const initialUnelectedNumbers = storedUnselectedNumbers ? JSON.parse(storedUnselectedNumbers) : initialNumbers;
  const [unselectedNumbers, setUnselectedNumbers] = useState(initialUnelectedNumbers);

  const getRandomNumber = () => {
    const randomIndex = Math.floor(Math.random() * unselectedNumbers.length)
    return unselectedNumbers[randomIndex];
  };

  const handleRandomUser = () =>{
    let randNum = getRandomNumber();
    const selectedUser = users.find(element=> element.id === randNum)
    setActiveUser(selectedUser);

    const remainIds = unselectedNumbers.filter((num: number)=> randNum !== num);
    const remainIdsLocalStorage = remainIds.length === 0 ? initialNumbers : remainIds;
    
    setUnselectedNumbers(remainIdsLocalStorage);
    window.localStorage.setItem('UnselectedNumbers',JSON.stringify(remainIdsLocalStorage))
  }

  const openEditor = () => {
    setIsPostEditorOpen(true);
    setIsUpdateEditor(false);
  }

  const openDelete = (post:PostData) => {
    setIsDeletePostOpen(true);
    setCurrentPost(post);
  };

  const openUpdate = (post:PostData) => {
    setIsPostEditorOpen(true);
    setCurrentPost(post);
    setIsUpdateEditor(true);
};

const updatePostLikes = (post:PostData) => {
   post = {...post, likes: (post.likes?post.likes + 1 : 1)}
   updatePost(`posts/${post.id}`,post,setPosts);
};

const initaliaze = useCallback(() => {
  getUsers('users',setUsers);
  getPosts('posts',setPosts);
},[])

  useEffect(() => {
    initaliaze();
  },[])

  useEffect(()=>{
    if(users.length > 0){
      handleRandomUser();
    }
  },[users])

  useEffect(()=>{
    if(posts.length > 0){
      const maxId = posts.reduce((max, post) => Math.max(max, post.id), -1);
      setLastPostId(maxId)
    }
  },[posts])

  if(!activeUser) return null;

  return (
    <>
      <Header openPostEditor={openEditor} user={activeUser} handleRandomUser={handleRandomUser}/>
      <PostEditor open={isPostEditorOpen} setOpen={setIsPostEditorOpen} user={activeUser} updatePosts={setPosts}
       lastPostId={lastPostId} post={currentPost} isUpdate={isUpdateEditor}/>
      <DeletePost open={isDeletePostOpen} setOpen={setIsDeletePostOpen} post={currentPost} updatePosts={setPosts}/>
      <div className="posts-wrapper">
          {
            posts.map(post=><Post key={post.id} user={users.find(user => user.id === post.userId)} isActiveUser={post.userId === activeUser.id} post={post}
            openDelete={openDelete} openUpdate={openUpdate} updateLikes={updatePostLikes}/>)
          }
      </div>
    </>
  );
}

export default App;
