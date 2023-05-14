import { Box,Typography,styled } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState,useContext } from 'react';
import { API } from '../../Service/api';
import  Edit  from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { DataContext } from "../../context/dataProvider"
import { Comments } from './comments/Comments';

 

const Author = styled(Box)`
      color:#878787;
      margin:20px 0;
      display:flex;

`
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
    }
}));
       
       

const Image = styled('img')({
    width:'100%',
    height:'350px',
    objectFit:'cover',
})
const Heading = styled(Typography)`
font-size:38px;
font-weight:600;
text-align:center;
margin:50px 0 0 0;
word-break:break-word;
`

const EditIcon = styled(Edit)`
margin:5px;
padding:5px;
border:1px solid #878787;
border-radius:10px;
`

const DeleteIcon = styled(Delete)`
margin:5px;
padding:5px;
border:1px solid #878787;
border-radius:10px;
`
const Description = styled(Typography)`
word-break:break-word;
`


const Detailview = () => {
    const url = "";
    const { id } = useParams();
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [])
    

    const deleteBlog = async() => {
        let response = await API.deletePost(id);
        if (response.isSuccess) {
            navigate('/');
        }
    }
   
    return (
        <Container>
            <Image src={post.picture} alt="" srcset="" />
            <Box style={{ float: 'right' }}>
                {
                    account.userName === post.userName &&
                    <>
                        <Link to={`/update/${post._id}`}><EditIcon color='primary'/></Link>
                        <DeleteIcon color='error' onClick={()=>deleteBlog()} />
                    </>
                }
            </Box>
            <Box>
                <Heading>{post.title}</Heading>
            </Box>
            
            <Author>
                <Typography>Author:<Box component="span" style={{fontWeight:600}}>  {post.userName}</Box></Typography>
                <Typography style={{marginLeft:'auto'}}>{ new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <Description>{post.description}</Description>
            <Comments post={post}/>
        </Container>
    )
}

export default Detailview;