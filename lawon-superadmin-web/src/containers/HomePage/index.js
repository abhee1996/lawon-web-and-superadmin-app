import React, { Component } from 'react';
import Footer from '../../components/molecules/footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from 'jquery'
import '../../assets/js/slick'
import { Link } from 'react-router-dom';
import Navbar from '../../components/molecules/navbar'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import ReadMoreReact from 'read-more-react';
class HomePage extends Component {

  state = {}
  constructor() {
    super();
    this.state = {
      openID: 1,
      activeBox: 'activebox',
    }
    this.openTab = this.openTab.bind(this);
  }
  componentDidMount() {
    $(".slider-for").slick({
      asNavFor: '.threeSlider',
      dots: true,
      appendArrows: $(".slider-nav-dots"),
      appendDots: $(".slider-nav-dots"),
      speed: 1000,
      infinite: true,
      cssEase: 'ease-out',
      nextArrow: '<span class="arrow rightArrow"><img src="https://lawon.co.uk/wp-content/themes/lawon/img/rightArrow.png"/></span>',
      prevArrow: '<span class="arrow leftArrow"><img src="https://lawon.co.uk/wp-content/themes/lawon/img/leftArrow.png"/></span>',
      responsive: [
        {
          breakpoint: 550,
          settings: {
            infinite: false,
            speed: 300
          }
        }
      ]
    });
    $(".slider-x").slick({
      asNavFor: '.threeSlider',
      dots: false,
      arrows: false,
      speed: 1000,
      cssEase: 'ease-out',
      infinite: true,
      responsive: [
        {
          breakpoint: 550,
          settings: {
            infinite: false,
            speed: 300
          }
        }
      ]
    });
    $(".slider-nav").slick({
      asNavFor: '.threeSlider',
      infinite: true,
      dots: false,
      arrows: false,
      speed: 1000,
      cssEase: 'ease-out',
      responsive: [
        {
          breakpoint: 550,
          settings: "unslick"
        }
      ]
    });

  }
  activeBox

  openTab(id) {
    this.setState({
      openID: id,
      activeBox: false
    });
  }

  //   openCity(event, cityName) {
  //     console.log('ranaa')
  //    var i, tabcontent, tablinks;
  //    tabcontent = document.getElementsByClassName("tabcontent");
  //    for (i = 0; i < tabcontent.length; i++) {
  //      tabcontent[i].style.display = "none";
  //    }
  //    tablinks = document.getElementsByClassName("tablinks");
  //    for (i = 0; i < tablinks.length; i++) {
  //      tablinks[i].className = tablinks[i].className.replace(" active", "");

