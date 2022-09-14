import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Backdrop, CircularProgress, Snackbar, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close } from '@material-ui/icons';

import { Button, TYPES } from '../../atoms/YellowButton';
import * as actions from '../../../actions/manageFirm';

class FirmPracticeArea extends Component {
  state = {
    selectedCategoryId: '',
    practiceAreas: [],
    message: ''
  }

  componentDidMount() {
    const { getCategory, getOrganizationPracticeArea } = this.props;

    getCategory();
    getOrganizationPracticeArea().then(({ practiceAreas }) => {
      if (!practiceAreas) return;
      this.setState({ practiceAreas });
    })
  }

  handleGetSubCategory = ({ id }) => {
    const { getSubCategory } = this.props;

    getSubCategory({ categoryId: id });
    this.setState({ selectedCategoryId: id });
  }

  handleToggleSubcategory = (subCategory) => {
    const { practiceAreas } = this.state
    debugger
    const index = practiceAreas.findIndex(({ SubCategoryId }) => subCategory.id == SubCategoryId );

    if (index === -1) practiceAreas.push({ SubCategoryId: subCategory.id });
    else practiceAreas.splice(index, 1);
    this.setState({ practiceAreas });
  }

  handleSavePracticeAreas = () => {
    const { saveOrganizationPracticeArea } = this.props;
    const { practiceAreas } = this.state;

    saveOrganizationPracticeArea({ practiceAreas }).then(({ errorMessage }) => {
      if (errorMessage) {
        return this.setState({
          message: {
            description: errorMessage,
            type: 'error'
          }
        })
      };

      this.setState({
        message: {
          description: 'Practice Areas has been updated successfully.',
          type: 'success'
        }
      })
    })
  }

  render() {
    const { categories = [], subCategories = [], loading } = this.props
    const { selectedCategoryId, practiceAreas, message } = this.state;

    return (
      <div className='firm-practiceareas'>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={message && message.description && message.type === 'success'}
          onClose={() => this.setState({ message: '' })}
          autoHideDuration={4000}
          message={message && message.description}
        />
        <div className='right-side-heading'>Practice Areas</div>
        <div className='col-sm-12 no-padding'>
          <div className='practice-areas'>
            <div className='col-sm-12 no-padding'>
              <div className='right-side-light-text'>What practice areas would your firm like to provide advice on via LawOn?</div>
              <div className='categoriesList row'>
                <h3>Categories</h3>
                {categories.map(({ name, imageUrl, id }) => {
                  const isSelected = practiceAreas.some(({ SubCategory }) => id === (SubCategory && SubCategory.CategoryId));
                  return (
                    <div
                      key={id}
                      style={{ backgroundColor: (id === selectedCategoryId || isSelected) && '#feb41b' }}
                      onClick={() => this.handleGetSubCategory({ id })}
                      className="col-sm-3 categoriesListBox text-center">
                      <div className="category-box-parea">
                        <img alt={name} src={imageUrl} />
                        <div className="practice-text">{name}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='subcategoriesList row'>
                {(subCategories && subCategories.length != 0) ? <h3>Sub Categories</h3> : ''}
                {subCategories.map((subCategory, index) => {
                  const { id, name, imageUrl } = subCategory;
                  const isSelected = practiceAreas.some(({ SubCategoryId }) => id === SubCategoryId);
                  return (
                    <div
                      key={index}
                      style={{ backgroundColor: (isSelected) && '#feb41b' }}
                      onClick={() => this.handleToggleSubcategory(subCategory)}
                      className='col-sm-3 categoriesListBox text-center'>
                      <div>
                        <img alt={name} src={imageUrl} />
                        <div className='practice-text'>{name}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {(message && message.description && message.type === 'error')
          && (
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => this.setState({ message: '' })}>
                  <Close fontSize="inherit" />
                </IconButton>
              }>
              {message.description || "Something Went Wrong"}
            </Alert>
          )}
        <div className='float-right'>
          {(subCategories && subCategories.length !== 0)
            && (
              <Button
                text='Save Changes'
                type='button'
                onClick={this.handleSavePracticeAreas}
                buttonType={TYPES.Generic}
              />
            )
          }
        </div>
        <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

}

const mapStateToProps = ({ manageFirm }) => ({
  ...manageFirm
});

export default connect(mapStateToProps, actions)(FirmPracticeArea);