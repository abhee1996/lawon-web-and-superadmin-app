import React, { useState } from 'react'
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactPlaceholder from "react-placeholder";


const FirmTableBody = ({data}) => {
    return (
        <tbody>
            {data.map(({ id, name, isActive, postcode}) => (
                <tr style={{ borderBottom: "dashed 2px #cccccc", paddingBottom: "10px" }}>
                    <td><input type="checkbox" /></td>
                    <td>{id ? id : "N/A"}</td>
                    <td>{name ? name : "N/A"}</td>
                    <td>{isActive ? isActive : "N/A"}</td>
                    <td>{postcode ? postcode : "N/A"}</td>
                    <td><Link to={`/main/dashboardmaster/firmdetails/${id}`}>
                        <div className="viewdetails"><i class="fa fa-eye" aria-hidden="true"></i></div></Link>
                    </td>
                </tr>
            ))}
        </tbody>
    )};

const UserTableBody = ({data}) => {
    return (
        <tbody>
            {data.map(({ id, firstName, lastName, email, phoneNumber, createAt }) => (
                <tr style={{ borderBottom: "dashed 2px #cccccc", paddingBottom: "10px" }}>
                    <td><input type="checkbox" /></td>
                    <td>{firstName ? firstName : "N/A"}</td>
                    <td>{lastName ? lastName : "N/A"}</td>
                    <td>{email ? email : "N/A"}</td>
                    <td>{phoneNumber ? phoneNumber : "N/A"}</td>
                    <td>{moment(createAt).isValid() ? moment(createAt).format("Do MMM  YYYY") : ""}</td>
                    <td>action</td>
                </tr>
                ))}
        </tbody>
    )};

const LawyersTableBody = ({data}) => {
    return (
        <tbody>
            {data.map(({ id, firstName, lastName, email, Organization, phoneNumber }) => (
                <tr style={{ borderBottom: "dashed 2px #cccccc", paddingBottom: "10px" }}>
                    <td><input type="checkbox" /></td>
                    <td>{firstName ? firstName : "N/A"}</td>
                    <td>{lastName ? lastName : "N/A"}</td>
                    <td>{email ? email : "N/A"}</td>
                    <td>{Organization ? Organization.name : "N/A"}</td>
                    <td>{phoneNumber ? phoneNumber : "N/A"}</td>
                    <td><Link to={`/main/dashboardmaster/lawyersprofile/${id}`}>
                        <div className="viewdetails"><i class="fa fa-eye" aria-hidden="true"></i></div></Link>
                    </td>
                </tr>
            ))}
        </tbody>
)};
// const ManagePlanTableBody = ({data,dropMenu,displayMenu,dropdownId,viewPlan,deletPlan}) => {
//     const FontEllipsos = { 
//         fontSize: "26px",color: "#5a5a5a",
//         position: "relative",top: "-2px",
//         cursor: "pointer"
//     }
//     const dropdownBar = {
//         position: "absolute",
//         boxShadow: "0 0 20px #ccc",
//         right: "0",
//         background: "#fff",
//         zIndex: "9999",
//         marginTop:"-10px",
//         marginRight:"25px",
//         padding: "20px",
//     };
//     const dropItem = {paddingBottom:"10px",cursor: "pointer",}
//     return (
//         <tbody>
//             {data.map(({ id, sort, name, monthlyFee, trialPeriod, createAt, updatedAt }) => (
//                 <tr style={{ borderBottom: "dashed 2px #cccccc", paddingBottom: "10px" }}>
//                     <td><input type="checkbox" /></td>
//                     <td>{sort ? sort : "N/A"}</td>
//                     <td>{name ? name : "N/A"}</td>
//                     <td>{monthlyFee ? monthlyFee : "N/A"}</td>
//                     <td>{trialPeriod ? trialPeriod : "N/A"}</td>
//                     <td>{createAt ? createAt : "N/A"}</td>
//                     <td>{updatedAt ? updatedAt : "N/A"}</td>
//                     <td>
//                         <div style={FontEllipsos} onClick={()=>dropMenu(id)}>
//                             <i className='fa fa-ellipsis-h'></i>
//                         </div>
//                         {displayMenu && dropdownId == id ?(
//                          <div style={dropdownBar}>
//                             <div style={dropItem} onClick={() => viewPlan(id)}>View</div>
//                             <div style={dropItem}>Edit</div>
//                             <div style={dropItem} onClick={() => deletPlan(id)}>Delete</div>
//                         </div>   
//                         ):""}
//                     </td>
//                 </tr>
//             ))}
//         </tbody>
// )};

// const GeneralTableBody = ({data}) => {
//     console.log("GeneralTableBody",data);
//     return (
//         <tbody>
//                 <p>GeneralTableBody</p>

