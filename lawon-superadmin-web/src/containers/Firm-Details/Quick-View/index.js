import React, { Component } from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class QuickView extends Component {
    render() {
        const percentage = 66;
        return (
            <div>
                <div class="col-md-12 quick-view-section">
                    <div class="heading">Quick View!</div>
                    <div class="row quick-view-bg">
                        <div class="col-md-4">
                            <h3>Enquiries</h3>

                            <CircularProgressbar value={percentage} text={`${percentage}%`}
                                    styles={buildStyles({ pathColor: "red", textColor: "red", })} />
                        </div>
                        <div class="col-md-4">
                            <h3>Consultations</h3>
                            <CircularProgressbar value={percentage} text={`${percentage}%`} /></div>
                        <div class="col-md-4">
                            <h3>Instruction</h3>
                            <CircularProgressbar value={percentage} text={`${percentage}%`}
                                    styles={buildStyles({ pathColor: "#FEB41C", textColor: "#FEB41C", })} />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default QuickView