import React , { Component } from 'react'

class MembersDetail extends Component{
  state = { 
    open: false,
 }
 constructor(){
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
    render(){
        return(
            <div class="members-detail-section">
                <div class="col-md-12 ">
                    <div class="member-bg ">
                       Members Detail 
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
        <th width="7%" class="table-th">ID</th>
        <th width="12%"class="table-th">Member Name</th>
        <th width="13%"class="table-th">Joined Date</th>
        <th width="10%"class="table-th">Role</th>
        <th width="15%"class="table-th">Address</th>
        <th width="5%"class="table-th">Total Cases </th>
        <th width="5%"class="table-th">In Progress</th>
        <th width="5%"class="table-th">Won</th>
        <th width="5%"class="table-th">Total Amount</th>
        <th width="5%"class="table-th">Status</th>
        <th width="5%"class="table-th">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="dashed-line">
        <td><span class="text-FCA900">LO-012</span></td>
        <td><span><img src="./images/firm-details/member.png" /></span>  Jason Law Firm</td>
        <td>06 dec, 2018 (21:22)</td>
        <td>Property Lawyer</td>
        <td>
            <span class="text-FCA900">Patrick Gracia
             <br/>(606) 234 5678</span><br/>
             <span class="text-9E9E9E"> 55-A George Street
              Canberra Aus</span>
        </td>
        <td>100</td>
        <td>40</td>
        <td>24</td>
        <td>$500.00</td>
        <td>Active</td>
        <td>
        <div className='col-md-2 user-con-angle-down' onClick={this.showDropdownMenu}>
             <i className='fa fa-ellipsis-h'></i>
             </div>
                { this.state.displayMenu ? (
                <div className='dropdwon-question-status'>
                  <div>Edit</div>            
                  <div>Delete</div>
                </div>
                   ):
                (
                  null
                 )
                }
             
        </td>
      </tr >
      <tr class="dashed-line">
        <td><span class="text-FCA900">LO-012</span></td>
        <td><span><img src="./images/firm-details/member.png" /></span>  Jason Law Firm</td>
        <td>06 dec, 2018 (21:22)</td>
        <td>Property Lawyer</td>
        <td>
            <span class="text-FCA900">Patrick Gracia
             <br/>(606) 234 5678</span><br/>
             <span class="text-9E9E9E"> 55-A George Street
              Canberra Aus</span>
        </td>
        <td>100</td>
        <td>40</td>
        <td>24</td>
        <td>$500.00</td>
        <td>Active</td>
        <td>
        <div className='col-md-2 user-con-angle-down' onClick={this.showDropdownMenu}>
             <i className='fa fa-ellipsis-h'></i>
             </div>
                { this.state.displayMenu ? (
                <div className='dropdwon-question-status'>
                  <div>Edit</div>            
                  <div>Delete</div>
                </div>
                   ):
                (
                  null
                 )
                }
             
        </td>
      </tr >
      <tr class="dashed-line">
        <td><span class="text-FCA900">LO-012</span></td>
        <td><span><img src="./images/firm-details/member.png" /></span>  Jason Law Firm</td>
        <td>06 dec, 2018 (21:22)</td>
        <td>Property Lawyer</td>
        <td>
            <span class="text-FCA900">Patrick Gracia
             <br/>(606) 234 5678</span><br/>
             <span class="text-9E9E9E"> 55-A George Street
              Canberra Aus</span>
        </td>
        <td>100</td>
        <td>40</td>
        <td>24</td>
        <td>$500.00</td>
        <td>Active</td>
        <td>
        <div className='col-md-2 user-con-angle-down' onClick={this.showDropdownMenu}>
             <i className='fa fa-ellipsis-h'></i>
             </div>
                { this.state.displayMenu ? (
                <div className='dropdwon-question-status'>
                  <div>Edit</div>            
                  <div>Delete</div>
                </div>
                   ):
                (
                  null
                 )
                }
             
        </td>
      </tr >
      <tr class="dashed-line">
        <td><span class="text-FCA900">LO-012</span></td>
        <td><span><img src="./images/firm-details/member.png" /></span>  Jason Law Firm</td>
        <td>06 dec, 2018 (21:22)</td>
        <td>Property Lawyer</td>
        <td>
            <span class="text-FCA900">Patrick Gracia
             <br/>(606) 234 5678</span><br/>
             <span class="text-9E9E9E"> 55-A George Street
              Canberra Aus</span>
        </td>
        <td>100</td>
        <td>40</td>
        <td>24</td>
        <td>$500.00</td>
        <td>Active</td>
        <td>
        <div className='col-md-2 user-con-angle-down' onClick={this.showDropdownMenu}>
             <i className='fa fa-ellipsis-h'></i>
             </div>
                { this.state.displayMenu ? (
                <div className='dropdwon-question-status'>
                  <div>Edit</div>            
                  <div>Delete</div>
                </div>
                   ):
                (
                  null
                 )
                }
             
        </td>
      </tr >
       
    </tbody>
  </table>
  </div>

                    
                </div>
            </div>
        )
    }
}
export default MembersDetail ;