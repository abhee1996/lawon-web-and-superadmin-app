import React, { Component } from "react";
import Footer from "../../components/molecules/footer";
import { Link } from "react-router-dom";
class ForLawyer extends Component {
  state = {};
  constructor() {
    super();
    this.state = {
      openID: 1,
      activeBox: "tablinks activebox",
    };
    this.openTab = this.openTab.bind(this);
  }

  openTab(id) {
    this.setState({ openID: id, activeBox: "tablinks" });
  }
  render() {
    return (
      <div>
        <section class="smartWay homepage-bg ">
          <div class="container pos-relative">
            <div class="row">
              <img
                className="headerYellow"
                src={require("../../assets/img/headerYellow.png")}
              />
              <img
                className="headerYellow2"
                src={require("../../assets/img/headerYellow2.png")}
              />
              <img
                className="headerMacbook"
                src={require("../../assets/img/headerMacbook.png")}
              />
              <div class="col-sm-8">
                <div class="smartBox">
                  <p class="smartHead">The smart way to acquire new business</p>
                  <h1 class="">
                    Generate leads efficiently &amp; conveniently
                  </h1>
                  <p class="">LawOn launching 2019</p>
                  <Link to="/main/register">
                    <button class="universalBtn mt-30">I'M INTERESTED</button>
                  </Link>
                </div>
              </div>
            </div>
            <div class="row" />
          </div>
        </section>

        <section className="secureClients">
          <div className="container pos-relative">
            <div className="row">
              <div className="col-sm-7">
                <img
                  className=""
                  src={require("../../assets/img/secure.jpg")}
                />
              </div>
              <div className="col-sm-5">
                <div className="secureClientsBox">
                  <h2 className="">
                    Secure new clients quickly and efficiently
                  </h2>
                  <p className="">
                    LawOn is a platform which allows lawyers an easy and
                    convenient way to communicate with clients. Through the app,
                    you can speak directly with a potential client within
                    minutes of receiving an enquiry, speeding up the whole
                    process of securing new business. LawOn allows you to take
                    enquiries when and where it suits you; that could be during
                    office hours, during the evening, or at home.
                  </p>
                  <Link to="/main/register">
                    <button class="universalBtn mt-30">I'M INTERESTED</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="manageConsultation">
          <div className="container pos-relative">
            <div className="row">
              <div className="col-sm-7">
                <div className="manageConsultationBox">
                  <h2 className="">Manage consultations with ease</h2>
                  <p className="">
                    We know that consultations can be a time-consuming process,
                    leaving you playing catch up for the rest of your day. We
                    want to change this. With LawOn, free consultations via
                    phone or video call are restricted to 20 minutes, saving you
                    valuable time. Take control of your consultations and meet
                    the increased demand for legal advice with flexible
                    appointments to suit you.
                  </p>
                </div>
              </div>
              <div className="col-sm-5">
                <img
                  className=""
                  src={require("../../assets/img/manageConsultation.png")}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="convenince">
          <div className="container pos-relative">
            <div className="row">
              <div className="col-sm-12">
                <ul id="tabs" class="nav nav-tabs" role="tablist">
                  <li role="presentation">
                    <a
                      onMouseOver={() => {
                        this.openTab(1);
                      }}
                      className={this.state.activeBox}
                      href="#all"
                      role="tab"
                      data-toggle="tab"
                      aria-expanded="true"
                    >
                      <h3>
                        <img
                          className=""
                          src={require("../../assets/img/tabIcon1.png")}
                        />
                        Convenience
                      </h3>
                      <p class="">
                        Your time is valuable. Use LawOn to take enquiries when
                        it suits you, and reclaim time spent on lengthy
                        consultations.
                      </p>
                    </a>
                  </li>

                  <li role="presentation">
                    <a
                      onMouseOver={() => {
                        this.openTab(2);
                      }}
                      className="tablinks"
                      href="#all"
                      role="tab"
                      data-toggle="tab"
                      aria-expanded="true"
                    >
                      <h3>
                        <img
                          className=""
                          src={require("../../assets/img/tabIcon2.png")}
                        />
                        Efficiency
                      </h3>
                      <p class="">
                        LawOn removes all the additional steps involved in
                        acquiring a client, as they come to you. The time taken
                        to secure a new client is reduced significantly.
                      </p>
                    </a>
                  </li>

                  <li role="presentation">
                    <a
                      onMouseOver={() => {
                        this.openTab(3);
                      }}
                      className="tablinks"
                      href="#all"
                      role="tab"
                      data-toggle="tab"
                      aria-expanded="true"
                    >
                      <h3>
                        <img
                          className=""
                          src={require("../../assets/img/tabIcon3.png")}
                        />
                        Transparency
                      </h3>
                      <p class="">
                        Potential clients can see your ratings and areas of
                        expertise, convincing them of your skills and ability to
                        handle their claim.
                      </p>
                    </a>
                  </li>
                </ul>
                <div class="tab-content">
                  {this.state.openID === 1 && (
                    <div
                      role="tabpanel"
                      class="tab-pane tabcontent active"
                      id="all"
                    >
                      <img
                        className=""
                        src={require("../../assets/img/tabimg1.png")}
                      />
                    </div>
                  )}

                  {this.state.openID === 2 && (
                    <div
                      role="tabpanel"
                      class="tab-pane tabcontent active"
                      id="online"
                    >
                      <img
                        className=""
                        src={require("../../assets/img/tabimg2.png")}
                      />
                    </div>
                  )}

                  {this.state.openID === 3 && (
                    <div
                      role="tabpanel"
                      class="tab-pane tabcontent active"
                      id="offline"
                    >
                      <img
                        className=""
                        src={require("../../assets/img/tabimg3.png")}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="smartleague">
          <div className="container">
            <div className="row">
              <h2>Join the smart legal league</h2>
              <p>
                LawOn will revolutionise the way you reach and communicate with
                clients. Sign up today by clicking the button below and one of
                our team will get back to you to discuss how LawOn can help you.
              </p>
              <Link to="/main/register">
                <button class="universalBtn mt-30">I'M INTERESTED</button>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default ForLawyer;
