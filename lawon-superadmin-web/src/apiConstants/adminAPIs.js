import { commonFunctions } from '../utils/utils.js'
const baseURL = "https://lawon.herokuapp.com";
//const baseURL = "http://192.168.18.22:3000";

// LAWYER ENDPOINT
const adminGetAllLawyers = "lawyers"
const adminGetAllCoupons = "/coupons"
const adminCreateCoupons = "/coupons"
const adminUpdateCoupon = "/coupons/"
const adminDeleteCoupon = "/coupons/"
const adminAboutUs = "/appcontent"
const adminTermAndConditions = "/appcontent"
const adminPrivacyAndPolicy = "/appcontent"
const adminGetAppContent = "/appcontent"
const adminGetAllPlans = "/subscriptions"
const adminCreatePlan = "/subscriptions"
const adminDeletePlan = "/subscriptions/"
const adminUpdatePlan = "/subscriptions/"
const adminGetAllCategories = "/categories?"
const adminCreateCategories = "/categories?"
const adminDeleteCategory = "/categories/"
const adminUpdateCategory = "/categories/"
const adminGetAllSubCategories = "/subCategories?"
const adminCreateSubCategory = "/subCategories"
const adminUpdateSubCategory = "/subCategories/"
const adminDeleteSubCategory = "/subCategories/"
const adminGetAllBlogs = "/blogs"
const adminCreateBlog = "/blogs"
const adminEditBlog = "/blogs/"
const adminDeleteBlog = "/blogs/"
const adminDeleteBlogWithArticle = "/blog/categories/"
const adminGetAllBlogsCategories = "/blog/categories/Articles "
const adminGetCategoryBlogs = "/blog/categories"
const adminCreateBlogsCategory = "/blog/categories"
const superAdminDashboardLogin = "/auth/user/login"
const adminCreatePassword = "/auth/user/set/password"
const superAdminDashboardForgotPassword = "/users/forgotPassword"
const adminGetAllOnBoardingScreens = "/onboarding?"
const adminCreateOnboardingScreen = "/onboarding"
const adminEditOnBoardingScreen = "/onboarding/"
const adminDeleteOnBoardingScreen = "/onboarding/"
const adminEnterCode = "/auth/user/tokenVerification"
const getAdminProfile = '/users?id=';
const updateAdminProfile = '/users/';
const updateAdminPassword = '/users/updatePasword';
const getAdminHelpArticle = '/faqs';
const createAdminHelpArticle = '/faqs';
const deleteAdminHelpArticle = '/faqs/';
const updateAdminHelpArticle = '/faqs/';
const getAdminHelpArticleCategory = '/faqs/categories'
const createAdminHelpArticleCategory = '/faqs/categories'
const deleteAdminHelpArticleCategory = '/faqs/categories/'
const updateAdminHelpArticleCategory = '/faqs/categories/'


export const userObjParsed = JSON.parse(localStorage.getItem('userData'));
export const adminObjParsed = JSON.parse(localStorage.getItem('AdminInfo'));
export const adminObj = 29


