import { commonFunctions } from '../utils/utils.js'
// LAWYER ENDPOINT
const getAllPlans = '/subscriptions';
const lawyerSignup = '/auth/lawyer/signup';
const getPlanByID = '/subscriptions?id=';
const submitLawyerCardDetails = '/cards';
const submitAdminProfileSetup = '/lawyers/'
const createOrganization = '/organizations'
const verifyOrganizationOTP = '/organizations/'
const submitFirmProfileSetup = '/organizations/'
const inviteLawyerViaEmail = '/lawyers/invitation'
const lawyerAboutMe = '/lawyers/aboutme/'
const lawyerLogin = '/auth/lawyer/login';
const getLawyerProfile = '/lawyers/profile/'
const updateLawyerProfile = '/lawyers/personalSetting/'
const updateLawyerProfileByAdmin = '/lawyers/personalSetting/'
const getOrganizationProfile = '/organizations/profile/'
const updateOrganizationProfile = '/organizations/setting/'
const lawyerSignupByEmail = '/auth/lawyer/signup/';
const updateOrganizationBio = '/organizations/bio/';
const updateOrganizationAwards = '/organizations/rewards/';
const makeLawyerInactive = '/lawyers/deactivateLawyer/';
const deleteLawyer = '/lawyers/deletelawyer/';
const submitLawyerNotificationsPref='/notificationpreferences?LawyerId='
const updateLawyerNotificationsPref='/notificationpreferences/'
const getLawyerNotificationsPref='/notificationpreferences?LawyerId='
const lawyerSubmitAvailablity= '/lawyers/availability/'
const makeLawyerActive = '/lawyers/activateLawyer/';
const createOrganizationBranch = '/organizations/branch'
const deleteOrganizationBranch = '/organizations/'
const submitFirmPracticeAreas = '/organizations/practiceArea/'
const submitLawyerPracticeAreas = '/lawyers/practiceArea'
const getAllFirmActiveEnquiries = '/enquiries/organization/'
const getEnquiryDetails = '/enquiries/detail?id='
const getFirmPracticeAreasForLawyers = '/lawyers/practiceAreaByOrganization/'
const replyToEnquiryByLawyer = '/enquiry/reply/lawyer'
const getAllFirmOpenEnquiries = '/enquiries/organization/'
const getAllFirmArchivedEnquiries = '/enquiries/organization/'
const archiveEnquiry = '/enquiry/logs'
const unreadEnquiry = '/enquiry/logs'
const saveLawyerEnquiryNotes = '/enquiry/notes'


const organizationID = localStorage.getItem("organizationID");
const lawyerAdminID = localStorage.getItem("lawyerAdminID");
const organizationAdminAccessToken = localStorage.getItem("organizationAdminAccessToken")
const lawyerAccessToken = localStorage.getItem("lawyerAccessToken")

