import React, { Component } from 'react'
import { Button, TYPES } from '../../../components/atoms/YellowButton'

class Reviews extends Component {
    render() {
        return (
            <div class="quick-view-section">
                <div class=" heading" >
                    Reviews
                </div>
                <div class="col-md-12 review">
                    <div class="row bg">
                        <div class="col-md-6">
                            <div class="row bg-white">
                                <div class="col-md-7">
                                    <select class="form-control">
                                        <option>Select Lawyer</option>
                                        <option>Lawyer</option>
                                        <option>Lawyer</option>
                                    </select>
                                </div>
                                <div class="col-md-5">
                                    <Button
                                        text="Search Reviews"
                                        type="button"
                                        buttonType="btn search-reviews register-btn"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 padding-0 heading">
                            Most accepted reviews (25)
                        </div>
                   

                    </div>
                </div>
            </div>
        )
    }
}
export default Reviews 