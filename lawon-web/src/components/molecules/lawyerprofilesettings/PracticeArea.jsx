import React, { Component } from 'react';
import { Backdrop, CircularProgress, Snackbar, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close } from '@material-ui/icons';

import { Button, TYPES } from '../../atoms/YellowButton';

class LawyerPracticeArea extends Component {
  state = {
    SubCategories: [],
    practiceAreas: [],
    message: '',
    selectedCategoryId: ''
  }

  componentDidMount() {
    const { getPracticeAreaWithinOrganization, getLawyerPracticeArea } = this.props;

    getPracticeAreaWithinOrganization();
    getLawyerPracticeArea().then(() => {
      const { practiceAreas } = this.props;
      this.setState({ practiceAreas });
    })
  }

  handleGetSubCategory = ({ SubCategories, id }) => {
    this.setState({
      SubCategories,
      selectedCategoryId: id
    });
  }

  handleToggleSubcategory = (subCategory) => {
    const { practiceAreas } = this.state

    const index = practiceAreas.findIndex(({ SubCategoryId }) => subCategory.id == SubCategoryId );

    if (index === -1) {
      practiceAreas.push({
        SubCategoryId: subCategory.id,
        name: subCategory.name,
        imageUrl: subCategory.imageUrl
      });
    }
    else practiceAreas.splice(index, 1);
    this.setState({ practiceAreas });
  }

  handleSavePracticeAreas = () => {
    const { saveLawyerPracticeArea } = this.props;
    const { practiceAreas } = this.state;

    saveLawyerPracticeArea({ practiceAreas }).then(({ errorMessage }) => {
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
    const { categories = [], loading } = this.props
    const { selectedCategoryId, practiceAreas, message, SubCategories } = this.state;

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
        <div className='col-sm-12 no-padding'>
          <div className='practice-areas'>
            <div className='col-sm-12 no-padding'>
              <div className='right-side-light-text'>What practice areas would your firm like to provide advice on via LawOn?</div>
              <div className='categoriesList row'>
                <h3>Categories</h3>
                {categories.map(({ name, imageUrl, id, SubCategories }) => {
                  const isSelected = practiceAreas.some(({ SubCategory }) => id === (SubCategory && SubCategory.CategoryId));
                  return (
                    <div
                      key={id}
                      style={{ backgroundColor: (id === selectedCategoryId || isSelected) && '#feb41b' }}
                      onClick={() => this.handleGetSubCategory({ SubCategories, id })}
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
                {(SubCategories && SubCategories.length != 0) ? <h3>Sub Categories</h3> : ''}
                {SubCategories.map((subCategory, index) => {
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
          {(SubCategories && SubCategories.length !== 0)
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

export default LawyerPracticeArea;