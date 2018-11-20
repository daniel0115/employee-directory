//Step:5 =>connect our App Component with Redux using connect() function from react-redux: (这里需要import action)
//Fragments: A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

import React, { Component } from "react";
import { connect } from "react-redux";
//withRouter: 跳转有个方法:redirect and withRouter(can use history.push)
import { withRouter } from "react-router-dom";

import EmployeeList from "../../components/EmployeeList";
import { getEmployees, addEmployee } from "../../actions/employees";

//原来的EmployeeList component 经过withRouter之后生产新的withRoterEmployeeList component，这个可以实现history.push跳转，
//使用方法：this.props.history.push("/")
const WithRoterEmployeeList = withRouter(EmployeeList);

class EmployeeListContainer extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    //getEmployees() is a dispatched method(action) to get all the employees
    //this.props.getEmployees(); => 运行getEmployees()这个method并转成props
    //执行getEmployees action，axios.get(后端url)，axios.then(成功从后端拿到数据)=》dispatch(getEmployeeSuccess(response.data.employees)) => 执行getEmployeeSuccess 这个action，=>把后端返回的数据(response.data.employees)赋给employee: response; =>根据type: "REQUEST_EMPLOYEES_SUCCESS" 找到对应reducer(employee: action.employee) =>把action通过后端拿到的数据给employee，跟新state！
    this.props.getEmployees();
  }

  render() {
    //把mapStateToProps 里转过来的state object（reducer里）赋给新的变量employees
    const { employees } = this.props;
    const employeeList = employees.employee;
    return (
      <WithRoterEmployeeList
        employeeList={employeeList}
        addEmployee={this.props.addEmployee}
      />
      // <Fragment>
      //   {employees.error ? (
      //     <p>can't fetch employees</p>
      //   ) : (
      //     employeeList.length > 0 && <WithRoterEmployeeList />
      //   )}
      // </Fragment>
    );
  }
}

//Step5: connect (mapStateToProps, mapDispatchToProps)
//把employeess reducers的state（object）转成props
const mapStateToProps = state => {
  return {
    employees: state.employees
  };
};

// Any time you want to change the state, you have to dispatch an action.
//把getEmployees -actiondispa过来转成getEmployees props
const mapDispatchToProps = dispatch => {
  return {
    getEmployees: () => {
      dispatch(getEmployees());
    },
    addEmployee: newEmployee => {
      dispatch(addEmployee(newEmployee));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeListContainer);
