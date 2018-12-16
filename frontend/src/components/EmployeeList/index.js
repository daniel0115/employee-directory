//step6: page layout design
// <ShowEmployees employeeList={this.props.employeeList} => 把从EmployeeListContainer folder 里的index.js中经过mapStateToProps把reducers里的state 那个object转成props（ const { employees } = this.props;），再把state中的employee element取出赋给employeeList（const employeeList = employees.employee;），我们就可以把employeeList当做props传给其他子component！

import React, { Component } from "react";
import ShowEmployees from "./ShowEmployees";

import { Layout } from "antd";
import { Row, Col } from "antd";

const { Header, Content } = Layout;

class EmployeeList extends Component {
  render() {
    const headerStyle = {
      // margin: "auto",
      // buttomBorder: "2px solid black",
      fontSize: "50px",
      color: "white",
      textAlign: "center"
    };
    // const footerStyle = {
    //   position: "absolute",
    //   bottom: "0",
    //   witdh: "100%",
    //   height: "100px",
    //   textAlign: "center",
    //   fontSize: "16px"
    // };

    // const bodyStyle = {
    //   backgroundColor: "white"
    // };
    return (
      <div>
        <Layout>
          <Header style={headerStyle}> Employee Management System</Header>
          <Content>
            <Row>
              <Col span={2} />
              <Col span={20}>
                <ShowEmployees
                  employeeList={this.props.employeeList}
                  addEmployee={this.props.addEmployee}
                />
                >
              </Col>
              <Col span={2} />
            </Row>
          </Content>
          {/* <Footer style={footerStyle}>@Copy Right Reserved by Daniel</Footer> */}
        </Layout>
      </div>
    );
  }
}

export default EmployeeList;
