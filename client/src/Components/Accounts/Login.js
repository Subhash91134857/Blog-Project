import { useContext, useState } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import Logo from "../../images/LoginPage.png"
import { API } from '../../Service/api';
import { DataContext } from '../../context/dataProvider';
import { useNavigate } from 'react-router';


const FullPage = styled(Box)`
border-radius: 56px;
background: #e0e0e0;
box-shadow: inset -35px -35px 43px #c3c3c3,inset 35px 35px 43px #fdfdfd;
display:flex;
align-items:center;
justify-content:center;
${'' /* position:relative;   */}
`
const WAVES = styled(Box)`
position:relative;
top:-273px;
z-index:-1;
`
const WAVESD = styled(Box)`
${'' /* border:2px red solid; */}
position:relative;
top:-456px;
z-index:-2;
`
const Component = styled(Box)`
width:400px;
height:90vh;
box-shadow:10px 12px 15px 4px rgb(0 4 5/ 0.9);
background: linear-gradient(184deg, rgb(253, 112, 196) 0.00%, rgb(196, 98, 63) 18.42%, rgb(192, 201, 123) 42.14%, rgb(181, 184, 173) 52.81%, rgb(190, 187, 198) 70.59%, rgb(197, 197, 217) 81.93%, rgb(46, 150, 171) 100.00%);
border-radius:20px;
position:relative;
bottom:20px;
${'' /* z-index:6; */}
${'' /* margin-left:200px; */}
${'' /* padding:300px; */}
${'' /* border:2px grey dotted; */}
z-index:8000;
`

const Image = styled('img')({
    width: 400,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0 '

});

const Wrapper = styled(Box)`
padding: 25px 35px ;
display:flex;
flex:1;
flex-direction:column;
&>div,&>button,&>p{
    margin-top:20px;
}

${'' /*  we can make individaul css for evry textfield but we can use this to make child css */}

`




const LoginButton = styled(Button)`
 text-transform:none;
 background:#FB641B;
 color:#fff;
 height:48px;
 border-radius: 2px;
`
const SignUpButton = styled(Button)`
 text-transform:none;
 background:#fff;
 color:#2874f0;
 height:48px;
 border-radius: 2px;
 box-shadow: 0 2px 4px 0 rgb(0 0  0/ 80%)
`

const Text = styled(Typography)`
color:#878787;
font-size:16px
`
const Error = styled(Typography)`
font-size:16px;
color:red;
line-height:10;
margin-top:20px;
`


const signupIntialValue = {
    name: "",
    userName: "",
    password: "",
}


const loginIntialValue = {
    userName: "",
    password: "",
}

