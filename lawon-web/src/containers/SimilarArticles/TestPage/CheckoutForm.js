import React, {Component} from 'react';
import {CardElement,  CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe,
    StripeProvider,
    Elements,} from 'react-stripe-elements';
    const createOptions = () => {
        return {
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              letterSpacing: '0.025em',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#c23d4b',
            },
          },
        };
      };
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    errorMessage: '',
  };

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(this.props.handleResult);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="split-form">
          <label>
            Card number           
            <CardNumberElement
              {...createOptions()}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Expiration date
            <CardExpiryElement
              {...createOptions()}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="split-form">
          <label>
            CVC
            <CardCVCElement {...createOptions()} onChange={this.handleChange} />
          </label>
          <label>
            Postal code
            <input
              name="name"
              type="text"
              placeholder="94115"
              className="StripeElement"
              required
            />
          </label>
        </div>
        <div className="error" role="alert">
          {this.state.errorMessage}
        </div>
        <button>Pay</button>
      </form>
    );
  }
}


export default injectStripe(CheckoutForm);