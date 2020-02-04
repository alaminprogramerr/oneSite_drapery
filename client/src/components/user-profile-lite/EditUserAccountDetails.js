import React, { useState} from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, FormGroup, FormInput,
        FormSelect, FormTextarea, Button } from "shards-react";

import {connect} from 'react-redux';
import login from '../../redux/actions/login';
import logout from '../../redux/actions/logout';
import Axios from "axios";

const axios = require('axios')

function EditUserAccountDetails (props) {

  const [firstname, setFirstName] = useState(props.user.firstName);
  const [lastname, setLastName] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.username);
  // const [phone, setPhone] = useState(props.user.phone);
  const [password, setPassword] = useState(props.user.password);
  const [newPassword, setNewPassword] = useState(props.user.newPassword);
  const [confirmpassword, setconfirmPassword] = useState(props.user.confirmpassword);
  // const [address, setAddress] = useState(props.user.address);
  // const [city, setCity] = useState(props.user.city);
  // const [statename, setStateName] = useState(props.user.state_name);
  // const [zipcode, setZipcode] = useState(props.user.zipcode);
  // const [description, setDescription] = useState(props.user.account_description);
  const [editError,setEditError]= useState({})
  const [updateDone , setUpdateDone]=useState('')
  
  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
    console.log(e.target.value);
  }
  const lastNameHandler = (e) => {
    setLastName(e.target.value);
    console.log(e.target.value);
  }
  const emailHandler = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  } 
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  } 
  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value);
    console.log('newPassword', newPassword);
  } 
  const confirmpasswordHandler = (e) => {
    setconfirmPassword(e.target.value);
    console.log('confirmPassword', confirmpassword);
    
  }  
  const formSubmit = async (e) => {
    let userInput = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      oldPassword: password,
      newPassword:newPassword,
      newPassword2:confirmpassword 
    }
    try{
      let response = await axios({
        method:'post',
        url: 'http://localhost:5000/api/users/updateProfile/'+props.user._id,
        headers: {
         'content-type': 'application/json'
        },
        data: userInput
      })
      let user = response.data.user
      props.loginDispatch(user);

    }catch(error){
      console.log(error.response.data)
      setEditError(error.response.data)
    }
  }
  

  
return (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h3 className="m-0">Update profile</h3>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <FormInput
                    id="feFirstName"
                    defaultValue={props.user.firstName}
                    placeholder={props.user.firstName}
                   onChange={e => firstNameHandler(e)}
                  />
                  <p className="text-danger"> {editError.firstName} </p>
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <FormInput
                    id="feLastName"
                    defaultValue={props.user.lastName}
                    placeholder={props.user.lastName}
                    onChange={e => lastNameHandler(e)}
                  />
                  <p className="text-danger"> {editError.lastName} </p>
                </Col>
              </Row> 
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    defaultValue={props.user.username}
                    placeholder={props.user.username}
                    onChange={e => emailHandler(e)}
                    autoComplete="email"
                  />
                  <p className="text-danger"> {editError.email} </p>
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    defaultValue={props.user.password}
                    placeholder={props.user.password}
                    onChange={e => passwordHandler(e)}
                  />
                  <p className="text-danger"> {editError.massage} </p>
                  <p className="text-danger"> {editError.oldPassword} </p>
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">New password</label>
                  <FormInput
                    type="password"
                    defaultValue={props.user.newPassword}
                    placeholder="Enter new password"
                    onChange={e => newPasswordHandler(e)}
                  />
                  <p className="text-danger"> {editError.newPassword} </p>
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Confirm password</label>
                  <FormInput
                    type="password"
                    defaultValue={props.user.confirmPassword}
                    placeholder="Enter confirm password"
                    onChange={e => confirmpasswordHandler
                      (e)}
                  />
                  <p className="text-danger"> {editError.newPassword2} </p>
                </Col>
              </Row> 
              <Button onClick={e=>formSubmit(e)}>Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
  );
}

EditUserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

EditUserAccountDetails.defaultProps = {
  title: "Account Details"
};

const mapStateToProps = (state) => {
  console.log("in mapstate of login")
  console.log(state)
  return({
    isLoggedIn: state.authentication.isLoggedIn,
    user: state.authentication.user,
    //additional props
    title: 'Account Details'
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    loginDispatch: (user) => dispatch(login(user)),
    logoutDispatch: () => dispatch(logout())
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUserAccountDetails);
