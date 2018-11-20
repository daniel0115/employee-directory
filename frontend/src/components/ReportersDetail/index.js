//step 8: employee detail page design Using Material-UI
//Material-UI: npm install @material-ui/core; npm install @material-ui/icons

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import Avatar from "@material-ui/core/Avatar";
// import ImageIcon from "@material-ui/icons/Image";
// import WorkIcon from "@material-ui/icons/Work";
// import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import IconButton from "@material-ui/core/IconButton";
// import DeleteIcon from "@material-ui/icons/Delete";
// import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ListItemSecondaryAction } from "@material-ui/core";
// import CallIcon from "@material-ui/icons/Call";
// import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
// import TextsmsIcon from "@material-ui/icons/Textsms";
// import MailIcon from "@material-ui/icons/Mail";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import EditIcon from "@material-ui/icons/Edit";

import { withRouter } from "react-router-dom";

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
    this.props.history.push(
      `/employee/${this.props.employeeDetail.detail._id}`
    );
  };

  //navigate to each reporter page,need to pass id here
  goEachReporter = id => {
    console.log(this.props.directReporters.data);
    this.props.history.push(`/employee/${id}`);
    // this.props.history.push(`/employee/${this.props.directReporters.data._id}`);
  };

  //call getReporters action to update the state(directReporters) in store
  componentDidMount() {
    this.props.getReporters(this.props.employeeDetail.detail._id);
    console.log(this.props.employeeDetail.detail._id);
    console.log("props in ReporterPage:", this.props);
  }

  render() {
    // console.log("props in ReporterPage:", this.props);
    // console.log("em_detai:", this.props.employeeDetail);
    // console.log("em_detai_id:", props.employeeDetail.detail);
    const { classes } = this.props;
    // const { detail } = this.props.employeeDetail;
    // // const { isLoading, error } = this.props.employeeDetail;
    const { data } = this.props.directReporters;
    console.log(this.props.directReporters.data);
    return (
      <div>
        <div className={classes.root}>
          <IconButton className={classes.button} onClick={this.goBack}>
            <ArrowBackIosIcon
              className={classes.icons}
              style={{ paddingLeft: "10px" }}
            />
          </IconButton>

          <List>
            {data.map(employee => (
              <ListItem
                key={employee._id}
                onClick={() => this.goEachReporter(employee._id)}
              >
                <ListItemText
                  primary="Name"
                  secondary={employee.name}
                  style={{ fontSize: "20px" }}
                />
                <ListItemText
                  primary="Title"
                  secondary={employee.title}
                  style={{ fontSize: "20px" }}
                />

                <ListItemSecondaryAction>
                  <ArrowForwardIosIcon className={classes.icons} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    );
  }
}

EmployeeDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(EmployeeDetail));