const Login = ({ isUserAuthenticated }) => {

    const [account, toggleAccount] = useState('login')
    const [signup, setSignup] = useState(signupIntialValue)
    const [error, setError] = useState('');
    const [logindata, setLogin] = useState(loginIntialValue);






    const toggleSignup = (e) => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup')
    }



    // Signup Area
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }




    //  Signing Data
    const signupUser = async () => {

        let response = await API.userSignup(signup)
        // console.log(response);
        if (response.isSuccess) {
            setError('')
            setSignup(signupIntialValue);
            toggleAccount('login')
        } else {
            if (response.isError) {
                setError("Something went wrong! please try agian later")
            }
        }
    }

    //  Signup Area end

    // ////////////////////////////////////////////////////////////////////////////////////////////




    //  Taking value from context

    const { setAccount } = useContext(DataContext);

    const navigate = useNavigate();
    //  Loging Area
    // Seting the data to login
    const onValueChange = (e) => {
        setLogin({ ...logindata, [e.target.name]: e.target.value })
    }

    //    sending data via api
    const loginUser = async () => {
        // console.log(logindata);
        let response = await API.userLogin(logindata);
        if (response.isSuccess) {
            setError('');
            sessionStorage.setItem(`accessToken`, `Bearer ${response.data.accessToken}`)
            sessionStorage.setItem(`refereshToken`, `Bearer ${response.data.refereshToken}`)
            setAccount({ userName: response.data.userName, name: response.data.name });
            isUserAuthenticated(true);
            navigate('/');

        } else {
            if (response.isError) {
                setError('Something went wrong! plaese try again later');
            }
        }
    }


    return (
        <FullPage>

            <Component>
                <Box>
                    <Image src={Logo} alt='login' />
                    {
                        account === 'login' ?
                            <Wrapper>
                                <TextField variant='standard' onChange={(e) => onValueChange(e)} name="userName" label="Enter username" />
                                <TextField variant='standard' onChange={(e) => onValueChange(e)} name="password" label="Enter password" />

                                {error && <Error>
                                    {error}
                                </Error>}

                                <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <SignUpButton onClick={() => {
                                    toggleSignup()
                                }}>Create an account</SignUpButton>
                            </Wrapper>
                            :
                            <Wrapper>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name="name" label="Enter Name" />
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name="userName" label="Enter username" />
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name="password" label="Enter password" />

                                {error && <Error>
                                    {error}
                                </Error>}
                                <SignUpButton onClick={() => signupUser()}>Signup</SignUpButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <LoginButton variant='contained' onClick={() => {
                                    toggleSignup()
                                }} >Already have an account</LoginButton>
                            </Wrapper>
                    }
                </Box>
                <WAVES>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#3034" fill-opacity="1" d="M0,256L8.6,250.7C17.1,245,34,235,51,245.3C68.6,256,86,288,103,277.3C120,267,137,213,154,202.7C171.4,192,189,224,206,202.7C222.9,181,240,107,257,106.7C274.3,107,291,181,309,192C325.7,203,343,149,360,128C377.1,107,394,117,411,106.7C428.6,96,446,64,463,48C480,32,497,32,514,80C531.4,128,549,224,566,245.3C582.9,267,600,213,617,165.3C634.3,117,651,75,669,80C685.7,85,703,139,720,186.7C737.1,235,754,277,771,277.3C788.6,277,806,235,823,192C840,149,857,107,874,101.3C891.4,96,909,128,926,170.7C942.9,213,960,267,977,272C994.3,277,1011,235,1029,186.7C1045.7,139,1063,85,1080,85.3C1097.1,85,1114,139,1131,186.7C1148.6,235,1166,277,1183,272C1200,267,1217,213,1234,197.3C1251.4,181,1269,203,1286,202.7C1302.9,203,1320,181,1337,149.3C1354.3,117,1371,75,1389,90.7C1405.7,107,1423,181,1431,218.7L1440,256L1440,0L1431.4,0C1422.9,0,1406,0,1389,0C1371.4,0,1354,0,1337,0C1320,0,1303,0,1286,0C1268.6,0,1251,0,1234,0C1217.1,0,1200,0,1183,0C1165.7,0,1149,0,1131,0C1114.3,0,1097,0,1080,0C1062.9,0,1046,0,1029,0C1011.4,0,994,0,977,0C960,0,943,0,926,0C908.6,0,891,0,874,0C857.1,0,840,0,823,0C805.7,0,789,0,771,0C754.3,0,737,0,720,0C702.9,0,686,0,669,0C651.4,0,634,0,617,0C600,0,583,0,566,0C548.6,0,531,0,514,0C497.1,0,480,0,463,0C445.7,0,429,0,411,0C394.3,0,377,0,360,0C342.9,0,326,0,309,0C291.4,0,274,0,257,0C240,0,223,0,206,0C188.6,0,171,0,154,0C137.1,0,120,0,103,0C85.7,0,69,0,51,0C34.3,0,17,0,9,0L0,0Z">

                    </path>
                    </svg>
                </WAVES>
                <WAVESD>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fed" fill-opacity="1" d="M0,320L6.2,309.3C12.3,299,25,277,37,272C49.2,267,62,277,74,277.3C86.2,277,98,267,111,250.7C123.1,235,135,213,148,181.3C160,149,172,107,185,112C196.9,117,209,171,222,197.3C233.8,224,246,224,258,218.7C270.8,213,283,203,295,202.7C307.7,203,320,213,332,192C344.6,171,357,117,369,112C381.5,107,394,149,406,176C418.5,203,431,213,443,192C455.4,171,468,117,480,96C492.3,75,505,85,517,122.7C529.2,160,542,224,554,240C566.2,256,578,224,591,197.3C603.1,171,615,149,628,144C640,139,652,149,665,138.7C676.9,128,689,96,702,106.7C713.8,117,726,171,738,176C750.8,181,763,139,775,112C787.7,85,800,75,812,74.7C824.6,75,837,85,849,122.7C861.5,160,874,224,886,256C898.5,288,911,288,923,282.7C935.4,277,948,267,960,229.3C972.3,192,985,128,997,85.3C1009.2,43,1022,21,1034,58.7C1046.2,96,1058,192,1071,197.3C1083.1,203,1095,117,1108,96C1120,75,1132,117,1145,138.7C1156.9,160,1169,160,1182,154.7C1193.8,149,1206,139,1218,128C1230.8,117,1243,107,1255,117.3C1267.7,128,1280,160,1292,160C1304.6,160,1317,128,1329,106.7C1341.5,85,1354,75,1366,112C1378.5,149,1391,235,1403,261.3C1415.4,288,1428,256,1434,240L1440,224L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z"></path></svg>
                </WAVESD>
            </Component>
        </FullPage>

    )
}

export default Login