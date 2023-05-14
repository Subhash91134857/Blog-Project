import styled from "@emotion/styled";
import { AppBar,Toolbar } from "@mui/material";


import {Link} from "react-router-dom";

const Component = styled(AppBar)`
background: linear-gradient(390deg, hsla(48, 78%, 82%, 1) 0%, hsla(38, 79%, 81%, 1) 0%, hsla(43, 79%, 82%, 1) 0%, hsla(33, 29%, 61%, 1) 10%, hsla(358, 82%, 70%, 1) 97%);
color:#000
`
const Container = styled(Toolbar)`
justify-content:end;
&> a {
    padding:20px;
    color:#000;
    text-decoration:none;
}
`




const Header = () => {
    return (
        <Component>
            <Container>
                
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to={'/login'}>LOGOUT</Link>
                
            </Container>
        </Component>
    )
}

export default Header;