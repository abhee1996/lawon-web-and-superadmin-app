import React, {Component} from 'react'
import './BlogBox.css'
import { Link } from 'react-router-dom';
class BlogBox extends Component {
    render(){
        return(
               <Link to='/main/blogdetails'>
                <div class="blogBox">
                        <div class="blogHolder">
                          <div class="blogImgHolder">
                            <a href="https://lawon.co.uk/guide-parenting-going-divorce/"><img class="img-responsive" src={this.props.Image_URL} alt="How to Protect Your Privacy as More Apps Harvest Your Data 8"/></a>
                          </div>
                          <div class="blogDetail">

                            <span class="categoriesLink">
                              <a href="#" rel="tag">{this.props.CategoryName} </a>
                            </span>
                            <h3 class="entryTitle">
                              <a data-id="763" class="" href={this.props.URL}>{this.props.Title}</a>
                            </h3>
                            <div class="postUser">
                              <span class="author">{this.props.author_Name}</span>
                              <span class="date">{this.props.Date}</span>
                            </div>

                          </div>
                        </div>
                      </div>
                      </Link>
          
          
        )
    }
}

export default BlogBox