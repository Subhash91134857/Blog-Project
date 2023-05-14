import Banner from "../Banner/banner";
import Categories from "./category";
import { Grid } from "@mui/material";
import Post from "./post/post";




const Home = () => {
    return (
        <>
            <Banner />
            <Grid container >
                <Grid item lg={2} sm={2} xs={12} sx={{
                    "&:hover": {
                       color:'#fff',
                    }
                }}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Post />
                </Grid>

            </Grid>

        </>
    )
}

export default Home;