export const adminAPIs = {


    /* ==============================
        Talha Work  Start
    ================================== */

    // Paginate All user API
    paginateUsers(skip,limit){
        const EndPoint = `https://lawon.herokuapp.com/users?skip=${skip}&limit=${limit}`
        return fetch(EndPoint, {
            method: 'GET',
            headers: {"Content-Type": "application/json",}
        }).then(res => res.json()).catch(error => console.error('Error:', error)).then(response => response);
    },

    // Paginate All lawyers API
    paginateLawyers(skip,limit){
        const EndPoint = `https://lawon.herokuapp.com/lawyers?skip=${skip}&limit=${limit}`
        return fetch(EndPoint, {
            method: 'GET',
            headers: {"Content-Type": "application/json",}
        }).then(res => res.json()).catch(error => console.error('Error:', error)).then(response => response);
    },
    // Paginate All Firm API
    paginateFirm(skip,limit){
        const EndPoint = `https://lawon.herokuapp.com/organizations?skip=${skip}&limit=${limit}`
        return fetch(EndPoint, {
            method: 'GET',
            headers: {"Content-Type": "application/json",}
        }).then(res => res.json()).catch(error => console.error('Error:', error)).then(response => response);
    },



    //All Lawyers API

    adminGetAllLawyers() {
        const adminGetAllLawyersEndPoint = "https://lawon.herokuapp.com/lawyers";

        return fetch(adminGetAllLawyersEndPoint, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },

    //Lawyers Profile Page

    adminGetLawyersProfile(paramData){
        
        const adminGetLawyersProfile = `https://lawon.herokuapp.com/lawyers/profile/${paramData}`
        return fetch(adminGetLawyersProfile, {
            method: 'GET',
            headers: {"Content-Type": "application/json",}
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },

    //Admin Login API   

    superAdminDashboardLogin(paramData) {
        console.log('paramdata is', paramData)

        const superAdminDashboardLoginEndPoint = baseURL + superAdminDashboardLogin;
        return fetch(superAdminDashboardLoginEndPoint, {
            method: 'POST',
            headers: {

                "Content-Type": "application/json",
                "Authorization": "bearer <auth token>"
            },
            body: JSON.stringify(paramData),

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },
    //Admin Forgot Password 
    superAdminDashboardForgotPassword(paramData) {
        console.log('paramdata is', paramData)
        const superAdminDashboardForgotPasswordEndPoint = baseURL + superAdminDashboardForgotPassword;
        return fetch(superAdminDashboardForgotPasswordEndPoint, {
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

    // Api for Admin Enter Code
    adminEnterCode(paramData) {
        const adminEnterCodeEndPoint = baseURL + adminEnterCode;
        return fetch(adminEnterCodeEndPoint, {
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

    //Admin Create Password
    adminCreatePassword(paramData) {
        console.log('paramdata is', paramData)
        const adminCreatePasswordEndPoint = baseURL + adminCreatePassword;
        return fetch(adminCreatePasswordEndPoint, {
            method: 'Post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paramData)

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },

    //Get Admin Info API

    getAdminProfile() {

        const getAdminProfileEndPoint = baseURL + getAdminProfile + localStorage.getItem('AdminId');
        return fetch(getAdminProfileEndPoint, {
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

    // Api call for Update admin Profile
    updateAdminProfile(paramData) {

        console.log('paramdata is', paramData)
        const updateAdminProfileEndPoint = baseURL + updateAdminProfile + adminObjParsed.id;
        return fetch(updateAdminProfileEndPoint, {
            method: 'PUT',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem("AdminAccessToken")
            },
            body: paramData

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response

            );
    },
    //Update Admin Password
    updateAdminPassword(paramData) {
        paramData.email = adminObjParsed.email;
        console.log('paramdata is', paramData);
        const updateAdminPasswordEndPoint = baseURL + updateAdminPassword;
        return fetch(updateAdminPasswordEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("AdminAccessToken")
            },
            body: JSON.stringify(paramData),

        })
            .then(res => res.json())
            .then(response => response
            )
            .catch(error => console.error('Error:', error));

    },
    //Post Onboarding Screen API
    adminCreateOnboardingScreen(paramData) {
        console.log('paramdata is', paramData)
        const adminCreateOnboardingScreenEndPoint = baseURL + adminCreateOnboardingScreen;
        return fetch(adminCreateOnboardingScreenEndPoint, {
            method: 'POST',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },
            body: paramData,

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },
    //Get All Onboarding Screens API
    adminGetAllOnBoardingScreens() {
        const adminGetAllOnBoardingScreensEndPoint = baseURL + adminGetAllOnBoardingScreens;
        return fetch(adminGetAllOnBoardingScreensEndPoint, {
            method: 'GET',
            headers: {

                "Authorization": "bearer <auth token>"
            }

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response

            );
    },

    //Admin Edit OnBoarding Screen API
    adminEditOnBoardingScreen(paramData) {
        console.log('paramdata is', paramData)
        const adminEditOnBoardingScreenEndPoint = baseURL + adminEditOnBoardingScreen + localStorage.getItem('OnBoardScreenId');
        return fetch(adminEditOnBoardingScreenEndPoint, {
            method: 'PUT',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },
            body: paramData

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },
    //Admin DELETE OnBoarding Screen API
    adminDeleteOnBoardingScreen() {
        const adminDeleteOnBoardingScreenEndPoint = baseURL + adminDeleteOnBoardingScreen + localStorage.getItem('deleteOnboardingScreen');
        return fetch(adminDeleteOnBoardingScreenEndPoint, {
            method: 'DELETE',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },


        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },
    //Get All Plans API
    adminGetAllPlans() {
        const adminGetAllPlansEndPoint = baseURL + adminGetAllPlans;
        return fetch(adminGetAllPlansEndPoint, {
            method: 'GET',
            headers: {

                "Authorization": "bearer <auth token>"
            }

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response

            );
    },

    //Post blog category  API
    adminCreateBlogsCategory(paramData) {
        console.log('paramdata is', paramData)
        const adminCreateBlogsCategoryEndPoint = baseURL + adminCreateBlogsCategory;
        return fetch(adminCreateBlogsCategoryEndPoint, {
            method: 'POST',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },
            body: paramData,

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },
    //Get ALL Blogs Categories API

    adminGetAllBlogsCategories() {
        const adminGetAllBlogsCategoriesEndPoint = baseURL + adminGetAllBlogsCategories;
        return fetch(adminGetAllBlogsCategoriesEndPoint, {
            method: 'GET',
            headers: {

                "Authorization": "bearer <auth token>"
            }

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response

            );
    },
    //Get All Blogs API
    adminGetAllBlogs() {
        const adminGetAllBlogsEndPoint = baseURL + adminGetAllBlogs;
        return fetch(adminGetAllBlogsEndPoint, {
            method: 'GET',
            headers: {

                "Authorization": "bearer <auth token>"
            }

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response

            );
    },
    //Delete Blogs Categories with no of articles API
    adminDeleteBlogWithArticle() {

        const adminDeleteBlogWithArticleEndPoint = baseURL + adminDeleteBlogWithArticle + localStorage.getItem('deleteBlogCategoriesArticleId');
        console.log("endpoint", adminDeleteBlogWithArticleEndPoint)
        return fetch(adminDeleteBlogWithArticleEndPoint, {
            method: 'DELETE',
            headers: {

                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },


        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },
    //Create Blog API
    adminCreateBlog(paramData) {
        console.log('paramdata is', paramData)
        const adminCreateBlogEndPoint = baseURL + adminCreateBlog;
        return fetch(adminCreateBlogEndPoint, {
            method: 'POST',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },
            body: paramData,

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },
    //Update Blog API
    adminEditBlog(paramData) {
        console.log('paramdata is', paramData)
        const adminEditBlogEndPoint = baseURL + adminEditBlog + localStorage.getItem('editBlogId');
        return fetch(adminEditBlogEndPoint, {
            method: 'PUT',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },
            body: paramData

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },
    //Delete Blog API
    adminDeleteBlog() {
        const adminDeleteBlogEndPoint = baseURL + adminDeleteBlog + localStorage.getItem('deleteBlogId');
        return fetch(adminDeleteBlogEndPoint, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },


        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },
    //Get Category Blogs
    adminGetCategoryBlogs() {
        const adminGetCategoryBlogsEndPoint = baseURL + adminGetCategoryBlogs;
        return fetch(adminGetCategoryBlogsEndPoint, {
            method: 'GET',
            headers: {

                "Authorization": "bearer <auth token>"
            }

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response

            );
    },
    //Get All Coupons API
    adminGetAllCoupons() {
        const adminGetAllCouponsEndPoint = baseURL + adminGetAllCoupons;
        return fetch(adminGetAllCouponsEndPoint, {
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



    //Create Coupons API
    adminCreateCoupons(paramData) {
        console.log('paramdata is', paramData)
        const adminCreateCouponsEndPoint = baseURL + adminCreateCoupons;
        return fetch(adminCreateCouponsEndPoint, {
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
    // UpdateCoupon API
    adminUpdateCoupon(paramData) {
        console.log('paramdata is', paramData)
        const adminUpdateCouponEndPoint = baseURL + adminUpdateCoupon + localStorage.getItem('couponId');
        return fetch(adminUpdateCouponEndPoint, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paramData)

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },

    //Admin Delete Coupon API

    adminDeleteCoupon() {
        const adminDeleteCouponEndPoint = baseURL + adminDeleteCoupon + localStorage.getItem('deleteCouponId');
        return fetch(adminDeleteCouponEndPoint, {
            method: 'DELETE',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },


        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },
    //admin Create plan 

    adminCreatePlan(paramData) {
        console.log('paramdata is', paramData)
        const adminCreatePlanEndPoint = baseURL + adminCreatePlan;
        return fetch(adminCreatePlanEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("AdminAccessToken")
            },
            body: JSON.stringify(paramData),

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },
    //Admin Update Plan API
    adminUpdatePlan(paramData) {
        console.log('paramdata is', paramData)
        const adminUpdatePlanEndPoint = baseURL + adminUpdatePlan + localStorage.getItem('updatePlanId');
        return fetch(adminUpdatePlanEndPoint, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paramData)

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },

    //admin Delete plan
    adminDeletePlan() {

        const adminDeletePlanEndPoint = baseURL + adminDeletePlan + localStorage.getItem("deletePlanId");
        console.log("my end point for delete plan", adminDeletePlanEndPoint)
        return fetch(adminDeletePlanEndPoint, {
            method: 'DELETE',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },


        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },


    //Get All Coupons API
    adminGetAllCategories() {
        const adminGetAllCategoriesEndPoint = baseURL + adminGetAllCategories;
        console.log("adminGetAllCategoriesEndPoint", adminGetAllCategoriesEndPoint)
        return fetch(adminGetAllCategoriesEndPoint, {
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

    //admin get subcategory api 
    adminGetAllSubCategories() {
        const adminGetAllSubCategoriesEndPoint = baseURL + adminGetAllSubCategories;
        return fetch(adminGetAllSubCategoriesEndPoint, {
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
    //delete category api
    adminDeleteCategory() {

        const adminDeleteCategoryEndPoint = baseURL + adminDeleteCategory + localStorage.getItem('deleteCategoryId') + "?";
        return fetch(adminDeleteCategoryEndPoint, {
            method: 'DELETE',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },


        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },

    //Admin Create Category


    adminCreateCategories(paramData) {
        console.log('paramdata is', paramData)
        const adminCreateCategoriesEndPoint = baseURL + adminCreateCategories;
        return fetch(adminCreateCategoriesEndPoint, {
            method: 'POST',
            headers: {


                'Authorization': 'bearer ' + localStorage.getItem("AdminAccessToken")
            },
            body: paramData

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },
    // Update Catgory

    adminUpdateCategory(paramData) {

        console.log('paramdata is', paramData)
        const adminUpdateCategoryEndPoint = baseURL + adminUpdateCategory + localStorage.getItem('updateCategoryId');
        return fetch(adminUpdateCategoryEndPoint, {
            method: 'PUT',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },
            body: paramData

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },
    //Admin Create SubCategory 
    adminCreateSubCategory(paramData) {
        console.log('paramdata is', paramData)
        const adminCreateSubCategoryEndPoint = baseURL + adminCreateSubCategory;
        return fetch(adminCreateSubCategoryEndPoint, {
            method: 'POST',
            headers: {


                'Authorization': 'bearer ' + localStorage.getItem("AdminAccessToken")
            },
            body: paramData

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },
    //Admin UpDate SubCategory 
    adminUpdateSubCategory(paramData) {

        console.log('paramdata is', paramData)
        const adminUpdateSubCategoryEndPoint = baseURL + adminUpdateSubCategory + localStorage.getItem('updateSubCategoryId');
        console.log('adminUpdateSubCategoryEndPoint is', adminUpdateSubCategoryEndPoint)
        return fetch(adminUpdateSubCategoryEndPoint, {
            method: 'PUT',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },
            body: paramData

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },
    //delete Subcategory api
    adminDeleteSubCategory() {

        const adminDeleteSubCategoryEndPoint = baseURL + adminDeleteSubCategory + localStorage.getItem('deleteSubCategoryId') + "?";
        return fetch(adminDeleteSubCategoryEndPoint, {
            method: 'DELETE',
            headers: {
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },


        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },

    //Admin Manage Help Get Articles API
    getAdminHelpArticle() {
        const getAdminHelpArticleEndPoint = baseURL + getAdminHelpArticle;
        return fetch(getAdminHelpArticleEndPoint, {
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

    //Get Admin Help Article Categories
    getAdminHelpArticleCategory() {
        const getAdminHelpArticleCategoryEndPoint = baseURL + getAdminHelpArticleCategory;
        return fetch(getAdminHelpArticleCategoryEndPoint, {
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
    // Post API for Help Article Category
    createAdminHelpArticleCategory(paramData) {
        console.log('paramdata is', paramData)
        const createAdminHelpArticleCategoryEndPoint = baseURL + createAdminHelpArticleCategory;
        return fetch(createAdminHelpArticleCategoryEndPoint, {
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
    // PUT API FOR HELP ARTICLE CATEGORY
    updateAdminHelpArticleCategory(paramData) {
        console.log('paramdata is', paramData)
        const updateAdminHelpArticleCategoryEndPoint = baseURL + updateAdminHelpArticleCategory + localStorage.getItem('updateHelpArticleCategoryId');
        return fetch(updateAdminHelpArticleCategoryEndPoint, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },
            body: JSON.stringify(paramData)

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },
    //Delete API For Help Article Category

    deleteAdminHelpArticleCategory() {
        const deleteAdminHelpArticleCategoryEndPoint = baseURL + deleteAdminHelpArticleCategory + localStorage.getItem('deleteHelpCategoryId');
        console.log("my endpoint for delete help article", deleteAdminHelpArticleCategoryEndPoint)
        return fetch(deleteAdminHelpArticleCategoryEndPoint, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },


        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },
    // Post API for Help Article
    createAdminHelpArticle(paramData) {
        console.log('paramdata is', paramData)
        const createAdminHelpArticleEndPoint = baseURL + createAdminHelpArticle;
        return fetch(createAdminHelpArticleEndPoint, {
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
    // DELETE API FOR HELP ARTICLE
    deleteAdminHelpArticle() {
        const deleteAdminHelpArticleEndPoint = baseURL + deleteAdminHelpArticle + localStorage.getItem("deleteHelpArticleId");

        return fetch(deleteAdminHelpArticleEndPoint, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },


        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },
    //Update API for HelpArticle

    updateAdminHelpArticle(paramData) {
        console.log('paramdata is', paramData)
        const updateAdminHelpArticleEndPoint = baseURL + updateAdminHelpArticle + localStorage.getItem('updateHelpArticleId');
        return fetch(updateAdminHelpArticleEndPoint, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("AdminAccessToken")
            },
            body: JSON.stringify(paramData)

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response);
    },

    //post API ABOUT US 

    adminAboutUs(paramData) {
        console.log('paramdata is', paramData)
        const adminAboutUsEndPoint = baseURL + adminAboutUs;
        return fetch(adminAboutUsEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("AdminAccessToken")
            },
            body: JSON.stringify(paramData),

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },
    //post api for privacy and policy

    adminPrivacyAndPolicy(paramData) {
        console.log('paramdata is', paramData)
        const adminPrivacyAndPolicyEndPoint = baseURL + adminPrivacyAndPolicy;
        return fetch(adminPrivacyAndPolicyEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("AdminAccessToken")
            },
            body: JSON.stringify(paramData),

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },
    //post api for terms and conditions

    adminTermAndConditions(paramData) {
        console.log('paramdata is', paramData)
        const adminTermAndConditionsEndPoint = baseURL + adminTermAndConditions;
        return fetch(adminTermAndConditionsEndPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'bearer ' + localStorage.getItem("AdminAccessToken")
            },
            body: JSON.stringify(paramData),

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => response
            );

    },

    //get App content 
    adminGetAppContent() {
        const adminGetAppContentEndPoint = baseURL + adminGetAppContent;
        return fetch(adminGetAppContentEndPoint, {
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
}

