//step7: employee list 显示每一个employee
//step8: add new employee by import modal from antd
//step9: delete employee => 为了delete employee ，我必须得dispatch一个deleteEmployee action
import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import AddEmployeeModal from "./AddEmployeeModal";

import { Link } from "react-router-dom";

//Import deleteEmployee action
import { connect } from "react-redux";
import { deleteEmployee } from "../../actions/employees";
//import action
import { getEmployeeDetail } from "../../actions/employeeDetail";
import { editEmployee } from "../../actions/editEmployee";

import { withRouter } from "react-router-dom";
import EditEmployeeModal from "../EmployeeDetail/EditEmployeeModal";

class ShowEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: "", visible: false, content: "", addVisible:false };
  }
  // state = {
  //   searchText: ""
  // };

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  // handle add employee modal function
  showAddModal = () => {
    this.setState({
      addVisible: true
    });
  };

  handleAddOk = e => {
    console.log(e);
    this.setState({
      addVisible: false
    });
  };

  handleAddCancel = e => {
    console.log(e);
    this.setState({
      addVisible: false
    });
  };

  //handle edit employee modal
  showEditModal = id => {
    this.props.getEmployeeDetail(id);
    console.log(id);
    this.setState({
      visible: true
    });
  };

  handleEditOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleEditCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  // handle delete employee function
  handleDelete = id => {
    this.props.deleteEmployee(id);
  };

  //handele search func
  handleSearchInput = e => {
    this.setState({ content: e.target.value });
  };

  //handle DRreporter detail page
  handleDRClick = record => {
    console.log(record);
    if (record._id) {
      console.log(this.props);
      this.props.history.push(`/employee/reporters/${record._id}`);
    }
  };

  //handle Manager link page
  handleManagerClick = record => {
    console.log(record);
    if (record._id) {
      console.log(this.props);
      this.props.history.push(`/employee/${record.manager}`);
    }
  };

  render() {
    //灵活使用redux，就不需要一直通过props传到子component。但必须得mapStateToProps
    const data = this.props.employeeList;
    data.managerName = this.props.employeeDetail.managerName;
    data.Reporters = this.props.employeeDetail.numOfDRs;
    console.log("props in em list page:", this.props);
    console.log("data in em list page:", data);

    const map = new Map();
    data.forEach(ele => {
      map.set(ele._id, ele.name);
    });
    console.log(map);
    // const { employeeList } = this.props;
    // const data = employeeList;

    // data.filter(ele => {
    //   console.log("filter", typeof ele.name);
    //   return ele.name.toLowerCase().indexOf(this.content.toLowerCase()) !== -1;
    // });

    const columns = [
      // show em pic
      {
        title: "Photo",
        dataIndex: "avatar",
        key: "avatar",
        render: fileName => {
          console.log(fileName);
          return (
            <img
              alt=""
              style={{ with: "40px", height: "40px" }}
              src={`http://localhost:5000/uploads/${fileName}`}
            />
          );
        }
      },

      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        },
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search employee"
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={this.handleSearch(selectedKeys, confirm)}
            />
            <Button
              type="primary"
              onClick={this.handleSearch(selectedKeys, confirm)}
            >
              Search
            </Button>
            <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon
            type="search"
            style={{ color: filtered ? "#108ee9" : "#aaa" }}
          />
        ),
        onFilter: (value, record) =>
          record.name.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            });
          }
        },
        render: text => {
          const { searchText } = this.state;
          return searchText ? (
            <span>
              {text
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, "i"))
                .map(
                  (fragment, i) =>
                    fragment.toLowerCase() === searchText.toLowerCase() ? (
                      <span key={i} className="highlight">
                        {fragment}
                      </span>
                    ) : (
                      fragment
                    ) // eslint-disable-line
                )}
            </span>
          ) : (
            text
          );
        }
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",

        sorter: (a, b) => {
          let titleA = a.title.toUpperCase();
          let titleB = b.title.toUpperCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        }
      },

      {
        title: "Sex",
        dataIndex: "sex",
        key: "sex",

        sorter: (a, b) => {
          let sexA = a.sex.toUpperCase();
          let sexB = b.sex.toUpperCase();
          if (sexA < sexB) {
            return -1;
          }
          if (sexA > sexB) {
            return 1;
          }
          return 0;
        }
      },

      {
        title: "Manager",
        dataIndex: "manager",
        key: "manager",
        // key:data.filter(employee=>employee._id===)

        onCell: record => ({
          onClick: () => {
            console.log(record);
            this.handleManagerClick(record);
          }
        }),

        render: manager => map.get(manager)
        // sorter: (a, b) => {
        //   let managerA = a.manager.toUpperCase();
        //   let managerB = b.manager.toUpperCase();
        //   if (managerA < managerB) {
        //     return -1;
        //   }
        //   if (managerA > managerB) {
        //     return 1;
        //   }
        //   return 0;
        // }
      },

      {
        title: "Reporters",
        dataIndex: "directReporters",
        key: "directReporters",

        onCell: record => ({
          onClick: () => {
            console.log(record);
            this.handleDRClick(record);
          }
        }),

        sorter: (a, b) => a.directReporters.length - b.directReporters.length,
        render: directReporters => directReporters.length
      },

      {
        title: "Profile",
        dataIndex: "profile",
        key: "profile",

        render: (text, record) => {
          return (
            <Link to={{ pathname: `/employee/${record._id}` }}>
              {/* {console.log("em", record)} */}
              {/* {console.log("emID", this.props.employeeDetail)} */}

              <Button type="primary">Profile</Button>
            </Link>
          );
        }

        // render: () => {
        //   return (
        //     <Link to={{ pathname: `/employee/${this.props.employeeList._id}` }}>
        //       {console.log("em", this.props)}
        //       {console.log("emID", this.props.employeeDetail)}

        //       <Button type="primary">Profile</Button>
        //     </Link>
        //   );
        // }
      },

      {
        title: "Edit",
        dataIndex: "edit",
        key: "edit",

        render: (text, record) => {
          return (
            <Button
              type="primary"
              onClick={id => this.showEditModal(record._id)}
            >
              Edit
            </Button>
          );
        }
      },

      //step9: delete employee
      //出bug，因为没有id，
      {
        title: "Delete",
        dataIndex: "delete",
        key: "delete",

        render: (text, record) => {
          return (
            <Button type="danger" onClick={() => this.handleDelete(record._id)}>
              Delete
            </Button>
          );
        }

        // render: (text, record) => {
        //   return this.state.dataSource.length >= 1 ? (
        //     <Popconfirm
        //       title="Sure to delete?"
        //       onConfirm={() => this.handleDelete(record._id)}
        //     >
        //       <a href="javascript:;">Delete</a>
        //     </Popconfirm>
        //   ) : null;
        // }
      }
      // {
      //   title: "Address",
      //   dataIndex: "address",
      //   key: "address",
      //   filters: [
      //     {
      //       text: "London",
      //       value: "London"
      //     },
      //     {
      //       text: "New York",
      //       value: "New York"
      //     }
      //   ],
      //   onFilter: (value, record) => record.address.indexOf(value) === 0
      // }
    ];
    return (
      //display the add employee modal & //display the employees list table
      <div>
        <Button type="primary" onClick={this.showAddModal}>
          Add Employee
        </Button>
        {/* <div>
          <label>Search:</label>
          <input value={this.state.content} onChange={this.handleSearchInput} />
        </div> */}

        <AddEmployeeModal
          visible={this.state.addVisible}
          handleOk={this.handleAddOk}
          handleCancel={this.handleAddCancel}
          employeeList={this.props.employeeList}
          addEmployee={this.props.addEmployee}
        />

        <EditEmployeeModal
          visible={this.state.visible}
          handleOk={this.handleEditOk}
          handleCancel={this.handleEditCancel}
          employeeDetail={this.props.employeeDetail}
          editEmployee={this.props.editEmployee}
          getEmployeeDetail={this.props.getEmployeeDetail}
        />

        <Table columns={columns} dataSource={data} pagination={false} />
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
    deleteEmployee: id => {
      dispatch(deleteEmployee(id));
    },
    getEmployeeDetail: id => {
      dispatch(getEmployeeDetail(id));
    },
    editEmployee: (id, newEmployee) => {
      dispatch(editEmployee(id, newEmployee));
    }
  };
};

//connect 是一个highorder funciton， connect语法中必须放两个callback
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShowEmployees));
