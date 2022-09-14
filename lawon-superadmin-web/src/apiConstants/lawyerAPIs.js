import {commonFunctions} from '../utils/utils.js'
const baseURL = "https://lawon.herokuapp.com";
//const baseURL = "http://192.168.18.22:3000";

// LAWYER ENDPOINT
const getAllPlans = '/subscriptions';
const lawyerSignup = '/auth/user/signup';
const getPlanByID = '/subscriptions?id=';
const submitLawyerCardDetails = '/cards';
const submitAdminProfileSetup = '/lawyers'



export const lawyerAPIs = { 

    // Api call for lawyer Signup
    submitAdminProfileSetup(paramData) {
        console.log('paramdata is',paramData)
        const submitAdminProfileSetupEndPoint = baseURL+submitAdminProfileSetup;
        return fetch(submitAdminProfileSetupEndPoint, {
            method: 'POST',  
            headers: {
                'Authorization':'bearer '+ localStorage.getItem("lawyerAccessToken")                
              },
            body: JSON.stringify(paramData),
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response       
          );
      
    },

    // Api call for lawyer Signup
    submitLawyerCardDetails(paramData) {
        console.log('paramdata is',paramData)
        const submitLawyerCardDetailsEndPoint = baseURL+submitLawyerCardDetails;
        return fetch(submitLawyerCardDetailsEndPoint, {
            method: 'POST',  
            headers: {
                'Authorization':'bearer '+ localStorage.getItem("lawyerAccessToken")                
              },
            body: JSON.stringify(paramData),
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response       
          );
      
    },

   // Api call for Get plan by ID
    getPlanByID(paraData) {             
        const getPlanByIDEndPoint = baseURL+getPlanByID+paraData;
        return fetch(getPlanByIDEndPoint, {
            method: 'GET',          
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response         
          );
    },

     // Api call for lawyer Signup
    lawyerSignup(paramData) {
        console.log('paramdata is',paramData)
        const lawyerSignupEndPoint = baseURL+lawyerSignup;
        return fetch(lawyerSignupEndPoint, {
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

    // Api call for Get all plans
    getAllPlans() {             
        const getAllPlansEndPoint = baseURL+getAllPlans;
        return fetch(getAllPlansEndPoint, {
            method: 'GET',          
            
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => response         
          );
    },
};