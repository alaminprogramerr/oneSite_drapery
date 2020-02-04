import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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

import login from '../../redux/actions/login'
import logout from '../../redux/actions/logout'

import {connect} from 'react-redux'
import { CardHeader } from "@material-ui/core";
import { Row } from "shards-react";

const useStyles = makeStyles(styles);

//Google OAuth imports
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

  let [userInfo, setUserInfo] = useState({}); 
  let [file , setFile ]=useState('')
  let [signUpError , setSignUpError]= useState({})
  const changeHandler =(event)=>{
    setUserInfo({
      ...userInfo,
      [event.target.name]:event.target.value
    })
  }


  const onFileChoose=(event)=>{
    setFile(event.target.files[0])
  }
  const formSubmit = async (event) => {
    let formData =  new FormData()
    formData.append('file', file)
    formData.append('firstName', userInfo.firstName)
    formData.append('lastName', userInfo.lastName)
    formData.append('email', userInfo.email)
    formData.append('password', userInfo.password)
    formData.append('password2', userInfo.password2)
    formData.append('account_description', userInfo.account_description)
    formData.append('job_title', userInfo.job_title)
    formData.append('phone', userInfo.phone)
    formData.append('address', userInfo.address)
    formData.append('city', userInfo.city)
    formData.append('state_name', userInfo.state_name)
    formData.append('zipcode', userInfo.zipcode)

    event.preventDefault() 

    try{
      let response = await axios({
        method:'post',
        url: 'http://localhost:5000/api/users/register',
        headers: {
         'content-type': 'application/json'
        },
        data: formData
      })
      let user = response.data
      props.loginDispatch(user)
      props.history.push("/login")
    }catch(error){
      if(error.response.data){
        return setSignUpError(error.response.data)
      }else{
        return
      }
    }
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
            <GridItem xs={12} sm={12} md={10}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={formSubmit}>
                  <CardBody>
                    <h1 className="text-center mt-2 mb-5">Sign up form</h1>
                    <Row>
                      
                    <div  className=" col-md-4">
                        <div class="custom-file mt-4">
                          <label class="custom-file-label" for="customFile"> {userInfo.file?userInfo.file:"Choose Profile image"} </label>
                          <input type="file" class="custom-file-input" id="customFile" onChange={onFileChoose}   />
                          <p className="text-danger"> {signUpError.image} </p>
                        </div>
                      </div >
                      <div className="col-md-4">
                        <label>First Name</label>
                        <input 
                          name="firstName"
                          onChange={ changeHandler}
                          placeholder="First name"
                          className="form-control"
                        />
                          <p className="text-danger"> {signUpError.firstName} </p>
                      </div>
                      <div className="col-md-4">
                        <label>Last Name</label>
                        <input 
                          name="lastName"
                          onChange={ changeHandler}
                          className="form-control"
                          placeholder="Last name"
                        />
                          <p className="text-danger"> {signUpError.lastName} </p>

                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-3">
                        
                      <label>Email</label>
                        <input 
                          name="email"
                          type="email"
                          onChange={ changeHandler}
                          placeholder="Email"
                          className="form-control"
                        />
                          <p className="text-danger"> {signUpError.email} </p>
                      </div>
                      <div className="col-md-3">
                        
                      <label>Password</label>
                        <input 
                        type="password"
                          name="password"
                          onChange={ changeHandler}
                          placeholder="Password"
                          className="form-control"

                        />
                          <p className="text-danger"> {signUpError.password} </p>
                      </div>
                      <div className="col-md-3">
                        <label>Confirm password</label>
                        <input 
                        type="password"
                          name="password2"
                          onChange={ changeHandler}
                          className="form-control"
                          placeholder="Confirm password"
                        />
                          <p className="text-danger"> {signUpError.password2} </p>
                      </div>
                      <div className="col-md-3">
                        <label>Your description </label>
                        <input 
                          name="account_description"
                          onChange={ changeHandler}
                          className="form-control"
                          placeholder="Description"
                        />
                          <p className="text-danger"> {signUpError.account_description} </p>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-4">
                        <label>Job title</label>
                        <input 
                          name="job_title"
                          onChange={ changeHandler}
                          placeholder="Job title"
                          className="form-control"
                        />
                          <p className="text-danger"> {signUpError.job_title} </p>
                      </div>
                      <div className="col-md-4">
                        <label>State name</label>
                        <input 
                          name="state_name"
                          onChange={ changeHandler}
                          className="form-control"
                          placeholder="State name"
                        />
                          <p className="text-danger"> {signUpError.state_name} </p>
                      </div>
                      <div className="col-md-4">
                        <label>Zip code </label>
                        <input 
                          name="zipcode"
                          onChange={ changeHandler}
                          className="form-control"
                          placeholder="Zip code"
                        />
                          <p className="text-danger"> {signUpError.zipcode} </p>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-6">
                        <label>Address</label>
                        <input 
                          name="address"
                          onChange={ changeHandler}
                          placeholder="Address"
                          className="form-control"
                        />
                          <p className="text-danger"> {signUpError.address} </p>
                      </div>
                      <div className="col-md-3">
                        <label>City</label>
                        <input 
                          name="city"
                          onChange={ changeHandler}
                          className="form-control"
                          placeholder="City  "
                        />
                          <p className="text-danger"> {signUpError.city} </p>
                      </div>
                      <div className="col-md-3">
                        <label>Phone   </label>
                        <input 
                          name="phone"
                          onChange={ changeHandler}
                          className="form-control"
                          placeholder="Phone  "
                        />
                          <p className="text-danger"> {signUpError.phone} </p>
                      </div>
                    </Row>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button href="/profile" onClick={formSubmit} className={classes.loginBtn}><b>Login</b></Button>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
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