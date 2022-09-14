import { strictEqual } from "assert";
import { stateToHTML } from "draft-js-export-html";

const initialState = {
    isTrue: false,
    isLogin: false,
    AdminInfo: "",
    CouponInfo: "",
    MobileOnBoardingInfo: "",
    CategoryInfo: "",
    SubCategoryInfo:"",
    BlogCategories: "",
    CategoryBlogs:"",
    AllPlanInfo: "",
    HelpArticleInfo: "",
    HelpArticleCategories: "",
    LoadingProgressBar:0,
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'IS_TRUE':

            return {

                ...state,
                isTrue: true,


            }
        case 'IS_LOGIN':
            return {
                ...state,
                isLogin: true
            }
        case 'IS_LOGOUT':
            return {
                ...state,
                isLogin: false,
                isTrue: false,
                AdminInfo: {},
                CouponInfo: {},
                MobileOnBoardingInfo: {},
                CategoryInfo: {},
                BlogCategories: {},
                AllPlanInfo: {},
                HelpArticleInfo: {},
                HelpArticleCategories: {},

            }

        case 'IS_FALSE':

            return {

                ...state,
                isTrue: false,




            }
        case 'ADMIN_INFO':

            return {

                ...state,

                AdminInfo: action.AdminInfo

            }
        case 'ONBOARDING_INFO':
            return {
                ...state,
                MobileOnBoardingInfo: action.MobileOnBoardingInfo
            }
        case 'COUPON_INFO':

            return {

                ...state,

                CouponInfo: action.CouponInfo

            }
        case 'CATEGORY_INFO':

            return {
                ...state,
                CategoryInfo: action.CategoryInfo
            }
        case 'SUBCATEGORY_INFO':

            return {
                ...state,
                SubCategoryInfo: action.SubCategoryInfo
            }
        case 'BLOG_CATEGORIES':

            return {
                ...state,
                BlogCategories: action.BlogCategories
            }
            case 'Category_Blogs':

            return {
                ...state,
                CategoryBlogs: action.CategoryBlogs
            }
        case 'PLANS_INFO':

            return {
                ...state,
                AllPlanInfo: action.AllPlanInfo
            }
        case 'HELP_ARTICLE':

            return {
                ...state,
                HelpArticleInfo: action.HelpArticleInfo
            }
        case 'HELP_ARTICLE_CATEGORIES':

            return {
                ...state,
                HelpArticleCategories: action.HelpArticleCategories
            }
            case 'LOADING_PROGRESS_BAR':

                return {
                    ...state,
                    LoadingProgressBar: action.LoadingProgressBar
                }    
       

    }
    return state;

}


export default reducer