import React,{Component} from 'react'
import './ShowAll.css'
import BlogBox from '../BlogBox/BlogBox';
import ViewMore from '../ViewMoreButton/ViewMore.js'

class Injury extends Component {
    render(){
        return(
            <div>
                <section class="blogContent">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                               
                               
                            </div>
                        </div>
                    </div>
                    <ViewMore/>
                </section>
            </div>
        )
    }
}
export default Injury