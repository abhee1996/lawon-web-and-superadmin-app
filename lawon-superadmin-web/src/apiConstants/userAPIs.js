import {commonFunctions} from '../utils/utils.js'
const baseURL = "https://lawon.herokuapp.com";
//const baseURL = "http://192.168.18.22:3000";

// USER ENDPOINTS
const userSignup = '/auth/user/signup';
const userLogin = '/auth/user/login';
const userForgotPassword = '/users/forgotPassword';
const userUpdateProfile = '/users/';
const getUserProfile = '/users?id=';
const userUpdatePassword = '/users/updatePasword';
const getCountryList = '/countries';
const mobileVerification = '/auth/user/tokenVerification';
const getCategories = '/categories';
const getSubCategories = '/subCategories?id=' 
const submitUserQuestion = '/enquiries'
// const filterLawyers = '/lawyers/filter?latlong='+localStorage.getItem("_consultlatlong")+'&radius='+localStorage.getItem("_consultradius")+'&categoryId='+localStorage.getItem("_consultCategoryID")+'&date='+localStorage.getItem("_consultdate")+'&time='+localStorage.getItem("_consulttime")+""
// const filterLawyers = '/lawyers/filter?latlong=54.896736,-1.414478&radius='+localStorage.getItem("_consultradius")+'&categoryId='+localStorage.getItem("_consultCategoryID")+'&date='+localStorage.getItem("_consultdate")+'&time='+localStorage.getItem("_consulttime")+""
const getTimeIntervals='/lawyers/free/intervals';
const submitUserConsultation = '/consultations';
const getAllUserConsultations = '/consultations?userid='
const getConsultationByID = '/consultations?id='



// USER DATA OBJECTS
export const userObjParsed = JSON.parse(localStorage.getItem('userData'));


