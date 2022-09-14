import React,{Component} from 'react'
import './ShowAll.css'
import BlogBox from '../BlogBox/BlogBox';
import ViewMore from '../ViewMoreButton/ViewMore.js'

class ShowAll extends Component {
    render(){
        return(
            <div>
                <section class="blogContent">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <BlogBox 
                                    CategoryName="News" 
                                    Title="A Guide to parenting when going through a divorce" 
                                    author_Name="Ismaeel Waseem"
                                    URL="https://lawon.co.uk/guide-parenting-going-divorce/"
                                    Date="March 28, 2018"
                                    Image_URL="./images/parenting.jpg"/>
                        
                                <BlogBox 
                                    CategoryName="News" 
                                    Title="Video Courts Are Revolutionising the UK’s Justice System" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="March 15, 2018"
                                    Image_URL="./images/camera.jpg"/>
                                <BlogBox 
                                    CategoryName="News" 
                                    Title="How Solicitors Can Benefit From Using Our App" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="March 8, 2018"
                                    Image_URL="./images/LawOn-1.jpg"/>
                                <BlogBox 
                                    CategoryName="Family" 
                                    Title="How Cryptocurrency Is Complicating Divorce Proceedings" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="March 5, 2018"
                                    Image_URL="./images/Cryptocurrency-resize-1.jpg"/>
                                <BlogBox 
                                    CategoryName="News" 
                                    Title="Why It’s Time For A Change In Cosmetic Surgery Laws" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="March 5, 2018"
                                    Image_URL="./images/Cosmetic-Surgery-resize-1.jpg"/>
                                <BlogBox 
                                    CategoryName="News" 
                                    Title="Everything You Need To Know About Our LawOn App" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="February 21, 2018"
                                    Image_URL="./images/lawon-newsletter-mockup.jpg"/>
                                <BlogBox 
                                    CategoryName="Family" 
                                    Title="Four Reasons to Consider a Prenuptial Agreement" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="February 2, 2018"
                                    Image_URL="./images/paul-garcia-217101-1.jpg"/>
                                <BlogBox 
                                    CategoryName="Wills, Probate & Inheritance" 
                                    Title="Why making a Will is a Must for Cohabiting Couples" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date=" January 17, 2018"
                                    Image_URL="./images/photo-1496430551739-1.jpg"/>
                                <BlogBox 
                                    CategoryName="Property" 
                                    Title="Resolving a Deposit Dispute as a Tenant" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date=" December 20, 2017"
                                    Image_URL="./images/Sunnyside_Street_Belfast-Cropped-1.jpg"/>
                                <BlogBox 
                                    CategoryName="Property" 
                                    Title="What does the Autumn Budget Mean for First Time Buyers?" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="  December 19, 2017"
                                    Image_URL="./images/Yellow-Door-1.jpeg"/>    
                            </div>
                        </div>
                    </div>
                    <ViewMore/>
                </section>
            </div>
        )
    }
}
export default ShowAll 