import React, { Component } from "react";
import EmployeeDetail from "../../components/EmployeeDetail";

//import action
import { getEmployeeDetail } from "../../actions/employeeDetail";
import {
  getEmployees,
  addEmployee,
  deleteEmployee
} from "../../actions/employees";
import { editEmployee } from "../../actions/editEmployee";

//conncet react and redux;
import { connect } from "react-redux";

import { Layout } from "antd";
import { Row, Col } from "antd";

const { Header, Content } = Layout;

class EmployeeDetailContainer extends Component {
  constructor(props) {
    super(props);
  }
  //获取每一个employee的具体信息by id
  componentDidMount() {
    console.log("componentDidMount called");
    this.props.getEmployeeDetail(this.props.match.params.id);
    console.log("em-detail-id");
    console.log(this.props.match.params.id);
  }

  //获取不同employee 的detail page时，没有办法及时更新，
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps called");
    console.log(nextProps, nextProps.match.params.id);
    console.log("em_current_id:", this.props.match.params.id);
    if (nextProps.match.params.id !== this.props.match.params.id)
      this.props.getEmployeeDetail(nextProps.match.params.id);
  }

  render() {
    const headerStyle = {
      fontSize: "50px",
      color: "white",
      textAlign: "center"
    };

    return (
      <div>
        <Layout>
          <Header style={headerStyle}> Employee Detail</Header>
          <Content>
            <Row>
              <Col span={6} />
              <Col span={12}>
                <EmployeeDetail
                  employeeDetail={this.props.employeeDetail}
                  getEmployeeDetail={this.props.getEmployeeDetail}
                  editEmployee={this.props.editEmployee}
                />
              </Col>
              <Col span={6} />
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employeeDetail: state.employeeDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEmployees: () => {
      dispatch(getEmployees());
    },
    addEmployee: () => {
      dispatch(addEmployee());
    },
    deleteEmployee: () => {
      dispatch(deleteEmployee());
    },
    getEmployeeDetail: id => {
      dispatch(getEmployeeDetail(id));
    },
    editEmployee: (id, newEmployee) => {
      dispatch(editEmployee(id, newEmployee));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetailContainer);
