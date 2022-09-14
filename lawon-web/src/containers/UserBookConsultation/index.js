import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import { Loader } from '../../components/atoms/Loader';
import ReactPlaceholder from 'react-placeholder/lib';
import * as actions from '../../actions/user/userConsultation';
import { CategoryPlaceholder, SubcategoryPlaceholder } from "../AskALawyer/Placeholder";

class UserBookConsultation extends Component {
  state = {
    selectedCategory: {},
    selectedSubCategory: {},
    message: ''
  }

  componentDidMount() {
    const { getCategory } = this.props;
    getCategory();
  }

  handleSelectCategories = ({ category }) => {
    const { id } = category;
    const { getSubcategory } = this.props;
    this.setState({ selectedCategory: category, selectedSubCategory: {} });
    getSubcategory({ categoryId: id })
  }

  handleSelectSubCategories = ({ subCategory }) => {
    this.setState({ selectedSubCategory: subCategory });
  }

  handleNext = () => {
    const { selectedCategory, selectedSubCategory } = this.state;
    const { history } = this.props;
    if (!Object.keys(selectedCategory).length || !Object.keys(selectedSubCategory).length) {
      // TODO: handle error /main/user/consultation/:categoryId/:subCategoryId/location
      return;
    }

    history.push(`/main/user/consultation/${selectedCategory.id}/${selectedSubCategory.id}/location`);
  }


  render() {
    const { selectedCategory, selectedSubCategory, message } = this.state;
    const { id: categoryId } = selectedCategory || {};
    const { id: subCategoryId } = selectedSubCategory || {};

    const { bookConsultation } = this.props;
    const { loading, categories, subcategories, subcategoryLoading } = bookConsultation || {};

    return (
      <div className='user-main-content-consultation'>
        <div className='container'>
          {this.state.showloader ? <Loader /> : <div></div>}
          <div className='add-details-box'>
            <h2>Book a Consultation</h2>
            <div className='row select-category-sec'>
              <div className='category-row' style={{padding:'0px 60px 0px 94px'}}>
                <div className='select-cat-label'>
                  Select a category
                </div>
                <ReactPlaceholder
                  customPlaceholder={<CategoryPlaceholder />}
                  showLoadingAnimation={true}
                  ready={!loading}>
                  {
                    categories.map((category) => {
                      const { id, name, imageUrl } = category;
                      return (
                        <div id={id}
                          onClick={() => this.handleSelectCategories({ category })}
                          className='category-box-area'>
                          <div className={
                            categoryId === id
                              ? 'category-box category-box-active'
                              : 'category-box'
                          }>
                            <img width='68' src={imageUrl} alt={name} />
                          </div>
                          <div className='cat-name'>{name}</div>
                        </div>
                      )
                    })
                  }
                </ReactPlaceholder>
              </div>
              <ReactPlaceholder
                customPlaceholder={<SubcategoryPlaceholder />}
                showLoadingAnimation={true}
                ready={!subcategoryLoading}>
                {
                  subcategories.length > 0
                  && (
                    <div className='subcategory-row'  style={{padding:'0px 60px 0px 94px'}}>
                      <div className='select-cat-label'>
                        Select a subcategory
                      </div>
                      {
                        subcategories.map((subCategory) => {
                          const { id, name, imageUrl } = subCategory;
                          return (
                            <div
                            style={{marginBottom:'20px'}}
                              id={id}
                              onClick={() => this.handleSelectSubCategories({ subCategory })}
                              className='category-box-area'>
                              <div className={
                                subCategoryId === id
                                  ? 'category-box category-box-active'
                                  : 'category-box'
                              }>
                                <img width='68' src={imageUrl} alt={name} />
                              </div>
                              <div className='cat-name'>{name}</div>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
              </ReactPlaceholder>
              {message && <Alert style={{ fontSize: "16px", marginTop: '20px' }} severity="error">{message}</Alert>}
            </div>
          </div>
        </div>
        <div className='bottom-blacknav'>
          <div className='text-center'>
            <span className='active-yellow'>Category <i className='fa fa-chevron-right'></i></span>
            <span> Location  <i className='fa fa-chevron-right'></i> </span>
            <span> Date/Time <i className='fa fa-chevron-right'></i></span>
            <span> Lawyer <i className='fa fa-chevron-right'></i></span>
            <span> Details <i className='fa fa-chevron-right'></i></span>
            <span> Summary <i className='fa fa-chevron-right'></i></span>
            <span> Confirmation <i className='fa fa-chevron-right'></i></span>
              <span className='float-right active-yellow' onClick={this.handleNext}>
                NEXT <i className='fa fa-chevron-right'></i> </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userConsultation } = user || {};
  return { ...userConsultation };
}

export default connect(mapStateToProps, actions)(UserBookConsultation);