export const lawyerAPIs = {  

    // Api call for saveLawyerEnquiryNotes
    saveLawyerEnquiryNotes(paramData) {
        console.log('paramdata is', paramData)       
        const saveLawyerEnquiryNotesEndPoint = window.baseUrl + saveLawyerEnquiryNotes;
        return fetch(saveLawyerEnquiryNotesEndPoint, {
            method: 'POST',
            headers: {  
                "Content-Type": "application/json",              
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData)
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },
    
    // Api call for unreadEnquiry
    unreadEnquiry(paramData) {
        console.log('paramdata is', paramData)       
        const unreadEnquiryEndPoint = window.baseUrl + unreadEnquiry;
        return fetch(unreadEnquiryEndPoint, {
            method: 'POST',
            headers: {  
                "Content-Type": "application/json",              
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData)
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },
    
    // Api call for getAllFirmArchivedEnquiries
    getAllFirmArchivedEnquiries(lawyerID) {           
        const getAllFirmArchivedEnquiriesEndPoint = window.baseUrl + getAllFirmArchivedEnquiries + lawyerID +'?status=1&isArchive=1';
        return fetch(getAllFirmArchivedEnquiriesEndPoint, {
            method: 'GET',
            headers: {               
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for archiveEnquiry
    archiveEnquiry(paramData) {
        console.log('paramdata is', paramData)       
        const archiveEnquiryEndPoint = window.baseUrl + archiveEnquiry;
        return fetch(archiveEnquiryEndPoint, {
            method: 'POST',
            headers: {  
                "Content-Type": "application/json",              
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData)
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },
    // Api call for getAllFirmOpenEnquiries
    getAllFirmOpenEnquiries(lawyerID) {           
        const getAllFirmOpenEnquiriesEndPoint = window.baseUrl + getAllFirmOpenEnquiries + lawyerID +'?status=1&isOpen=1';
        return fetch(getAllFirmOpenEnquiriesEndPoint, {
            method: 'GET',
            headers: {               
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for replyToEnquiryByLawyer
    replyToEnquiryByLawyer(paramData) {
        console.log('paramdata is', paramData)       
        const replyToEnquiryByLawyerEndPoint = window.baseUrl + replyToEnquiryByLawyer;
        return fetch(replyToEnquiryByLawyerEndPoint, {
            method: 'POST',
            headers: {  
                "Content-Type": "application/json",              
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData)
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for getFirmPracticeAreasForLawyers
    getFirmPracticeAreasForLawyers() {           
        const getFirmPracticeAreasForLawyersEndPoint = window.baseUrl + getFirmPracticeAreasForLawyers + localStorage.getItem("organizationID");
        return fetch(getFirmPracticeAreasForLawyersEndPoint, {
            method: 'GET',
            headers: {               
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for getEnquiryDetails
    getEnquiryDetails(enquiryID) {           
        const getEnquiryDetailsEndPoint = window.baseUrl + getEnquiryDetails + enquiryID;
        return fetch(getEnquiryDetailsEndPoint, {
            method: 'GET',
            headers: {               
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for getAllFirmActiveEnquiries
    getAllFirmActiveEnquiries(lawyerID) {           
        const getAllFirmActiveEnquiriesEndPoint = window.baseUrl + getAllFirmActiveEnquiries + lawyerID +'?status=1';
        return fetch(getAllFirmActiveEnquiriesEndPoint, {
            method: 'GET',
            headers: {               
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for submitLawyerPracticeAreas
    submitLawyerPracticeAreas(paramData) {
        console.log('paramdata is', paramData)       
        const submitLawyerPracticeAreasEndPoint = window.baseUrl + submitLawyerPracticeAreas;
        return fetch(submitLawyerPracticeAreasEndPoint, {
            method: 'POST',
            headers: {  
                "Content-Type": "application/json",              
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData)
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for submitFirmPracticeAreas
    submitFirmPracticeAreas(paramData) {
        console.log('paramdata is', paramData)       
        const submitFirmPracticeAreasEndPoint = window.baseUrl + submitFirmPracticeAreas + localStorage.getItem("organizationID");
        return fetch(submitFirmPracticeAreasEndPoint, {
            method: 'POST',
            headers: {  
                "Content-Type": "application/json",              
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData)
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for deleteOrganizationBranch
    deleteOrganizationBranch(paramData) {
        console.log('paramdata is', paramData)
        const deleteOrganizationBranchEndPoint = window.baseUrl + deleteOrganizationBranch + paramData.OrganizationId +'/' + paramData.BranchId;
        return fetch(deleteOrganizationBranchEndPoint, {
            method: 'DELETE',
            headers: {                
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for createOrganizationBranch
    createOrganizationBranch(paramData) {
        console.log('paramdata is', paramData)       
        const createOrganizationBranchEndPoint = window.baseUrl + createOrganizationBranch;
        return fetch(createOrganizationBranchEndPoint, {
            method: 'POST',
            headers: {  
                "Content-Type": "application/json",              
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData)
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for makeLawyerActive
    makeLawyerActive(paramData) {
        console.log('paramdata is', paramData)
        const makeLawyerActiveEndPoint = window.baseUrl + makeLawyerActive + paramData;
        return fetch(makeLawyerActiveEndPoint, {
            method: 'POST',
            headers: {                
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for updateLawyerProfileByAdmin
    updateLawyerProfileByAdmin(paramData,laywerID) {
        console.log('paramdata is', paramData)
        const updateLawyerProfileByAdminEndPoint = window.baseUrl + updateLawyerProfileByAdmin + laywerID;
        return fetch(updateLawyerProfileByAdminEndPoint, {
            method: 'PUT',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: paramData,

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },

    // Api call for lawyerSubmitAvailablity
    lawyerSubmitAvailablity(paramData,lawyerID) {
        // console.log('paramdata is', paramData)
        const lawyerSubmitAvailablityEndPoint = window.baseUrl + lawyerSubmitAvailablity + lawyerID;
        return fetch(lawyerSubmitAvailablityEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData)

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

   // Api call getLawyerNotificationsPref
    getLawyerNotificationsPref(paramData) {
        console.log('paramdata is', paramData)
        const getLawyerNotificationsPrefEndPoint = window.baseUrl + getLawyerNotificationsPref + paramData;
        return fetch(getLawyerNotificationsPrefEndPoint, {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },

   // Api call for updateLawyerNotificationsPref
    updateLawyerNotificationsPref(paramData,notificationId) {
        console.log('paramdata is', paramData)
        paramData.id = notificationId;
        const updateLawyerNotificationsPrefEndPoint = window.baseUrl + updateLawyerNotificationsPref + notificationId;
        return fetch(updateLawyerNotificationsPrefEndPoint, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData)

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

   // Api call for submitLawyerNotificationsPref
    submitLawyerNotificationsPref(paramData) {
        console.log('paramdata is', paramData)
        const submitLawyerNotificationsPrefEndPoint = window.baseUrl + submitLawyerNotificationsPref + paramData.LawyerId;
        return fetch(submitLawyerNotificationsPrefEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData)

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for deleteLawyer
    deleteLawyer(paramData) {
        console.log('paramdata is', paramData)
        const deleteLawyerEndPoint = window.baseUrl + deleteLawyer + paramData;
        return fetch(deleteLawyerEndPoint, {
            method: 'POST',
            headers: {                
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for makeLawyerInactive
    makeLawyerInactive(paramData) {
        console.log('paramdata is', paramData)
        const makeLawyerInactiveEndPoint = window.baseUrl + makeLawyerInactive + paramData;
        return fetch(makeLawyerInactiveEndPoint, {
            method: 'POST',
            headers: {                
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for updateOrganizationAwards
    updateOrganizationAwards(paramData) {
        console.log('paramdata is', paramData)
        const updateOrganizationAwardsEndPoint = window.baseUrl + updateOrganizationAwards + localStorage.getItem("organizationID");
        return fetch(updateOrganizationAwardsEndPoint, {
            method: 'POST',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: paramData,

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },


    // Api call for submitlawyerAboutMe
    updateOrganizationBio(paramData) {
        console.log('paramdata is', paramData)
        const updateOrganizationBioEndPoint = window.baseUrl + updateOrganizationBio + localStorage.getItem("organizationID");
        return fetch(updateOrganizationBioEndPoint, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData)

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },

    // Api call for lawyer Login
    lawyerSignupByEmail(paramData,token,organizationid) {
        console.log('paramdata is', paramData)
        const lawyerSignupByEmailEndPoint = window.baseUrl + lawyerSignupByEmail + organizationid;
        return fetch(lawyerSignupByEmailEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(paramData),

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },

    // Api call for submitlawyerAboutMe
    updateOrganizationProfile(paramData) {
        console.log('paramdata is', paramData)
        const updateOrganizationProfileEndPoint = window.baseUrl + updateOrganizationProfile + localStorage.getItem("organizationID");
        return fetch(updateOrganizationProfileEndPoint, {
            method: 'PUT',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: paramData,

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },

    // Api call getOrganizationProfile
    getOrganizationProfile(paramData) {
        console.log('paramdata is', paramData)
        const getOrganizationProfileEndPoint = window.baseUrl + getOrganizationProfile + paramData;
        return fetch(getOrganizationProfileEndPoint, {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },

    // Api call for updateLawyerProfile
    updateLawyerProfile(paramData) {
        console.log('paramdata is', paramData)
        const updateLawyerProfileEndPoint = window.baseUrl + updateLawyerProfile + localStorage.getItem("lawyerID");
        return fetch(updateLawyerProfileEndPoint, {
            method: 'PUT',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: paramData,

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },

    // Api call getLawyerProfile
    getLawyerProfile(paramData) {
        console.log('paramdata is', paramData)
        const getLawyerProfileEndPoint = window.baseUrl + getLawyerProfile + paramData;
        return fetch(getLawyerProfileEndPoint, {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },


    // Api call for lawyer Login
    lawyerLogin(paramData) {
        console.log('paramdata is', paramData)
        const lawyerLoginEndPoint = window.baseUrl + lawyerLogin;
        return fetch(lawyerLoginEndPoint, {
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


    // Api call for submitlawyerAboutMe
    submitlawyerAboutMe(paramData) {
        console.log('paramdata is', paramData)
        const submitlawyerAboutMeEndPoint = window.baseUrl + lawyerAboutMe + localStorage.getItem("lawyerID");;
        return fetch(submitlawyerAboutMeEndPoint, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("lawyerAccessToken")
            },
            body: JSON.stringify(paramData),

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },

    // Api call for submitAdminProfileSetup
    inviteLawyerViaEmail(paramData) {
        const inviteLawyerViaEmailEndPoint = window.baseUrl + inviteLawyerViaEmail;
        return fetch(inviteLawyerViaEmailEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("organizationAdminAccessToken")
            },
            body: JSON.stringify(paramData),

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },

    // Api call for submitAdminProfileSetup
    submitFirmProfileSetup(paramData) {
        console.log('paramdata is', paramData)
        const submitFirmProfileSetupEndPoint = window.baseUrl + submitFirmProfileSetup + localStorage.getItem("organizationID");;
        return fetch(submitFirmProfileSetupEndPoint, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("organizationAdminAccessToken")
            },
            body: JSON.stringify(paramData),

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },

    // Api call for Mobile verify organization
    verifyOrganizationOTP(paramData, organizationID) {
        const verifyOrganizationOTPEndPoint = window.baseUrl + verifyOrganizationOTP + localStorage.getItem("organizationID") + '/verify/otp';
        return fetch(verifyOrganizationOTPEndPoint, {
            method: 'PUT',
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

    // Api call for createOrganization
    createOrganization(paramData) {
        console.log('paramdata is', paramData)
        const createOrganizationPoint = window.baseUrl + createOrganization;
        return fetch(createOrganizationPoint, {
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

    // Api call for AdminProfileSetup
    submitAdminProfileSetup(paramData) {
        console.log('paramdata is', paramData)
        console.log('lawyerAdminID is', lawyerAdminID)
        const submitAdminProfileSetupEndPoint = window.baseUrl + submitAdminProfileSetup + localStorage.getItem("lawyerAdminID");
        return fetch(submitAdminProfileSetupEndPoint, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("organizationAdminAccessToken")
            },
            body: JSON.stringify(paramData),

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },

    // Api call for Saving Card
    submitLawyerCardDetails(paramData) {
        console.log('paramdata is', paramData)
        const submitLawyerCardDetailsEndPoint = window.baseUrl + submitLawyerCardDetails;
        return fetch(submitLawyerCardDetailsEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("organizationAdminAccessToken")
            },
            body: JSON.stringify(paramData)
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response

            );

    },

    // Api call for Get plan by ID
    getPlanByID(paraData) {
        const getPlanByIDEndPoint = window.baseUrl + getPlanByID + paraData;
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
        console.log('paramdata is', paramData)
        const lawyerSignupEndPoint = window.baseUrl + lawyerSignup;
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
        const getAllPlansEndPoint = window.baseUrl + getAllPlans;
        return fetch(getAllPlansEndPoint, {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );
    },
};