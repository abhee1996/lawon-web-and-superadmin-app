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
                <div class="col-md-12 no-padding">
                    <div class="member-bg ">
                    18 Jul, 2019 to 18 Jul, 2019
                    
                       <span class="member-select-span">
                         <select class="member-select">
                          <option value="1">1</option>
                          <option value="5">5</option>
                          <option value="10">10</option>
                          
                         </select>
                         
                      </span>
                      <div class="days">Last Month</div>
                      <div class="days">This Month</div>
                      <div class="days">This Week</div>
                      <div class="days">today</div>
                    </div>
                    <div class="table-responsive">          
  <table class="table" >
    <thead>
      <tr>
        <th width="7%" class="table-th">Firm ID</th>
        <th width="12%"class="table-th">Firm Name</th>
        <th width="13%"class="table-th">Joined Date</th>
        <th width="10%"class="table-th">Current Package</th>
        <th width="15%"class="table-th">Address</th>
        <th width="5%"class="table-th">Total Cases </th>
        <th width="5%"class="table-th">In Progress</th>
        <th width="5%"class="table-th">Payment Received</th>
        <th width="5%"class="table-th">Payement Due</th>
        <th width="5%"class="table-th">Store Status</th>
        <th width="5%"class="table-th">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="dashed-line">
        <td><span class="text-FCA900">LO-012</span></td>
        <td><span><img src="./images/firm-details/member.png" /></span>  Jason Law Firm</td>
        <td>06 dec, 2018 (21:22)</td>
        <td>Standard</td>
        <td>
            <span class="text-FCA900">Patrick Gracia
             <br/>(606) 234 5678</span><br/>
             <span class="text-9E9E9E"> 55-A George Street
              Canberra Aus</span>
        </td>
        <td>100</td>
        <td>40</td>
        <td>$2780.00</td>
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
        <td>Standard</td>
        <td>
            <span class="text-FCA900">Patrick Gracia
             <br/>(606) 234 5678</span><br/>
             <span class="text-9E9E9E"> 55-A George Street
              Canberra Aus</span>
        </td>
        <td>100</td>
        <td>40</td>
        <td>$2780.00</td>
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
        <td>Standard</td>
        <td>
            <span class="text-FCA900">Patrick Gracia
             <br/>(606) 234 5678</span><br/>
             <span class="text-9E9E9E"> 55-A George Street
              Canberra Aus</span>
        </td>
        <td>100</td>
        <td>40</td>
        <td>$2780.00</td>
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
        <td>Standard</td>
        <td>
            <span class="text-FCA900">Patrick Gracia
             <br/>(606) 234 5678</span><br/>
             <span class="text-9E9E9E"> 55-A George Street
              Canberra Aus</span>
        </td>
        <td>100</td>
        <td>40</td>
        <td>$2780.00</td>
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
        <td>Standard</td>
        <td>
            <span class="text-FCA900">Patrick Gracia
             <br/>(606) 234 5678</span><br/>
             <span class="text-9E9E9E"> 55-A George Street
              Canberra Aus</span>
        </td>
        <td>100</td>
        <td>40</td>
        <td>$2780.00</td>
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
        <td>Standard</td>
        <td>
            <span class="text-FCA900">Patrick Gracia
             <br/>(606) 234 5678</span><br/>
             <span class="text-9E9E9E"> 55-A George Street
              Canberra Aus</span>
        </td>
        <td>100</td>
        <td>40</td>
        <td>$2780.00</td>
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
        <td>Standard</td>
        <td>
            <span class="text-FCA900">Patrick Gracia
             <br/>(606) 234 5678</span><br/>
             <span class="text-9E9E9E"> 55-A George Street
              Canberra Aus</span>
        </td>
        <td>100</td>
        <td>40</td>
        <td>$2780.00</td>
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