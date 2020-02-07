import React, { useState , useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import queryString  from 'querystring'
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Logo from "../../assets/img/logo.png";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import image from "../../assets/img/background.png";
import Input from '@material-ui/core/Input';
import {Link} from 'react-router-dom'
import login from '../../redux/actions/login'
import logout from '../../redux/actions/logout'
import {connect} from 'react-redux'
import Axios from "axios";
import jwtDecode  from 'jwt-decode'
const useStyles = makeStyles(styles);
const {GoogleLogin} = require('react-google-login')
const {MicrosoftLogin} =require('react-microsoft-login')
const axios = require('axios')

function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [failedLogin, setFailedLogin] = useState('')
  let [loginError, setLoginError]=useState({})
  const passwordHandler = (event) =>{
    setUserPassword(event.target.value)

  }
  const emailHandler = (event) => {
    setUserEmail(event.target.value)
  }
  
  useEffect(()=>{
    
    if(props.location.search){
      console.log(props.location.search)
      let  x = (props.location.search)
      let z= x.split('=')[1]
      let obj = jwtDecode(z)
      console.log(obj)
      props.loginDispatch(obj)
      props.history.push("/profile")

    }

},[])
  const formSubmit = async (event) => {
    event.preventDefault()
    let credentials = {
      'email': userEmail,
      'password': userPassword
    }

    try{
      let response = await axios({
        method:'post',
        url: 'http://localhost:5000/api/users/login',
        headers: {
         'content-type': 'application/json'
        },
        data: credentials
      })
      let user = response.data.userData
      props.loginDispatch(user)
      props.history.push("/profile")
      console.log(user)
    }catch(error){
      setLoginError(error.response.data)
    }
  }
  

  
  
  let failedLoginAlert = <p> </p>
  if(failedLogin){
    failedLoginAlert = <div>
      <p>Wrong username or password. Please try again.</p>
      <p>If you do not have an account, please contact System Administrator to create one</p>
      </div>
  }

  return (
    <div className={classes.loginbox}>
      <Header
        brand=""
        absolute
        color="transparent"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              {failedLoginAlert}
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                    <img src={Logo}  className={classes.image} alt='Onsite Drapery, LLC logo'/>
                  <CardBody>
                    <Input 
                      autoFocus={true}
                      fullWidth={true}
                      onChange={emailHandler}
                      placeholder="Email"
                      required={true}
                      value = {userEmail}
                    />
                    <p className="text-danger"> {loginError.email} </p>
                    <Input 
                      autoFocus={true}
                      fullWidth={true}
                      onChange={passwordHandler}
                      placeholder="Password"
                      type="password"
                      required={true}
                      value = {userPassword}
                    />
                    <p className="text-danger"> {loginError.massage} </p>
                    <p className="text-danger"> {loginError.password} </p>

                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button href="/profile" onClick={formSubmit} className={classes.loginBtn}><b>Login</b></Button>
                  </CardFooter>
                  <CardFooter  className={classes.cardFooter}>
                    {/* <GoogleLogin  />  */}
                    
                  <a href="http://localhost:5000/auth/google" className="">
                      <Button className="btn-icon btn-round btn-success" >
                        <i className="fab fa-google" />
                      </Button>
                    </a>
                      <MicrosoftLogin className="mr-2 bl-2"/>
                  </CardFooter>
                  <CardFooter>
                    
                  <p className="text-center">Not registerd yet ? Go to <Link to="/signup">Sign up</Link> </p>

                  </CardFooter>

                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("in mapstate of login")
  console.log(state)
  return({
    isLoggedIn: state.authentication.isLoggedIn,
    user: state.authentication.user
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    loginDispatch: (user) => dispatch(login(user)),
    logoutDispatch: () => dispatch(logout())
  })
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)