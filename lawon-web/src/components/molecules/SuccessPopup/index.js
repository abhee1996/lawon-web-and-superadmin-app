import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Button, TYPES} from '../../atoms/YellowButton'



class SuccessPopup extends Component {
    state = {        
    
    }
     constructor(props, context){
        super(props, context);
    
        this.state = {
            dialogOpen: false
        };
    
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }

     componentWillMount(){
        
     }
     openModal() {
        this.setState({dialogOpen: true});
     }
    
      closeModal() {
        this.setState({dialogOpen: false});
      }

    render() { 
        return ( 
            <Dialog
            onClose={this.closeModal}
            aria-labelledby="customized-dialog-title"
            open={this.state.dialogOpen}>
           
            <DialogContent>
          <div className='notification-dialog'>          
          <h3 className='text-center pt-4'>Success</h3>
          <div className='text-center'>
          <i className="fa fa-check-circle circle-icon"></i>
          </div>
          <Button 
              text='Close' 
              type='button' 
              onClick={() => this.closeModal()}
              buttonType={TYPES.Generic}  
              />
            </div>

          
            </DialogContent>           


          </Dialog>
         );
    }
}
 
export default SuccessPopup;