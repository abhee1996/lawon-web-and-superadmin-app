import React, { Component } from 'react';
import NavBar from '../../components/molecules/navbar'
import LoadingBar from 'react-top-loading-bar';
import { connect } from 'react-redux'
class MainLayout extends Component {
   

  
    render() {
        return (
            <div>
                <NavBar /> 
                <LoadingBar
                progress={this.props.LoadingProgressBar}
          height={3}
          color='#feb41c'
          onRef={ref => (this.LoadingBar = ref)}
        />
        {console.log(this.props.LoadingProgressBar)}
         
                     </div>
        );
    }
}
const mapStoreToProps = state => {
    return {
      LoadingProgressBar: state.LoadingProgressBar
  
    };
  };
 
  export default connect(mapStoreToProps, null)(MainLayout)
  
  
