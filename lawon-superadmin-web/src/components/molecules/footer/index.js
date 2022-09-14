import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ props }) => {
    return(
        <footer>
<div class="footerTop">
        <div class="container">
          <div class="row">
            <div class="col-sm-5">
              <h5>Company</h5>
              <ul class="companyLinks">
                <li>
                <Link to ='/main/aboutus'>
               About us
               </Link>
                </li>
                <li>
                <Link to ='/forlawyer'>
                For Lawyers
               </Link>
                </li>
              
                <li>
                <Link to ='/main/blog'>
               Blog
               </Link>
                </li>
              </ul>
            </div>
            <div class="col-sm-5">
              <h5>Get in touch</h5>
              <ul class="touchLinks">
                <li><p>General: </p><a href="mailto:support@lawon.co.uk"> support@lawon.co.uk</a></li>
                <li><p>Press: </p><a href="mailto:press@lawon.co.uk"> press@lawon.co.uk</a></li>
              </ul>
            </div>
            <div class="col-sm-2">
              <h5>Follow us</h5>
              <ul class="socialLinks">
                <li><a href="https://twitter.com/lawon_app" target="_blank"><i class="fa fa-twitter"></i></a></li>
                <li><a href="https://www.facebook.com/LawOnApp/" target="_blank"><i class="fa fa-facebook-official"></i></a></li>
                <li><a href="https://www.linkedin.com/company/lawon/"><i class="fa fa-linkedin-square"></i></a></li>
              </ul>
            </div>
          </div>
          <div class="row footerBottom">
            <p>© LawOn 2019</p>
            <p>LawOn Limited, 1st Floor, 184 Cheetham Hill Road, Manchester, M8 8LQ</p>
            <Link to ='/main/privacypolicy'>
            <div>Privacy Policy</div>
            </Link>
            <Link to ='/main/termsandconditions'>
            <div>Terms & Conditions</div>
            </Link>
           
          </div>
        </div>
      </div>
      </footer>
    );
}
export default Footer;