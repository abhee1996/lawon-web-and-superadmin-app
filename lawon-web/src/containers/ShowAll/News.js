import React,{Component} from 'react'
import './ShowAll.css'
import BlogBox from '../BlogBox/BlogBox';
import ViewMore from '../ViewMoreButton/ViewMore.js'

class News extends Component {
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
                                    Title="A Guide to parenting when going through a divorce" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="March 28, 2018"
                                    Image_URL="./images/camera.jpg"/>
                               <BlogBox 
                                    CategoryName="News" 
                                    Title="A Guide to parenting when going through a divorce" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="March 28, 2018"
                                    Image_URL="./images/LawOn-1.jpg"/>
                                <BlogBox 
                                    CategoryName="News" 
                                    Title="A Guide to parenting when going through a divorce" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="March 28, 2018"
                                    Image_URL="./images/Cosmetic-Surgery-resize-1.jpg"/>
                                <BlogBox 
                                    CategoryName="News" 
                                    Title="A Guide to parenting when going through a divorce" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="March 28, 2018"
                                    Image_URL="./images/lawon-newsletter-mockup.jpg"/>    
                            </div>
                        </div>
                    </div>
                    <ViewMore/>
                </section>
            </div>
        )
    }
}
export default News 