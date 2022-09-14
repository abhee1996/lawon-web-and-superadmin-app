import React, { Component } from "react";
import ReactPlaceholder from "react-placeholder";
import { withRouter } from "react-router-dom";
import "react-placeholder/lib/reactPlaceholder.css";
import { connect } from "react-redux";

import { CategoryPlaceholder, SubcategoryPlaceholder } from "./Placeholder";
import * as actions from "../../actions/user/questions";

class AskALawyer extends Component {
  state = {
    selectedCategory: '',
    selectedSubcategory: ''
  };

  componentDidMount() {
    const { getCategory } = this.props;
    getCategory();
  }

  handleCategory = (category) => {
    const { getSubcategory } = this.props;
    const { id } = category || {};

    this.setState({
      selectedCategory: category,
      selectedSubcategory: {}
    });

    getSubcategory({ categoryId: id });
  };

  handleOnChangeSubcategory = (subcategory) => {
    this.setState({ selectedSubcategory: subcategory });
  };

  handleOnNext = () => {
    const { history, setCategorySubcategory } = this.props;
    const { selectedCategory, selectedSubcategory } = this.state;

    if (selectedSubcategory && selectedSubcategory) {
      setCategorySubcategory({ selectedCategory, selectedSubcategory });
      history.push("/main/askalawyerdescription");
    }
  };

  render() {
    const { askQuestion } = this.props;
    const { categoryLoading, categories = [], subcategories = [], subcategoryLoading } = askQuestion || {};
    const { selectedCategory, selectedSubcategory } = this.state;

    return (
      <div className="user-main-content-consultation">
        <div className="container">
          <div className="add-details-box">
            <h2>Ask a Lawyer</h2>
            <p>
              {selectedCategory.name}{" "}
              {selectedSubcategory && (<>/ {selectedSubcategory.name}</>)}
            </p>

            <div className="row select-category-sec">
              <div className="category-row" style={{padding:'0px 60px 0px 94px'}}>
                <div className="select-cat-label">Select a category</div>
                <ReactPlaceholder
                  customPlaceholder={<CategoryPlaceholder />}
                  showLoadingAnimation={true}
                  ready={!categoryLoading}>
                  {categories.map((category) => {
                    const { id, imageUrl, name } = category || {};
                    return (
                      <div
                      style={{marginBottom:'20px'}}
                        key={id}
                        onClick={() => this.handleCategory(category)}
                        className="category-box-area">
                        <div
                          className={
                            selectedCategory.id === id
                              ? "category-box category-box-active"
                              : "category-box"
                          }>
                          <img src={imageUrl} alt={name} />
                        </div>
                        <div className="cat-name">{name}</div>
                      </div>
                    )
                  })}
                </ReactPlaceholder>
              </div>
              <ReactPlaceholder
                customPlaceholder={<SubcategoryPlaceholder />}
                showLoadingAnimation={true}
                ready={!subcategoryLoading}>
                {(subcategories.length !== 0 && selectedSubcategory)
                && (
                  <div className="subcategory-row"  style={{padding:'0px 60px 0px 94px'}}>
                    <div className="select-cat-label">
                      Select a subcategory
                    </div>
                    {subcategories.map((subcategory) => {
                      const { id, name, imageUrl } = subcategory || {};
                      return (
                        <div
                        style={{marginBottom:'20px'}}
                          key={id}
                          onClick={() => this.handleOnChangeSubcategory(subcategory)}
                          className="category-box-area">
                          <div
                            className={
                              selectedSubcategory.id === id
                                ? "category-box category-box-active"
                                : "category-box"
                            }>
                            <img src={imageUrl} alt={name} />
                          </div>
                          <div className="cat-name">{name}</div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </ReactPlaceholder>
            </div>
          </div>
        </div>
        <div className="bottom-blacknav">
          <div className="text-center">
            <span>
              <span style={{ color: "#FEB41C" }}>Category</span>
              <i className="fa fa-chevron-right"></i>
            </span>
            <span>
              Question <i className="fa fa-chevron-right"></i>
            </span>
            <span> Confirmation</span>
            <span className="float-right" onClick={this.handleOnNext}>
              NEXT <i className="fa fa-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { questions } = user || {};
  return {
    ...questions
  };
};

export default connect(mapStateToProps, actions)(withRouter(AskALawyer));
