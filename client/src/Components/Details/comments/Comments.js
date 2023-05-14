import { Box, TextareaAutosize, Button, styled } from "@mui/material"
import { useState, useContext, useEffect } from "react"
import { DataContext } from "../../../context/dataProvider"
import { API } from "../../../Service/api"


//Components
import Comment from "./Comment"
import { Prev } from "react-bootstrap/esm/PageItem"


const Container = styled(Box)
    `
    margin-top:100px;
    display:flex;
    `

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
})

const TextArea = styled(TextareaAutosize)`
   height:100px;
   width:100%;
   margin:0 20px;

`
const IntialValues = {
    name:'',
    postId: '',
    comments: '',
    date: new Date(),
}

export const Comments = ({ post }) => {
    const [comment, setComment] = useState(IntialValues);
    const {account } = useContext(DataContext);
    const [comments, setComments] = useState([]);
    const [toggle, settoggle] = useState(false); 
    useEffect(() => {
        const getDate = async () => {
            const response = await API.getAllComm(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        getDate();
    }, [post,toggle])

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.userName,
            postId: post._id,
            comments: e.target.value

        })
    }

    const addComment = async () => {
        let response = await API.newcomment(comment);
        if (response.isSuccess) {
            setComment(IntialValues);
            settoggle(prevState => !prevState);
        }
    }

    const url = 'https://static.thenounproject.com/png/12017-200.png'
    return (
        <Box>
            <Container>
                <Image src={url} alt="" srcset="" />
                <TextArea
                    minRows={5}
                    placeholder="Give some feedback"
                    value={comment.comments}
                    onChange={(e) => handleChange(e)}
                />
                <Button variant="contained" size="medium" style={{ height: 40 }}
                    onClick={() => addComment()}
                >Post</Button>
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => {
                        return (
                            <Comment comment={comment} settoggle={settoggle} />
                      )
                  })
                }
            </Box>
        </Box>
    )
}