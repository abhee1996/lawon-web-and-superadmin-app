import React, {Component} from 'react'
import Footer from '../../components/molecules/footer';
import './AboutUs.css'
import SignUp from '../SignUp/SignUp'

class AboutUs extends Component{
    componentDidMount() {
        window.scrollTo(0, 0)
      }
    render(){
        return(
            <div class="About-Us">
                <section class="qualityLegal">
                    <div class="container">
                        <div class="row">
                        <div class="col-sm-12">
                        <h1>Quality Legal Advice at Your Fingertips</h1>
                        </div>
                        <img src="./images/quality-1.jpg"/>
                        </div>
                    </div>
                </section>
                <section class="weAreLawOn">
                     <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <h2>We are LawOn</h2>
          </div>
          <div class="col-sm-8">
              <p>LawOn was founded with a single purpose: to make legal services accessible and affordable for everyone.</p>
              <p>We do this by having a network of qualified, experienced solicitors poised ready to answer your legal questions, whenever and wherever you are. LawOn revolutionises the way we interact with law firms. No more waiting around for a call back; through the app you can arrange a phone or video call conversation at a convenient time for you.</p>
          </div>
        </div>
      </div>
                </section>
                <section class="ourStory">
                      <div class="container">
                        <div class="row">
                            <div class="col-sm-4">
                                <h2>Our Story</h2>
                                <img src="./images/ourStory.jpg"/>
                            </div>
                            <div class="col-sm-8">
                                <div class="ourStoryText">
                                <p>As a solicitor himself, Ismaeel Waseem created LawOn out of a wish to improve access to legal services for everyone, and make the whole process of choosing and instructing a lawyer quicker and easier. Ismaeel saw other industries benefitting from new technology and began to find a way for the legal sector to harness this; and LawOn was born.</p>
                                <p></p>
                                </div>
                                <div class="signature">
                                <h5>Ismaeel Waseem</h5>
                                <p>CEO/Founder</p>
                                </div>
                            </div>
                            </div>
                        </div>
                </section>
                <section class="expertAdvice">
                    <div class="container">
                        <div class="row">
                        <div class="col-sm-7 expert-ad">
                            <h2>Expert Advice Whenever and Wherever You Need It</h2>
                            <p>LawOn is an innovative new service which gives users fast, bespoke, expert advice whenever and wherever they need it. LawOn is free to use, and users only incur a cost when they choose and instruct their lawyer. The app promotes the value of sound legal advice provided by qualified lawyers, whilst at the same time making it easier and cheaper for users to communicate with and choose their preferred lawyer.</p>
                        </div>
                        <div class="col-sm-5">
                            <img src="./images/expertAdvice.jpg"/>
                        </div>
                        </div>
                    </div>
                </section>
                <section class="legalQueries">
                        <div class="container">
                            <div class="row">
                            <div class="col-sm-6">
                                <img src="./images/legalQueries-1.png"/>
                            </div>
                            <div class="col-sm-6">
                                <h2>Legal Queries Answered by Experienced Lawyers</h2>
                                <p>All of the lawyers you will communicate with through LawOn are regulated by the SRA, giving you piece of mind that the solicitor you are dealing with is trustworthy and reliable. We have specialist lawyers covering four areas of expertise: property law, family law, wills and probate, and personal injury, so you can be sure the person answering your query is an expert in their field.</p>
                            </div>
                            </div>
                        </div>
                    </section>
                <section class="areasLawOn">
                            <div class="container">
                                <div class="row">
                                <div class="col-sm-12">
                                    <h2>Areas LawOn can help with:</h2>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-sm-3">
                                    <div class="areasLawOnBox">
                                    <img src="./images/areasLawOn1.png"/>
                                    <h3>Property</h3>
                                    <p>Landlord and tenant disputes Buying and selling property Negotiating leases</p>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="areasLawOnBox">
                                    <img src="./images/areasLawOn2.png"/>
                                    <h3>Family</h3>
                                    <p>Divorce Separation Prenuptial agreements Child custody</p>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="areasLawOnBox">
                                    <img src="./images/areasLawOn3.png"/>
                                    <h3>Family</h3>
                                    <p>Wills Disputes Dealing with an estate Powers of attorney</p>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="areasLawOnBox">
                                    <img src="./images/areasLawOn4.png"/>
                                    <h3>Personal Injury</h3>
                                    <p>Road accidents Clinical negligence</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                     </section>
                     <SignUp/>
            <Footer/>
          </div>
        )
    }
}

export default AboutUs