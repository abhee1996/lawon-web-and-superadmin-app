import React, { Component } from 'react'
import { Link } from "react-router-dom";
class MembersDetail extends Component {
  state = {
    open: false,
  }
  constructor() {
    super();
    this.state = {
      displayMenu: false,
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

  };
  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }
  render() {
    return (
      <div class="members-detail-section">
        <div class="col-md-12">
          <div class="member-bg ">
            Lawyers Detail
            <span class="member-select-span">
              <select class="member-select">
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>

              </select>
            </span>
          </div>
          <div class="table-responsive">
            <table class="table" >
              <thead>
                <tr>
                  <th class="table-th border-l">ID</th>
                  <th class="table-th">Member Name</th>

                  <th class="table-th">Catergory</th>

                  <th class="table-th">Status</th>
                  <th class="table-th">Joined Date</th>
                  <th class="table-th border-r">Action</th>
                </tr>
              </thead>
              <tbody>

                <tr class="dashed-line">
                  <td><span class="text-FCA900">LO-012</span></td>
                  <td>James Bond </td>
                  <td>Property Lawyer</td>

                  <td><spna class="active">Active</spna></td>
                  <td>06 dec, 2018</td>
                  <td>
                  <Link to="/main/dashboardmaster/firmslawyersdetails">
                        <div className="viewdetails"><i class="fa fa-eye" aria-hidden="true"></i></div>
                    </Link>
                  </td>
                </tr>

                <tr class="dashed-line">
                  <td><span class="text-FCA900">LO-012</span></td>
                  <td>James Bond </td>
                  <td>Property Lawyer</td>

                  <td><spna class="disable">Inactive</spna></td>
                  <td>06 dec, 2018</td>
                  <td>
                  <Link to="/main/dashboardmaster/firmslawyersdetails">
                        <div className="viewdetails"><i class="fa fa-eye" aria-hidden="true"></i></div>
                    </Link>
                  </td>
                </tr>

                <tr class="dashed-line">
                  <td><span class="text-FCA900">LO-012</span></td>
                  <td>James Bond </td>
                  <td>Property Lawyer</td>

                  <td><spna class="active">Active</spna></td>
                  <td>06 dec, 2018</td>
                  <td>
                  <Link to="/main/dashboardmaster/firmslawyersdetails">
                        <div className="viewdetails"><i class="fa fa-eye" aria-hidden="true"></i></div>
                    </Link>
                  </td>
                </tr>

                <tr class="dashed-line">
                  <td><span class="text-FCA900">LO-012</span></td>
                  <td>James Bond </td>
                  <td>Property Lawyer</td>

                  <td><spna class="active">Active</spna></td>
                  <td>06 dec, 2018</td>

                  <td>
                    <Link to="/main/dashboardmaster/firmslawyersdetails">
                        <div className="viewdetails"><i class="fa fa-eye" aria-hidden="true"></i></div>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


        </div>
      </div>
    )
  }
}
export default MembersDetail;