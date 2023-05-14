import { Box, Typography,styled } from "@mui/material";
import Delete from '@mui/icons-material/Delete';
import { useContext } from "react";
import { DataContext } from "../../../context/dataProvider"
import { API } from "../../../Service/api";



const Component = styled(Box)
    `
    margin-top:30px;
    background:#f5f5f5;
    padding:10px;
    `

const Container = styled(Box)
    `
     display:flex;
     margin-bottom:5px;
   
   `
const Name = styled(Typography)
`
   font-weight:600;
   font-size:18px;
   margin-right:20px;
`
const DateIcon= styled(Typography)
`
    color:#878787;
    font-size:14px;
`
const DeleteIcon = styled(Delete)`
   margin-left:auto;
`
const Comment = ({ comment, settoggle }) => {

    const { account } = useContext(DataContext);


    const removeComment = async() => {
        let response = await API.deleteComment(comment._id);
        if (response.isSuccess) {
            settoggle(prevState => !prevState);
        }
    }
    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <DateIcon>{new Date(comment.date).toDateString()}</DateIcon>
                {comment.name === account.userName && <DeleteIcon onClick={()=>removeComment()} />}
            </Container>
            <Box>
                <Typography>{comment.comments}</Typography>
            </Box>
        </Component>



    )
}

export default Comment;