// import React, { Component } from 'react';
// import SearchBar from '../Searchbar'
// import DateRangePicker from 'react-bootstrap-daterangepicker';
// import { Link } from "react-router-dom";

// class  SearchDateApply extends Component {
//     state = {  }
//     handleSearch = (searchValue)=>{
//         console.log("ee", searchValue);
//     }
//     // handleEvent = (event,picker)=>{
//     //     console.log("Start Date",picker.startDate);
//     //     console.log("End Date", picker.endDate);

        
//     // }
    
//     onApply = (event, picker)=>{
//         let startDate = picker.startDate._d;
//         let endData = picker.endDate._d;
       
//         console.log("End",picker.startDate._d);
//     }
//     render() {
       
//         return (
//             <div>
                
//                     <div class=" col-md-4 no-padding">
//                         <SearchBar getSearchValue = {this.handleSearch}/>
//                     </div>
//                     <div className="col-md-4">
//                         <DateRangePicker  onApply={this.onApply}>
//                             <input
//                                 style={{ width: "110%" }}
//                                 class="form-control"
//                                 type="text"
//                                 placeholder="01/01/2019 - 01/15/2019"
                             

//                             />
//                         </DateRangePicker>
//                         <button class="create-new-plan-btn" style={{ width: "100px", height: "33px" }} onClick={() => this.InviteUser()}> Apply
//                     </button>
//                     </div>
    
    
//                     {/* <div>
//                         <Link to="/main/dashboardmaster/admincreateplan">
//                             <button class="create-new-plan-btn" style={{ width: "70px", fontSize: "20px", height: "33px" }}>
//                                 <i class="fa fa-download" aria-hidden="true"></i>
//                             </button>
//                         </Link>
//                     </div>  */}
              
//             </div>
//         )
//     }
// }
 
// export default SearchDateApply;