export const userAPIs = { 

    // Api call for Mobile verify
    mobileVerification(paramData) {    
        const mobileVerificationEndPoint = baseURL+mobileVerification;
        return fetch(mobileVerificationEndPoint, {
            method: 'POST',  
            headers: {
                 "Content-Type": "application/json",                  
              },
            body: JSON.stringify(paramData),
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response
         
          );
    },
    
    // Api call for user Signup
    userSignup(paramData) {
        console.log('paramdata is',paramData)
        const userSignupEndPoint = baseURL+userSignup;
        return fetch(userSignupEndPoint, {
            method: 'POST',  
            headers: {
                 "Content-Type": "application/json",                  
              },
            body: JSON.stringify(paramData),
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response       
          );
      
    },

    // Api call for User Login
    userLogin(paramData) {
        console.log('paramdata is',paramData)
        const userLoginEndPoint = baseURL+userLogin;
       return fetch(userLoginEndPoint, {
            method: 'POST',  
            headers: {
                 "Content-Type": "application/json",                  
              },
            body: JSON.stringify(paramData),
            
          })
          .then(res => res.json())
          .then(response => response        
          )
          .catch(error => console.error('Error:', error));
         
      
    },

    // Api call for User Forgot Password
    userForgotPassword(paramData) {      
        console.log('paramdata is',paramData)
        const userForgotPasswordEndPoint = baseURL+userForgotPassword+userObjParsed.id;
        return fetch(userForgotPasswordEndPoint, {
            method: 'POST',  
            headers: {
                 "Content-Type": "application/json",                  
              },
            body: JSON.stringify(paramData),
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response
         
          );
    },

    // Api call for Update User Profile
    updateUserProfile(paramData) {      
        console.log('paramdata is',paramData)
        const userUpdateProfileEndPoint = baseURL+userUpdateProfile+userObjParsed.id;
        return fetch(userUpdateProfileEndPoint, {
            method: 'PUT',  
            headers: {               
                 'Authorization':'bearer '+ localStorage.getItem("userAccessToken")       
              },
            body: paramData
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response
         
          );
    },

    // Api call for Get User Profile
    getUserProfile() { 
        const userObjParsed = JSON.parse(localStorage.getItem('userData'));     
        const getUserProfileEndPoint = baseURL+getUserProfile+userObjParsed.id;
        return fetch(getUserProfileEndPoint, {
            method: 'GET',  
            headers: {
                 "Content-Type": "application/json",                  
              }          
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response
         
          );
    },

    // Api call for Update user password
    updateUserPassword(paramData) {
        paramData.email = userObjParsed.email;
        console.log('paramdata is',paramData);
        const updateUserPasswordEndPoint = baseURL+userUpdatePassword;
        return fetch(updateUserPasswordEndPoint, {
                method: 'POST',  
                headers: {
                     "Content-Type": "application/json", 
                     'Authorization':'bearer '+ localStorage.getItem("userAccessToken")                        
                  },
                body: JSON.stringify(paramData),
                
              })
              .then(res => res.json())
              .then(response => response        
              )
              .catch(error => console.error('Error:', error));             
          
    },

    // Api call for Get Country List
    getCountryList() {      
        const getCountryListEndPoint = baseURL+getCountryList;
        return fetch(getCountryListEndPoint, {
            method: 'GET',  
            headers: {
                 "Content-Type": "application/json",                  
              }          
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response
         
          );
    },
    
    // // Api call for Mobile Verification
    // mobileVerification(paramData) {
    //     console.log('paramdata is',paramData)
    //     const userSignupEndPoint = baseURL+userSignup;
    //     return fetch(userSignupEndPoint, {
    //         method: 'POST',  
    //         headers: {
    //              "Content-Type": "application/json",                  
    //           },
    //         body: JSON.stringify(paramData),
            
    //       })
    //       .then(res => res.json())
    //       .catch(error => console.error('Error:', error))
    //       .then(response => response       
    //       );
      
    // },

    // Api call for Get Categories
    getCategories() {      
        const getCategoriesEndPoint = baseURL+getCategories;
        return fetch(getCategoriesEndPoint, {
            method: 'GET',  
            headers: {
                 "Content-Type": "application/json",                  
              }          
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response
         
          );
    },

    // Api call for Get Sub Categories
    getSubCategories(paramData) {      
        const getSubCategoriesEndPoint = baseURL+getSubCategories+paramData;
        return fetch(getSubCategoriesEndPoint, {
            method: 'GET',  
            headers: {
                 "Content-Type": "application/json",                  
              }          
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response
         
          );
    },

    // Api call for Submit User Question
    submitUserQuestion(paramData) {
        console.log('paramdata is',paramData);
        const submitUserQuestionEndPoint = baseURL+submitUserQuestion;
        return fetch(submitUserQuestionEndPoint, {
                method: 'POST',  
                headers: {                     
                     'Authorization':'bearer '+ localStorage.getItem("userAccessToken")                        
                  },
                body:paramData
                
              })
              .then(res => res.json())
              .then(response => response        
              )
              .catch(error => console.error('Error:', error));             
          
    },

    // Api call for Filter Lawyer
    filterLawyer() {
        const filterLawyersEndPoint = baseURL+'/lawyers/filter?latlong=54.896736,-1.414478&radius='+localStorage.getItem("_consultradius")+'&categoryId='+localStorage.getItem("_consultCategoryID")+'&date='+localStorage.getItem("_consultdate")+'&time='+localStorage.getItem("_consulttime")+""
        console.log('API END POINT', filterLawyersEndPoint)
        
        return fetch(filterLawyersEndPoint, {
            method: 'GET',  
            headers: {                     
                'Authorization':'bearer '+ localStorage.getItem("userAccessToken")                        
             },            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response       
          );
      
    },

    // Api call for Filter Lawyer
    getLawyerTimeIntervals() {
        const getLawyerTimeIntervalsEndPoint = baseURL+getTimeIntervals        
        return fetch(getLawyerTimeIntervalsEndPoint, {
            method: 'GET',  
            headers: {                
                                       
             },            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response       
          );
      
    },

    // Api call for Submit User Consultation
    submitUserConsultation(paramData) {
        console.log('paramdata is',paramData);
        const submitUserConsultationEndPoint = baseURL+submitUserConsultation;
        return fetch(submitUserConsultationEndPoint, {
                method: 'POST',  
                headers: {                     
                     'Authorization':'bearer '+ localStorage.getItem("userAccessToken")                        
                  },
                body:paramData
                
              })
              .then(res => res.json())
              .then(response => response        
              )
              .catch(error => console.error('Error:', error));             
          
    },

    // Api call for Get User Consultation
    getAllUserConsultations() {             
        const getAllUserConsultationsEndPoint = baseURL+getAllUserConsultations+userObjParsed.id;
        return fetch(getAllUserConsultationsEndPoint, {
            method: 'GET',  
            headers: {                     
                'Authorization':'bearer '+ localStorage.getItem("userAccessToken")                        
             },         
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response
         
          );
    },

    // Api call for Get User Consultation By ID
    getUserConsultationByID(paramData) {             
        const getUserConsultationByIDEndPoint = baseURL+getConsultationByID+paramData;
        return fetch(getUserConsultationByIDEndPoint, {
            method: 'GET',  
            headers: {                     
                'Authorization':'bearer '+ localStorage.getItem("userAccessToken")                        
             },         
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response
         
          );
    },

    // Api call for Update Filter Lawyer
    updateFilterLawyer(paramData) {
        const filterLawyersEndPoint = baseURL+'/lawyers/filter?latlong=54.896736,-1.414478&radius='+paramData.filterRadius+'&categoryId='+localStorage.getItem("_consultCategoryID")+'&date='+paramData.filterDate+'&time='+paramData.filterTime+""
        console.log('API END POINT', filterLawyersEndPoint)
        
        return fetch(filterLawyersEndPoint, {
            method: 'GET',  
            headers: {                     
                'Authorization':'bearer '+ localStorage.getItem("userAccessToken")                        
             },            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response       
          );
      
    },

};
      
