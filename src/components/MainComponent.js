import React, { Component } from "react";
import Home from "./HomeComponent";
import StaffList from "./StaffListComponent";
import Department from "./DepartmentComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffDetail from "./StaffDetailComponent";
import DepartmentDetailComponent from "./DepartmentDetailComponent";
import Salary from "./SalaryComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postStaff,
  patchStaff,
  deleteStaff,
  fetchDepartments,
  fetchSalaries,
  fetchStaffs,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  console.log(state);
  return {
    staffs: state.staffs,
    departments: state.departments,
    salaries: state.salaries
  };
};

const mapDispatchToProps = (dispatch) => ({
  postStaff: ({ newStaff }) => dispatch(postStaff({ newStaff })),
  patchStaff: ({ updatedStaff }) => dispatch(patchStaff({ updatedStaff })),
  deleteStaff: ({ deletedStaff }) => dispatch(deleteStaff({ deletedStaff })),
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchSalaries: () => {
    dispatch(fetchSalaries());
  },
  resetAddStaffForm: () => {
    dispatch(actions.reset("addStaff"));
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalaries();
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
          departments={this.props.departments.departments}
          patchStaff={this.props.patchStaff}
          staffId={match.params.staffId}
          deleteStaff={this.props.deleteStaff}
        />
      );
    };
    const DepartmentWithId = ({ match }) => {
      console.log(match.params.departmentId);
      const staff_de = this.props.staffs.staffs.filter(
        (staff) => staff.departmentId === match.params.departmentId
      )
      console.log(staff_de)
      return (
        <DepartmentDetailComponent
          staffs={
            this.props.staffs.staffs.filter(
              (staff) => staff.departmentId === match.params.departmentId
            )
          }
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
          department={this.props.departments.departments.filter((department) => department.id === match.params.departmentId)}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/homepage" component={Home} />
          <Route
            exact
            path="/employee"
            component={() => (
              <StaffList
                staffs={this.props.staffs.staffs}
                postStaff={this.props.postStaff}
                departments={this.props.departments.departments}
                staffsLoading={this.props.staffs.isLoading}
                staffFailed={this.props.staffs.errMess}
                resetAddStaffForm={this.props.resetAddStaffForm}
              />
            )}
          />
          <Route path="/employee/:staffId" component={StaffWithId} />

          <Route
            exact
            path="/department"
            component={() => (
              <Department
                departments={this.props.departments.departments}
                isLoading={this.props.departments.isLoading}
                isFailed={this.props.departments.errMess}
              />
            )}
          />
          <Route path="/department/:departmentId" component={DepartmentWithId} />
          <Route
            path="/salary"
            component={() => (
              <Salary
                staffs={this.props.staffs.staffs}
                salaries={this.props.salaries.salaries}
                isLoading={this.props.salaries.isLoading}
                isFailed={this.props.salaries.errMess}
              />
            )}
          />
          <Redirect to="/homepage" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
