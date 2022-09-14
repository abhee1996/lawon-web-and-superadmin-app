import React, {Component} from 'react'
import {Button, TYPES} from '../../../components/atoms/YellowButton'

class Reviews extends Component{
    render(){
        return(
            <div class="quick-view-section padding-left-20">
                <div class=" heading" >
                    Reviews
                </div>
                <div class="col-md-9 review">
                    <div class="row bg">
                        
                        <div class="col-md-12 padding-0 heading">
                        Most accepted reviews (25)
                        </div>
                        <div class='col-md-12'>
                            <div class="row bg-white">
                                <div class="col-md-12 padding-0">
                                <div class="col-md-2 img">
                                    <img src="./images/firm-details/review_img.png"/>
                                </div>
                                <div class="col-md-8 padding-0 accepted-review-detail">
                                    <div>Jason SMith - Aug 5, 2019</div>
                                    <div>Consualtancy: Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant
                                         morbi tristique senectus et netus et malesuada fames ac turpis egestas. </div>
                                </div>
                                <div class="col-md-2 ">
                                <img class="star-img" src="./images/firm-details/stars.png"/>
                                </div>
                                <div class="col-md-12 hr-line"></div>
                                </div>
                                <div class="col-md-12 padding-0">
                                <div class="col-md-2 img">
                                    <img src="./images/firm-details/review_img.png"/>
                                </div>
                                <div class="col-md-8 padding-0 accepted-review-detail">
                                    <div>Jason SMith - Aug 5, 2019</div>
                                    <div>Consualtancy: Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant
                                         morbi tristique senectus et netus et malesuada fames ac turpis egestas. </div>
                                </div>
                                <div class="col-md-2 ">
                                <img class="star-img" src="./images/firm-details/stars.png"/>
                                </div>
                                <div class="col-md-12 hr-line"></div>
                                </div>
                                <div class="col-md-12 padding-0">
                                <div class="col-md-2 img">
                                    <img src="./images/firm-details/review_img.png"/>
                                </div>
                                <div class="col-md-8 padding-0 accepted-review-detail">
                                    <div>Jason SMith - Aug 5, 2019</div>
                                    <div>Consualtancy: Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant
                                         morbi tristique senectus et netus et malesuada fames ac turpis egestas. </div>
                                </div>
                                <div class="col-md-2 ">
                                <img class="star-img" src="./images/firm-details/stars.png"/>
                                </div>
                                <div class="col-md-12 hr-line"></div>
                                </div>
                                <div class="col-md-12 padding-0">
                                <div class="col-md-2 img">
                                    <img src="./images/firm-details/review_img.png"/>
                                </div>
                                <div class="col-md-8 padding-0 accepted-review-detail">
                                    <div>Jason SMith - Aug 5, 2019</div>
                                    <div>Consualtancy: Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant
                                         morbi tristique senectus et netus et malesuada fames ac turpis egestas. </div>
                                </div>
                                <div class="col-md-2 ">
                                <img class="star-img" src="./images/firm-details/stars.png"/>
                                </div>
                                
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-5"></div>
                                    <div class="col-md-2">
                                        <Button
                                            text="Load More"
                                            type="button"
                                            buttonType="btn register-btn"
                                        />
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Reviews 