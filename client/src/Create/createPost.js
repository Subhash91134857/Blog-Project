import { useState, useEffect,useContext } from "react";
import { useLocation,useNavigate } from "react-router-dom";

import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from "@mui/material";
// import Post from "../images/Post.jpg";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DataContext } from "../context/dataProvider";
import { API } from "../Service/api";


const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
})

const StyleFormController = styled(FormControl)`
   margin-top:100;
   display:flex;
   flex-direction:row;
`
const InputTextField = styled(InputBase)`
   flex:1;
   margin:0 30px;
   font-size:25px;
`


const TextArea = styled(TextareaAutosize)`
 width:100%;
 font-size:18px;
 margin-top:50px;
 border:none;
 &:focus-visible {
          outline:none;
 }
`



const IntilaPost = {
    title: "",
    description: "",
    picture: "",
    userName: "",
    categories: "",
    createdDate:new Date()
}



const CreatePost = () => {

    const [post, setPost] = useState(IntilaPost);
    const [file, setFile] = useState("");
    const location = useLocation();
    const { account } = useContext(DataContext);
    const navigate = useNavigate();

    const url = post.picture ? post.picture : "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg";
    const handleChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value});
    }


    useEffect(() => {
        const getImage = async() => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                //  API CALL
             const response=await API.uploadFile(data);

                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split("=")[1] || 'All';
        post.userName = account.userName;
    
    }, [file])
    

    const savePost = async() => {
        let response = await API.createPost(post);
        if (response.isSuccess) {
            navigate('/');
        }
    }

    return (
        <Container>
            <Image src={url} alt="PostBanner" srcset="" />
            <StyleFormController>
                <label htmlFor="fileInput">
                    <AddCircleIcon fontSize="large" color="action" />
                </label>
                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e)=>setFile(e.target.files[0])} />
                <InputTextField placeholder="Title" onChange={(e)=>handleChange(e)} name="title" />
                <Button variant="contained" onClick={()=>savePost()}>Publish</Button>
            </StyleFormController>
            <TextArea
                minRows={5}
                placeholder="Tell Your Story..........."
                name="description"
                onChange={(e)=>handleChange(e)}
            />
        </Container>

    )
}

export default CreatePost;