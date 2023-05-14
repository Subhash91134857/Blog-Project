import { Box, Typography, styled } from "@mui/material";
import { addElipsis } from "../../../utils/common-utils";


const Container = styled(Box)`
${'' /* border:1px solid #dedede; */}
perspective: 500px;
border-radius:10px;
margin-top:30px;
margin-left:45px;
height:300px;
width:100%;
display:flex;
align-items:center;
flex-direction:column;
box-shadow: 2px 3px 20px black, 0 0 60px #8a4d0f inset;
background: #fffef0;
transform-style: preserve-3d;
will-change: transform;
 transition: transform .5s;
& > p{
    padding:0 5px 5px 5px;
}
`
const bosSx = {
    "&:hover": {
        transform: 'translateZ(70px)',
    }
}
const boxSX = {
    "&:hover": {
        transform: 'translateZ(10px) rotateX(20deg) rotateY(20deg)',
        position: 'relative',
        zindex: '-200',
        bosSx:'bosSx',

    },
};

const ChildBox = styled(Box)
    `
    color:black;
    transition: transform .5s;
    font: 800 1.5rem monospace;
    text-shadow:-1px - 1px 0 #000,1px - 1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;
`

   
const Image = styled('img')({
    width: '100%',
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
    height:150,
})
 
const Text = styled(Typography)`
   color:#878787;
   font-size:12px;
`

const Heading = styled(Typography)`
font-size:18px;
font-weight:600;
`

const Details = styled(Typography)`
     font-size:14px;
     word-break:break-word;
`

const Posts = ({post}) => {
    return(
        <Container sx={boxSX}>
                <Image src={post.picture} alt="No Image Selected" srcset="" />
            <Text>{addElipsis(post.categories, 20)}</Text>
            <ChildBox sx={bosSx}><Heading>{post.title}</Heading></ChildBox>
                {/* <Heading>{post.title}</Heading> */}
                <Text>{post.userName}</Text>
                <Details>{addElipsis(post.description, 70)}</Details>
        </Container>
    )
}

export default Posts;