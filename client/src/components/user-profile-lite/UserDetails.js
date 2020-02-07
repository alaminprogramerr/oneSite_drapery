import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";

import {connect} from 'react-redux'
import login from '../../redux/actions/login'
import logout from '../../redux/actions/logout'

const UserDetails = (props) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={props.user.avatar}
          alt='Avatar Image'
          width="110"
        />
      </div>
      {props.user.lastName?
      <h4 className="mb-0">{props.user.firstName+" "+props.user.lastName}</h4>
:''
      }
      {props.user.job_title?
      <span className="text-muted d-block mb-2">{props.user.job_title}</span>
:''
      }
    </CardHeader>
    {props.user.account_description?
    <ListGroup flush> 
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
        Description
        </strong>
        <span>
          {props.user.account_description}
        </span>
      </ListGroupItem>
    </ListGroup>:''
    }
    
  </Card>
);

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
 /*  userDetails: {
    name: "Sir Robert Burbridge",
    avatar: require("./../../images/avatars/client.png"),
    jobTitle: "Manager",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
  } */
};

const mapStateToProps = (state) => {
  console.log("in mapstate of login")
  console.log(state)
  return({
    isLoggedIn: state.authentication.isLoggedIn,
    user: state.authentication.user,
    //Info from userDetails
    avatar: require("./../../images/avatars/client.png"),
    performanceReportValue: 74
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    loginDispatch: (user) => dispatch(login(user)),
    logoutDispatch: () => dispatch(logout())
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
