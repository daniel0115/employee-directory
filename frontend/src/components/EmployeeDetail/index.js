//step 8: employee detail page design Using Material-UI
//Material-UI: npm install @material-ui/core; npm install @material-ui/icons

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ListItemSecondaryAction } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import TextsmsIcon from "@material-ui/icons/Textsms";
import MailIcon from "@material-ui/icons/Mail";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import EditIcon from "@material-ui/icons/Edit";

import { withRouter } from "react-router-dom";
import EditEmployeeModal from "./EditEmployeeModal";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    margin: "0 auto",
    fontSize: "20px",
    padding: theme.spacing.unit,
    position: "relative",
    overflow: "auto",
    maxHeight: 600
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  typography: {
    padding: theme.spacing.unit
  },
  count: {
    fontSize: "20px",
    textAlign: "right"
  },
  icons: {
    fontSize: 36,
    color: "#039BE5"
  },
  button: {
    margin: theme.spacing.unit
  }
});

class EmployeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  //navigate to homepage
  goBack = () => {
    this.props.history.push("/");
  };

  //navigate to manager page
  goToManager = () => {
    console.log(this.props.employeeDetail.detail.manager);
    this.props.history.push(
      `/employee/${this.props.employeeDetail.detail.manager}`
    );
  };

  // navigate to reporters
  goToReporter = () => {
    console.log(this.props.employeeDetail.detail._id);
    this.props.history.push(
      `/employee/reporters/${this.props.employeeDetail.detail._id}`
    );
  };

  //edit modal
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("shouldComponentUpdate() called.");
  //   console.log("current props: ", this.props);
  //   console.log("next props: ", nextProps);
  //   console.log("current state: ", this.state);
  //   console.log("next state: ", nextState);
  //   return true;
  // }

  // //navigate to manager page
  // selectManager = id => {
  //   if (id) {
  //     // this.props.getEmployeeDetail(id);
  //     this.props.history.push(`/employee/${id}`);
  //   }
  // };

  // edit employee modal function
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  //page navigation
  // function goBack() {
  //   props.history.push("/");
  // }
  // const goBack =() => {
  //   this.props.history.push('/');
  // }

  //
  // function selectManager(id) {
  //   // props.getEmployeeDetail(id);
  //   console.log("manager-id", id);
  //   props.history.push(`/employee/${id}`);
  // }

  render() {
    console.log("props in EmDetailPage:", this.props);
    console.log("em_detai:", this.props.employeeDetail);
    // console.log("em_detai_id:", props.employeeDetail.detail);
    const { classes, employeeDetail } = this.props;
    const { isLoading, error } = this.props.employeeDetail;

    return (
      <div>
        <div>
          <EditEmployeeModal
            visible={this.state.visible}
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
            employeeDetail={this.props.employeeDetail}
            editEmployee={this.props.editEmployee}
            getEmployeeDetail={this.props.getEmployeeDetail}
          />
        </div>

        <div className={classes.root}>
          <IconButton className={classes.button} onClick={this.goBack}>
            <ArrowBackIosIcon
              className={classes.icons}
              style={{ paddingLeft: "10px" }}
            />
          </IconButton>

          {isLoading ? (
            "Loading..."
          ) : error ? (
            "err"
          ) : (
            <List>
              <ListItem>
                <Avatar
                  alt=""
                  style={{ with: "40px", height: "40px" }}
                  src={`http://localhost:5000/uploads/${
                    this.props.employeeDetail.detail.avatar
                  }`}
                />

                <ListItemSecondaryAction>
                  <IconButton
                    className={classes.button}
                    onClick={this.showModal}
                  >
                    <EditIcon style={{ fontSize: 36, color: "blue" }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Name"
                  secondary={employeeDetail.detail.name}
                />
                <ListItemText
                  primary="Title"
                  secondary={employeeDetail.detail.title}
                />
                <ListItemText
                  primary="Sex"
                  secondary={employeeDetail.detail.sex}
                />
              </ListItem>

              {/* <ListItem>
                <ListItemText
                  primary="StartDate"
                  secondary={employeeDetail.detail.startDate}
                />
              </ListItem> */}

              <ListItem onClick={this.goToManager}>
                <ListItemText
                  primary="View Manager"
                  secondary={
                    employeeDetail.managerName
                      ? employeeDetail.managerName
                      : "None"
                  }
                />
                <ListItemSecondaryAction>
                  <ArrowForwardIosIcon className={classes.icons} />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem onClick={this.goToReporter}>
                <ListItemText
                  primary="View Direct Reporter"
                  secondary={employeeDetail.numOfDRs}
                />
                <ListItemSecondaryAction>
                  <ArrowForwardIosIcon className={classes.icons} />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Call Office"
                  secondary={employeeDetail.detail.officePhone}
                />
                <ListItemSecondaryAction>
                  <a href={`tel:${employeeDetail.detail.officePhone}`}>
                    <CallIcon className={classes.icons} />
                  </a>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Call Cell"
                  secondary={employeeDetail.detail.cellPhone}
                />
                <ListItemSecondaryAction>
                  <a href={`tel:${employeeDetail.detail.officePhone}`}>
                    <PhoneIphoneIcon className={classes.icons} />
                  </a>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="SMS"
                  secondary={employeeDetail.detail.SMS}
                />
                <ListItemSecondaryAction>
                  <a href={`sms:${employeeDetail.detail.SMS}`}>
                    <TextsmsIcon className={classes.icons} />
                  </a>
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Email"
                  secondary={employeeDetail.detail.email}
                />
                <ListItemSecondaryAction>
                  <a href={`mailto:${employeeDetail.detail.email}`}>
                    <MailIcon className={classes.icons} />
                  </a>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          )}
        </div>
      </div>
    );
  }
}

EmployeeDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(EmployeeDetail));