  //    }
  //    document.getElementById(cityName).style.display = "block";
  //    document.getElementById(cityName).style.height = "auto";
  //    event.currentTarget.className += " active";
  //  }
  render() {
    return (

      <div className='home'>

        <Navbar />


        <section className='forlawyer-banner-section smartWay smartWay2'>
          <div className='container container-forlawyer'>
            <div className='row'>
              <img className='headerYellow' src={require('../../assets/img/headerYellow.png')} />
              <img className='headerYellow2' src={require('../../assets/img/headerYellow2.png')} />
              <img className='headerMacbook2' src={require('../../assets/img/headerMacbook2.png')} />
              <img className='headerMobile' src={require('../../assets/img/headerMobile.png')} />
              <div className='col-sm-7'>
                <div className="smartBox">
                  <p className="smartHead" >The smart way to lawyer up</p>
                  <h1 className="">Take control with on-demand legal advice</h1>
                  <p className="" >LawOn app launching 2019</p>
                  <Link to='/main/usersocialreg'>
                    <a className="universalBtn">SIGN UP</a>
                  </Link>

                </div>
              </div>
            </div>
          </div>
          {/* <ReactPlaceholder showLoadingAnimation={true} type='media' ready={false} rows={4}>

                </ReactPlaceholder> */}
        </section>


        <section className='secureClients legalAdvised'>
          <div className='container pos-relative'>
            <div className='row'>
              <div className='col-sm-7'>
                <img className='' src={require('../../assets/img/secure2.jpg')} />
              </div>
              <div className='col-sm-5'>
                <div className="secureClientsBox">
                  <h2 className="" >Online legal advice simplified</h2>
                  <p className="" >LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers, consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                  <a className="universalBtn" href="javascript:void(0);">I'm interested</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="quickThreeSteps">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="quickThreeStepsBox">
                  <h2 class="">Quick 3 step process</h2>
                  <p class="">Simply tell us about your legal query and receive free advice from pre-approved specialist lawyers by video, telephone or chat. Read reviews, compare and choose your lawyer. Free to use mobile app and website.</p>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="threeSliderSection">
                  <div class="firstSlider">
                    <div class="threeSlider slider-x">
                      <div>
                        <h3>1. Ask Your Question</h3>
                        <p>Post your question to the relevant law category</p>
                      </div>
                      <div>
                        <h3>2. Compare and Consult</h3>
                        <p>Receive and compare answers, consult with lawyers for free</p>
                      </div>
                      <div>
                        <h3>3. Choose Your Lawyer</h3>
                        <p>Instruct the lawyer you want to represent your case</p>
                      </div>
                    </div>
                    <div class="slider-nav-dots"></div>
                  </div>
                  <div class="secondSlider">
                    <div class="threeSlider slider-nav">
                      <div> <img className='' src={require('../../assets/img/Ask-LAwyer-iOS-early-version.png')} /> </div>
                      <div> <img className='' src={require('../../assets/img/Clear-@2x.png')} /> </div>
                      <div><img className='' src={require('../../assets/img/Instruct-@2x.png')} /></div>
                    </div>
                  </div>
                  <div class="thirdSlider">
                    <div class="threeSlider slider-for">
                      <div> <img className='' src={require('../../assets/img/thirdSliderItem.jpg')} /> </div>
                      <div> <img className='' src={require('../../assets/img/Young-man-in-the-office.png')} /> </div>
                      <div><img className='' src={require('../../assets/img/Signing-a-form.png')} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>






        <section class="quickAndEasy">
          <div class="container">
            <div class="row">
              <div className='col-sm-5'>
                <div class="tab-content">
                  <div className='fourSlider'>
                    {this.state.openID === 1 &&
                      <div role="tabpanel" class="tab-pane tabcontent active" id="all">
                        <img className='' src={require('../../assets/img/mob-s-1.png')} />
                      </div>
                    }
                    {this.state.openID === 2 &&
                      <div role="tabpanel" class="tab-pane tabcontent active" id="online">
                        <img className='' src={require('../../assets/img/mob-s-2.png')} />
                      </div>
                    }

                    {this.state.openID === 3 &&

                      <div role="tabpanel" class="tab-pane tabcontent active" id="offline">
                        <img className='' src={require('../../assets/img/mob-s-3.png')} />
                      </div>
                    }


                  </div>
                </div>
              </div>
              <div class="col-sm-7">
                <h2 class="wow fadeInUp" data-wow-delay="1s">Quick and easy online legal advice</h2>

                <ul id="tabs" class="nav nav-tabs tabs-right" role="tablist">
                  <li role="presentation" class={this.state.activeBox}>
                    <a onMouseOver={() => {
                      this.openTab(1)
                    }} className='tablinks' href="JavaScript:Void(0);" role="tab" data-toggle="tab" aria-expanded="true">
                      <h3 class="wow fadeInUp" data-wow-delay="1s"><img src="https://lawon.co.uk/wp-content/themes/lawon/img/tabIcon3.png" />Clear</h3>
                      <p class="wow fadeInUp" data-wow-delay="1s">Compare answers, reviews and fees ensuring you choose the best lawyer for you.</p>
                    </a>
                  </li>
                  <li role="presentation" class="">
                    <a
                      onMouseOver={() => {
                        this.openTab(2)
                      }} className='tablinks' href="JavaScript:Void(0);" role="tab" data-toggle="tab" aria-expanded="false">
                      <h3 class="wow fadeInUp" data-wow-delay="1s"><img src="https://lawon.co.uk/wp-content/themes/lawon/img/tabIcon2.png" />Efficient</h3>
                      <p class="wow fadeInUp" data-wow-delay="1s">No more waiting for call backs, sending emails back and forth or waiting around. Your time is valuable.</p>
                    </a>
                  </li>
                  <li role="presentation" class="">
                    <a onMouseOver={() => {
                      this.openTab(3)
                    }} className='tablinks' href="JavaScript:Void(0);" role="tab" data-toggle="tab" aria-expanded="false">
                      <h3 class="wow fadeInUp" data-wow-delay="1s"><img src="https://lawon.co.uk/wp-content/themes/lawon/img/tabIcon1.png" />Convenient</h3>
                      <p class="wow fadeInUp" data-wow-delay="1s">Make an appointment with a lawyer in seconds. Speak to a lawyer in as little as one hour - including evenings and weekends.</p>
                    </a>
                  </li>
                </ul>
                <a class="universalBtn wow fadeInUp" href="javascript:void(0);" data-wow-delay="1s" data-toggle="modal" data-target="#signUp">Sign Up</a>
              </div>
            </div>
          </div>
        </section>

        <section class="mostFrequentQuestion">
          <div class="container pos-relative">
            <div class="row">
              <div class="col-sm-12">
                <h2 class="">Most frequent questions you have asked</h2>
              </div>
            </div>
            <div class="row faqLine">      <div class="col-sm-6">
              <div class="faqBox">
                <h3 class="">Is this a free service?</h3>
                <p className='more'>
                  <ReadMoreReact
                    text={'Yes. Whether you are looking a quick answer to your legal query, or want a free 15 minute face-to-face consultation with a lawyer... via the LawOn app, LawOn is free to use. You will receive free answers to your question from more than one lawyer. You can even have a free consultation with more than one lawyer. If you require a more detailed answer or if you wish to instruct a lawyer to deal with your matter, you can request a quote and instruct your lawyer easily via the LawOn app.'}
                    min={80}
                    ideal={100}
                    max={200}
                    readMoreText={'Read More >'} />
                </p>
              </div>
            </div>

              <div class="col-sm-6">
                <div class="faqBox">
                  <h3 class="">How secure is my information?</h3>
                  <p className='more'>
                    <ReadMoreReact
                      text={'We take protection of your personal information very seriously and we use the latest technology and rigorous security measures to safeguard your information. We guarantee the secure, SSL-encrypted transmission of your data. LawOn ensure that all our lawyers are registered with the Solicitors Regulation Authority and therefore bound by a strict duty of client confidentiality. '}
                      min={80}
                      ideal={100}
                      max={200}
                      readMoreText={'Read More >'} />
                  </p>

                </div>
              </div>

            </div><div class="row faqLine">
              <div class="col-sm-6">
                <div class="faqBox">
                  <h3 class="">Who are LawOn?</h3>
                  <p className='more'>
                    <ReadMoreReact
                      text={'LawOn Ltd is a UK based company registered in England and Wales, whose registered office is in Manchester. Our company was founded by a qualified solicitor with the main aim of improving the way people access legal services.'}
                      min={80}
                      ideal={100}
                      max={200}
                      readMoreText={'Read More >'} />
                  </p>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="faqBox">
                  <h3 class="">Who will be providing me with legal advice?</h3>
                  <p className='more'>
                    <ReadMoreReact
                      text={'Your legal answers and consultations will be provided by and overseen by lawyers qualified in England and Wales in their particular field. All lawyers are verified by us to ensure they have the qualifications and experience needed to deal with your query. '}
                      min={80}
                      ideal={100}
                      max={200}
                      readMoreText={'Read More >'} />
                  </p>
                </div>
              </div>

            </div><div class="row faqLine">      <div class="col-sm-6">
              <div class="faqBox">
                <h3 class="">How quick will I get an answer to my question?</h3>
                <p className='more'>
                  <ReadMoreReact
                    text={'We aim to have all questions answered within 2-3 hours. You may receive an answer within minutes if a lawyer with the specialism you are looking for happens to be online when you post the question. But some questions may require additional research or your lawyer may require additional information.'}
                    min={80}
                    ideal={100}
                    max={200}
                    readMoreText={'Read More >'} />
                </p>
              </div>
            </div>

              <div class="col-sm-6">
                <div class="faqBox">
                  <h3 class="">How soon can I book a consultation with a lawyer?</h3>
                  <p className='more'>
                    <ReadMoreReact
                      text={'You can book a consultation in minutes and have your face-to-face consultation via our app in as little as 1 hour. When booking your consultation, LawOn will provide you with the availability of your preferred lawyer so you can select your preferred time for the consultation. '}
                      min={80}
                      ideal={100}
                      max={200}
                      readMoreText={'Read More >'} />
                  </p>
                </div>
              </div>

            </div>
            <div class="row">
              <div class="col-sm-12">
                <h5 class="">Did you not find the answer for your question? <a href="javascript:void(0);" data-toggle="modal" data-target="#contactForm">Contact Us</a></h5>
              </div>
            </div>
          </div>
        </section>

        <section class="forLaunch">
          <div class="container pos-relative">
            <div class="row">
              <div class="col-sm-6"></div>
              <div class="col-sm-6">
                <div class="forLaunchBox">
                  <h4 class="wow fadeInUp" data-wow-delay="1s">Sign up for launch</h4>
                  <h5 class="wow fadeInUp" data-wow-delay="1s">Notify me when the LawOn app is ready to download</h5>
                  <ul class="forLaunchList">

                    <li>
                      <p class="wow fadeInUp" data-wow-delay="1s">Coming Soon</p>

                      <img className='' src={require('../../assets/img/launch2.png')} />

                    </li>
                    <li>
                      <p class="wow fadeInUp" data-wow-delay="1s">Coming Soon</p>

                      <img className='' src={require('../../assets/img/launch3.png')} />

                    </li>
                  </ul>
                  <a class="universalBtn wow fadeInUp" href="javascript:void(0);" data-wow-delay="1s" data-toggle="modal" data-target="#signUp">Sign Up</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />




      </div>
    );
  }
}

export default HomePage;