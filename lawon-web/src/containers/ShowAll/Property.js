import React,{Component} from 'react'
import './ShowAll.css'
import BlogBox from '../BlogBox/BlogBox';
import ViewMore from '../ViewMoreButton/ViewMore.js'

class Property extends Component {
    render(){
        return(
            <div>
                <section class="blogContent">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <BlogBox 
                                    CategoryName="Property" 
                                    Title="A Guide to parenting when going through a divorce" 
                                    author_Name="Ismaeel Waseem"
                                    URL="https://lawon.co.uk/guide-parenting-going-divorce/"
                                    Date="March 28, 2018"
                                    Image_URL="./images/Sunnyside_Street_Belfast-Cropped-1.jpg"/>
                        
                                <BlogBox 
                                    CategoryName="Property" 
                                    Title="A Guide to parenting when going through a divorce" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="March 28, 2018"
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
export default Property 