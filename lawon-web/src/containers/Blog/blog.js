import React, {Component} from 'react'
import BlogHead from '../BlogHead/BlogHead'
import SignUp from '../SignUp/SignUp'
import Footer from '../../components/molecules/footer';


class Blog extends Component{
    render(){
        return(
            <div>
               <BlogHead/>
              
               <SignUp/>
               <Footer/>
            </div>
            
        )
    }
}
export default Blog