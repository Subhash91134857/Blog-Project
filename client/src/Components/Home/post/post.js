import { useEffect, useState } from "react";
import { API } from "../../../Service/api"
import { Box } from "@mui/material";
import { useSearchParams,Link } from "react-router-dom";
import {Grid} from "@mui/material";
// components
import Posts from "./Posts";

const Post = () => {

    const [posts, setPost] = useState([]);
    const [searchParams] = useSearchParams();
    const Category = searchParams.get('category');


    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ Category: Category||""});
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();

    }, [Category])
    // console.log(posts);
    return (
        <>
            {
                posts && posts.length > 0 ? posts.map(post =>{
                    return (
                        <Grid item lg={2} sm={5} xs={12} margin={.5} columnGap={10}> 
                            <Link to={`/details/${post._id}`} style={{textDecoration:'none',color:'inherit'}}>
                                < Posts post={post} />
                            </Link>
                        </Grid>
                    )
             } ) : <Box style={{ color: "#878787", margin: '30px 80px', fontSize: 18 }}>No data available to display</Box>
            }
        </>
    )


}

export default Post;