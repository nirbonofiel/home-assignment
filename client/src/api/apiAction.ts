import axiosInstance from './axiosInstanse';

export const getUsers = (path: string, setUsers: any) => {
    axiosInstance.get(path)
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


export const getPosts = (path: string, setPosts: any) => {
    axiosInstance.get(path)
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export const createPost = (path: string, bodyReq:any, setPosts: any) => {
    axiosInstance.post(path,bodyReq)
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export const deletePost = (path: string, setPosts: any) => {
    axiosInstance.delete(path)
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export const updatePost = (path: string, bodyReq:any, setPosts: any) => {
    axiosInstance.put(path,bodyReq)
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}