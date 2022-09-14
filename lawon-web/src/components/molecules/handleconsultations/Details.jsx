import React, { useState } from 'react';
import { TextField, Snackbar } from '@material-ui/core';
import moment from 'moment';

import { getTotal, getVat } from '../../../utils/utils';
import { Button, TYPES } from '../../atoms/YellowButton';
import { PRICE_REGEX, VAT } from '../../../common/constants';
import QuotationView from './QuotationView'

export default ({ consultationDetails, saveQuotation, getConsultationDetails }) => {

  const { id, detail, EnquiryId, ConsultationQuotation, activities = [] } = consultationDetails || {};
  const [message, setMessage] = useState('');
  const [quotation, setQuotation] = useState({
    legalFee: '',
    EDfee: '',
    others: ''
  });

  const [validationSchema, setValidationSchema] = useState({
    legalFee: '',
    EDfee: '',
    others: ''
  })

  const vat = getVat({
    legalFee: Number(quotation.legalFee),
    vatTax: VAT
  })
    .toString()
    .replace('NaN', 0);

  const total = getTotal({
    legalFee: Number(quotation.legalFee),
    vatTax: VAT,
    estimatedDisbursements: Number(quotation.EDfee),
    other: Number(quotation.others)
  })
    .toString()
    .replace('NaN', 0);

  const handleOnChange = ({ target: { name, value } }) => {
    setQuotation((quotation) => ({
      ...quotation,
      [name]: value
    }));
  }

  const handleSubmitQuotation = () => {
    const { legalFee, EDfee, others } = quotation;

    const error = {};
    let cQuotation;

    if (!legalFee) {
      error.legalFee = 'Required field';
    }

    if (legalFee && !PRICE_REGEX.test(legalFee)) {
      error.legalFee = 'Invalid amount';
    }

    if (!EDfee) {
      error.EDfee = 'Required field';
    }

    if (EDfee && !PRICE_REGEX.test(EDfee)) {
      error.EDfee = 'Invalid amount';
    }

    if (others && !PRICE_REGEX.test(others)) {
      error.others = 'Invalid amount';
    }

    if (Object.keys(error).length) {
      return setValidationSchema(error);
    }
    else {
      setValidationSchema({});
    }

    cQuotation = {
      legalFee,
      estimatedDisbursements: EDfee,
      vatTax: VAT,
      other: others,
      ConsultationId: id
    }

    setMessage('');
    saveQuotation(cQuotation).then(({ errorMessage }) => {
      if (errorMessage) return setMessage(errorMessage);

      getConsultationDetails({ id });
    })
  }

  return (
    <div className='col-sm-12 pl0'>
      <div class="right-side-subheading">CONSULTATION SUMMARY</div>
      <div class="right-side-light-para-cases">{detail}</div>
      {EnquiryId
        && (
          <React.Fragment>
            <div class="right-side-subheading">ENQUIRY</div>
            <div className='row cases-fee-row'>
              <div className='col-sm-4'>
                <div class="right-side-light-para">7 July 2017, 23:20</div>
              </div>
              <div className='col-sm-8'>
                <div class="right-side-bold-yellow">GOT TO ENQUIRY</div>
              </div>
            </div>
          </React.Fragment>
        )}

      {!ConsultationQuotation ?
        (
          <div className='provide-a-quote'>
            <div className='quote-slide-down'>
              <div class="right-side-subheading">PROVIDE A QUOTE</div>
              <div class="right-side-light-para">Choose Fixed or Estimated fee to provide the most transparency to the user</div>
              <div className='provide-a-quote-box'>
                <div className='filter-lawyer-prof'>
                  <span className='active-filter'>FIXED FEE</span>
                  <span>ESTIMATED FEE</span>
                </div>
                <div className='row consult-fee-row form-area'>
                  <div className='col-sm-4 quote-padding'>
                    <div class="right-side-light-para">Legal Fee</div>
                  </div>
                  <div className='col-sm-3'>
                    <TextField
                      helperText={validationSchema.legalFee}
                      error={validationSchema.legalFee}
                      required
                      onChange={handleOnChange}
                      name="legalFee"
                      value={quotation.legalFee}
                      InputProps={{
                        startAdornment: <div style={{ marginRight: '5px' }}>£</div>
                      }}
                    />
                  </div>
                  <div className='col-sm-2 quote-padding'>
                    {/* <img onClick={() => this.openPopupQuoteDescription('legalFeeDescription')} src={require('../../../assets/img/plus-btn.png')} /> */}
                  </div>
                  <div className='col-sm-4'>
                    {/* {this.state.legalFeeDescription} */}
                  </div>
                </div>
                <div className='row consult-fee-row form-area'>
                  <div className='col-sm-4 quote-padding'>
                    <div class="right-side-light-para">VAT @ 20%</div>
                  </div>
                  <div className='col-sm-3'>
                    <TextField
                      name="vatTax"
                      value={vat}
                      InputProps={{
                        readOnly: true,
                        startAdornment: <div style={{ marginRight: '5px' }}>£</div>
                      }}
                    />
                  </div>
                  <div className='col-sm-2 quote-padding'>

                  </div>
                </div>

                <div className='row consult-fee-row form-area'>
                  <div className='col-sm-4 quote-padding'>
                    <div class="right-side-light-para">Estimated Disbursements</div>
                  </div>
                  <div className='col-sm-3'>
                    <TextField
                      helperText={validationSchema.EDfee}
                      error={validationSchema.EDfee}
                      name="EDfee"
                      onChange={handleOnChange}
                      value={quotation.EDfee}
                      InputProps={{
                        startAdornment: <div style={{ marginRight: '5px' }}>£</div>
                      }}
                    />
                  </div>
                  <div className='col-sm-2 quote-padding'>
                    {/* <img onClick={() => this.openPopupQuoteDescription('estimatedDisbursementsDescription')} src={require('../../../assets/img/plus-btn.png')} /> */}
                  </div>
                  <div className='col-sm-4'>
                    {/* {this.state.estimatedDisbursementsDescription} */}
                  </div>
                </div>

                <div className='row consult-fee-row form-area'>
                  <div className='col-sm-4 quote-padding'>
                    <div class="right-side-light-para">Other</div>
                  </div>
                  <div className='col-sm-3'>
                    <TextField
                      helperText={validationSchema.others}
                      error={validationSchema.others}
                      name="others"
                      onChange={handleOnChange}
                      value={quotation.others}
                      InputProps={{
                        startAdornment: <div style={{ marginRight: '5px' }}>£</div>
                      }}
                    />
                  </div>
                  <div className='col-sm-2 quote-padding'>
                    {/* <img onClick={() => this.openPopupQuoteDescription('otherDescription')} src={require('../../../assets/img/plus-btn.png')} /> */}
                  </div>

                  <div className='col-sm-4'>
                    {/* {this.state.otherDescription} */}
                  </div>
                </div>
                <div className='row consult-fee-row form-area'>
                  <div className='col-sm-4 quote-padding'>
                    <div class="right-side-dark-para">TOTAL</div>
                  </div>
                  <div className='col-sm-3'>
                    <TextField
                      name="totalAmount"
                      value={total}
                      InputProps={{
                        readOnly: true,
                        startAdornment: <div style={{ marginRight: '5px' }}>£</div>
                      }}
                    />
                  </div>
                  <div className='col-sm-2 quote-padding'>
                  </div>
                </div>
              </div>
              <div className='col-md-12 no-padding'>
                <div className='step-section-btns'>
                  <Button
                    text='Save'
                    //disabled={!legalFee || !estimatedDisbursements}
                    type='button'
                    onClick={handleSubmitQuotation}
                    buttonType={TYPES.Generic}
                  />
                </div>
              </div>
            </div>
          </div>
        )
        :
        <QuotationView {...ConsultationQuotation} />
      }
      <div class="right-side-subheading">ACTIVITY</div>
      {activities.map(({ createdAt, Lawyer, description }) => {
        const { firstName, lastName } = Lawyer || {};
        return (
          <div className="row cases-fee-row">
            <div className="col-sm-4">
              <div className="right-side-light-para">{moment(createdAt).format('DD MMM YYYY, HH:mm')}</div>
            </div>
            <div className="col-sm-8">
              <div className="right-side-light-para">{description.replace('{{lawyer}}', `${firstName} ${lastName}`)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
