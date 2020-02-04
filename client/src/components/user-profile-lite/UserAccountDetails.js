import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, FormGroup } from "shards-react";

import {connect} from 'react-redux'
import login from '../../redux/actions/login'
import logout from '../../redux/actions/logout'


function UserAccountDetails(props){
  
  return(
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      {/* <h6 className="m-0">{title}</h6> */}
      <h3 className="m-0">Account Details</h3>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label className="text-success " style={{fontSize:"20px"  }} htmlFor="feFirstName">First Name :</label>
                  <h6>{props.user.firstName}</h6>
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label className="text-success " style={{fontSize:"20px"  }} htmlFor="feLastName">Last Name :</label>
                  <h6>{props.user.lastName}</h6>
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label className="text-success " style={{fontSize:"20px"  }} htmlFor="feEmail">Email :</label>
                  <h6>{props.user.email}</h6>
                </Col>
                <Col md="6" className="form-group">
                  <label className="text-success " style={{fontSize:"20px"  }} htmlFor="fePhone">Phone  Number :</label>
                  <h6>{props.user.phone}</h6>
                </Col>
              </Row>
              <FormGroup>
                <label className="text-success " style={{fontSize:"20px"  }} htmlFor="feAddress">Address :</label>
                <h6>{props.user.address}</h6>
              </FormGroup>
              <Row form>
                {/* City */}
                <Col md="6" className="form-group">
                  <label className="text-success " style={{fontSize:"20px"  }} htmlFor="feCity">City :</label>
                  <h6>{props.user.city}</h6>
                </Col>
                {/* State */}
                <Col md="4" className="form-group">
                  <label className="text-success " style={{fontSize:"20px"  }} htmlFor="feInputState">State :</label>
                  <h6>{props.user.state_name}</h6>
                </Col>
                {/* Zip Code */}
                <Col md="2" className="form-group">
                  <label className="text-success " style={{fontSize:"20px"  }} htmlFor="feZipCode">Zip :</label>
                  <h6>{props.user.zipcode}</h6>
                </Col>
              </Row>
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label className="text-success " style={{fontSize:"20px"  }} htmlFor="feDescription">Description :</label>
                  <h6>{props.user.account_description}</h6>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);
}

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

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
export default connect(mapStateToProps, mapDispatchToProps)(UserAccountDetails);
