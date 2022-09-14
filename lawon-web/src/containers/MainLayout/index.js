import React, { Component } from 'react';
import NavBar from '../../components/molecules/navbar'
class MainLayout extends Component {
  state = {}
  render() {
    console.log("MainLayout")
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default MainLayout;