//             {/* {data.map(({ id, fullName, email, subject,message,createdAt,updatedAt}) => (
//                 <tr style={{ borderBottom: "dashed 2px #cccccc", paddingBottom: "10px" }}>
//                     <td><input type="checkbox" /></td>
//                     <td>{id ? id : "N/A"}</td>
//                     <td>{name ? name : "N/A"}</td>
//                     <td>{isActive ? isActive : "N/A"}</td>
//                     <td>{postcode ? postcode : "N/A"}</td>
//                     <td><Link to={`/main/dashboardmaster/firmdetails/${id}`}>
//                         <div className="viewdetails"><i class="fa fa-eye" aria-hidden="true"></i></div></Link>
//                     </td>
//                 </tr>
//             ))} */}
//         </tbody>
//     )};
// const BespokeTableBody = ({data}) => {
//     console.log("BespokeTableBody",data);

//         return (
//             <tbody>
//                 <p>BespokeTableBody</p>
//             {/* {data.map(({ id, fullName, email, subject,message,createdAt,updatedAt}) => (
//                 <tr style={{ borderBottom: "dashed 2px #cccccc", paddingBottom: "10px" }}>
//                     <td><input type="checkbox" /></td>
//                     <td>{id ? id : "N/A"}</td>
//                     <td>{name ? name : "N/A"}</td>
//                     <td>{isActive ? isActive : "N/A"}</td>
//                     <td>{postcode ? postcode : "N/A"}</td>
//                     <td><Link to={`/main/dashboardmaster/firmdetails/${id}`}>
//                         <div className="viewdetails"><i class="fa fa-eye" aria-hidden="true"></i></div></Link>
//                     </td>
//                 </tr>
//             ))} */}
//         </tbody>
//         )};

export default function Table({ allPlanInfo, tableTitle, title,load,dropMenu,displayMenu,dropdownId,viewPlan,deletPlan,generalAllInfo,bespokeAllInfo }) {
//     const TableTitleBar = styled.div`
//     background-color: #F9FAFB;
//     font-size: 15px;
//     padding: 15px;
//     margin-top: 30px;
//     span { float:right;}
//     select {
//         background: rgb(233, 233, 233);
//         border-style: none;
//         font-size:16px;

//     }
// `;


const TableBar = {
    backgroundColor: "#F9FAFB",
    fontSize: "15px",
    padding: "15px",
    marginTop: "30px",
}
const selectCS = {
    background:"rgb(233, 233, 233)",
    borderStyle:" none",
    fontSize:"16px",
}
console.log("Fuck Table",allPlanInfo)
    return (
        <div class="row">
            
            <div class="col-md-12">
                <div style={TableBar}>
                {title}
                <span style={{float:"right"}}>
                        <select style={selectCS}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </span>
                </div>
                {/* <TableTitleBar>
                    {title}
                    {selectDelete ? (<i class="fa fa-trash trash"> </i>) : null}
                    <span>
                        <select>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </span>
                </TableTitleBar> */}
                <table class="table table-responsive" style={{ background: "#fff", fontSize: "12px", paddingBottom: "15px" }}>
                     <ReactPlaceholder
                        type="text"
                        showLoadingAnimation={true}
                        rows={13}
                        color="#EBEFF1"
                        background="#fff"
                        ready={load}
                        style={{ padding: 30 }}
                    >
                     <thead>
                        <tr>
                            {tableTitle.map((tableTitle) => (
                                <th style={{ fontSize: "11px", borderBottom: "1px solid #E3EBF8", }}> {tableTitle} </th>
                            ))}
                        </tr>
                    </thead>
                    
                    {title =="All Users" ?  <UserTableBody data={allPlanInfo}/>: "" } 
                    {title =="All Lawyers" ? <LawyersTableBody data={allPlanInfo}/> : "" }
                    {title =="All Firms" ? <FirmTableBody data={allPlanInfo}/> : "" }
                    
                        {/* {title =="All Firms" ? <FirmTableBody data={allPlanInfo}/> : "" } */}
{/*                         
                        {title =="All Users" ?  <UserTableBody data={allPlanInfo}/>: "" } 
                        {title =="Manage Plan" ? <ManagePlanTableBody data={allPlanInfo} 
                        dropMenu={dropMenu} 
                        displayMenu={displayMenu} 
                        dropdownId={dropdownId}
                        viewPlan={viewPlan}
                        deletPlan={deletPlan}
                        /> : "" }
                        {title =="general" ? <GeneralTableBody data={generalAllInfo}/> : "" } */}

                </ReactPlaceholder>
                </table>
            </div>
        </div>

    );
    
}
