import { Box, Typography, styled } from "@mui/material";


const Image = styled(Box)`
background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`

const Heading = styled(Typography)
    `
      font-size:70px;
       color:#fff94c;
       line-height:1; 
    `

const SubHeading = styled(Typography)
    `
    font-size:20px;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
    margin-top:10px;
    color:#fff
    
    
    `

const Banner = () => {
    return (
        <Image>
           <Heading>Blog</Heading>
            <SubHeading>Tech In Trend</SubHeading>
        </Image>
    )
}

export default Banner;