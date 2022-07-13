import React from "react";
import dateFormat from "dateformat";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from 'react-router-dom';


function RenderSearchedStaff({ staff }) {
    if (staff != null)
      return (
        <Card key={staff.id} className="mt-2">
          <div className="row">
            <div className="col-9 bg-dark text-warning rounded-3">
              <CardBody>
                <CardTitle>
                  <h4>Họ và tên: {staff.name}</h4>
                </CardTitle>
                <CardText>
                  Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
                </CardText>
                <CardText>
                  Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
                </CardText>
                <CardText>Phòng ban: {staff.department.name}</CardText>
                <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
              </CardBody>
            </div>
            <div className="col-3">
              <CardImg className="" src={staff.image} alt={staff.name} />
            </div>
          </div>
        </Card>
      );
    else return <div></div>;
  }
  const SearchStaff = (props) => {
    if (props.staff != null) {
      return (
        <div className="container">
          <div className="row">
              <hr className="mt-3"/>
              <Breadcrumb>      
                  <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>      
                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
              </Breadcrumb>
              <RenderSearchedStaff staff={props.staff} />
          </div>
        </div>
      );
    }
  };

export default SearchStaff;
  