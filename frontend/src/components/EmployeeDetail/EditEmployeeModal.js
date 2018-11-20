//step8: add the employee use modal detail coding
//为了添加employee，我们需要先添加一个action => addEmployees!
//很重要：为了添加新的employee，我们需要把addEmployees 这个action function 传到AddEmployeeModal 里！或者在这个component里(mapStateToProps, mapDispatchToProps)
//step8: add new employee 时，如果取到manager信息：this.props.employeeList.map(employee => { }  => 然后很重要的是： handleSubmit = e => { this.props.addEmployee(values); }，执行addEmployee(values) 这个action，把从form表单里新加的employee 信息存在values里，再通过action文件里的axios，post新employee到后端的reducers（CRUD),在拿response！

//step9: delete employee => 为了delete employee ，我必须得dispatch一个deleteEmployee action，方法类似于添加employee那个表单的handlesubmit
import React, { Component } from "react";
import { Modal } from "antd";

import { Form, Input, DatePicker, Select, Button } from "antd";

import { connect } from "react-redux";

import moment from "moment";

const FormItem = Form.Item;
// const Option = Select.Option;
// const AutoCompleteOption = AutoComplete.Option;

class EditEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: []
    };
  }

  //
  // componentDidMount = () => {
  //   this.props.employeeList.manager();
  // };

  handleSubmit = e => {
    e.preventDefault();
    console.log(
      `You want to edit staff: ${this.props.employeeDetail.detail._id}`
    );
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.handleCancel();
        this.props.editEmployee(this.props.employeeDetail.detail._id, values);

        //出现问题，跟新完后，页面没有同步刷新，两个办法，在action里，dispatch getEmployeeDetail action;
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    //把mapStateToProps 里转过来的state object（reducer里）一层层从component里传过来
    // const { employeeList, addEmployee } = this.props;

    const { getFieldDecorator } = this.props.form;

    const { detail } = this.props.employeeDetail;
    // const id = this.props.employeeDetail.detail._id;

    console.log("EditModal props:", this.props);

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    // const prefixSelector = getFieldDecorator("prefix", {
    //   initialValue: "86"
    // })(
    //   <Select style={{ width: 70 }}>
    //     <Option value="86">+86</Option>
    //     <Option value="87">+87</Option>
    //   </Select>
    // );

    // const websiteOptions = autoCompleteResult.map(website => (
    //   <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    // ));

    return (
      <Modal
        title="Edit Employee"
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Name">
            {getFieldDecorator("name", {
              initialValue: detail.name,
              rules: [
                {
                  required: true,
                  message: "Please input the employee name"
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Title">
            {getFieldDecorator("title", {
              initialValue: detail.title,
              rules: [
                {
                  required: true,
                  message: "Please input  the  employee title"
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Sex">
            {getFieldDecorator("sex", {
              initialValue: detail.sex,
              rules: [
                {
                  required: true,
                  message: "Please select sex!"
                }
              ]
            })(
              <Select placeholder="Please select sex">
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Start Date">
            {getFieldDecorator("start_date", {
              initialValue: moment(detail.startDate, "YYYY/MM/DD"),
              rules: [
                {
                  type: "object",
                  required: true,
                  message: "Please select time!"
                }
              ]
            })(<DatePicker />)}
          </FormItem>

          <FormItem {...formItemLayout} label="E-mail">
            {getFieldDecorator("email", {
              initialValue: detail.email,
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Office Phone">
            {getFieldDecorator("officePhone", {
              initialValue: detail.officePhone,
              rules: [
                {
                  required: true,
                  message: "Please input your office phone number!"
                }
              ]
            })(<Input addonBefore={"+1"} style={{ width: "100%" }} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Cell Phone">
            {getFieldDecorator("cellPhone", {
              initialValue: detail.cellPhone,
              rules: [
                {
                  required: true,
                  message: "Please input your cell phone number!"
                }
              ]
            })(<Input addonBefore={"+1"} style={{ width: "100%" }} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="SMS">
            {getFieldDecorator("SMS", {
              initialValue: detail.SMS,
              rules: [
                {
                  required: true,
                  message: "Please input your SMS!"
                }
              ]
            })(<Input addonBefore={"+1"} style={{ width: "100%" }} />)}
          </FormItem>

          {/* <FormItem {...formItemLayout} label="Manager">
            {getFieldDecorator("manager", {
              rules: [
                {
                  required: false
                }
              ]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a manager"
                optionFilterProp="children"
                onFocus={this.handleSelectFocus}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.props.employeeList.map(employee => {
                  return (
                    <Select.Option key={employee._id} value={employee._id}>
                      {" "}
                      {employee.name}{" "}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </FormItem> */}

          {/* <FormItem {...formItemLayout} label="Manager">
            {getFieldDecorator("manager", {
              initialValue: "None",
              rules: [
                {
                  required: false,
                  message: "Please select sex!"
                }
              ]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a manager"
                optionFilterProp="children"
                // onChange={handleChange}
                onFocus={this.handleSelectFocus}
                // onBlur={handleBlur}
                // defaultValue={"None"}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.props.managersName.map(manager => {
                  return (
                    <Select.Option value={manager._id} key={manager._id}>
                      {manager.name}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </FormItem> */}

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Edit
            </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

//把employeess reducers的state（object）转成props
const mapStateToProps = state => {
  return {
    employees: state.employees,
    employeeDetail: state.employeeDetail
  };
};

// Any time you want to change the state, you have to dispatch an action.
//把getEmployees -actiondispa过来转成getEmployees props
//   const mapDispatchToProps = dispatch => {
//     return {
//       getEmployees: () => {
//         dispatch(getEmployees());
//       },
//       addEmployee: newEmployee => {
//         dispatch(addEmployee(newEmployee));
//       }
//     };
//   };

const WrappedAddEmployeeModal = Form.create()(EditEmployeeModal);

export default connect(
  mapStateToProps,
  null
)(WrappedAddEmployeeModal);
