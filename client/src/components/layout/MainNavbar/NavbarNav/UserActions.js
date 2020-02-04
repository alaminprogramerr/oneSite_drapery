import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import logout from '../../../../redux/actions/logout'
import './style.css'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.logout = this.logout.bind(this)
    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  logout(){
    console.log("in logout of useractions")
    this.props.logoutDispatch()
  }

  render() {
    return (
      <NavItem tag={Dropdown}  className="cursor"  caret toggle={this.toggleUserActions}>
        <DropdownToggle  caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={this.props.user.avatar}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block"> {this.props.user.firstName+' ' +  this. props.user.lastName} </span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/profile">
            <img src={require("./../../../../images/icons/user.png")}/>Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="/editprofile">
            <img src={require("./../../../../images/icons/edit.png")}/>Edit Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="text-danger" onClick={this.logout}>
            <img src={require("./../../../../images/icons/logout.png")}/>Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

const mapStateToProps = (state) => {

  return({
    isLoggedIn: state.authentication.isLoggedIn,
    user:state.authentication.user
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    logoutDispatch: () => dispatch(logout())
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(UserActions)