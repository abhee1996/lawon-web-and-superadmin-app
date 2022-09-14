import React, { Component } from 'react'

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
        <div class="col-md-12 no-padding">
          <div class="table-responsive">
            <table class="table" >
              <thead>
                <tr>
                  <th class="table-th border-l">Firm ID</th>
                  <th class="table-th">Firm Name</th>
                  <th class="table-th">Current Package</th>
                  <th class="table-th">Organization Status</th>
                  <th class="table-th border-r">View Details</th>
                </tr>
              </thead>
              <tbody>
                <tr class="dashed-line">
                  <td><span class="text-FCA900">LO-012</span></td>
                  <td>Jason Law Firm</td>
                  <td>Standard</td>
                  <td><spna class="active">Active</spna></td>
                  <td> <div style={{ background: '#feb41d', width: '23px', height: '22px', paddingTop: '2px', paddingLeft: '5px' }}>
                    <i class="fa fa-eye" aria-hidden="true"></i></div></td>
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