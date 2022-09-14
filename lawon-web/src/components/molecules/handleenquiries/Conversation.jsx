
import React, { useState } from 'react';
import { TextField, Avatar, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { GetApp } from '@material-ui/icons';
import moment from 'moment';

import { Button, TYPES } from "../../atoms/YellowButton";
import { getVat, getTotal } from '../../../utils/utils';
import { PRICE_REGEX, VAT } from '../../../common/constants';

export default ({ submitReply,enquireyDetails,conversation,getLawyerConversation}) => {
  const { id: enquiryId } = enquireyDetails || {};
  const { EnquiryReplies = [], EnquiryQuotation, quotationReplyId } = conversation || {};
  const [ slide, setSlide ] = useState();
  const [ message, setMessage ] = useState('');

  const [content, setContent] = useState('');
  const [quotation, setQuotation] = useState({
    legalFee: '',
    EDfee: '',
    others: ''
  })

  const [validationSchema, setValidationSchema] = useState({
    legalFee: '',
    EDfee: '',
    others: ''
  })
  const handleOnChange = ({ target: { name, value }}) => {
    setQuotation({
      ...quotation,
      [name]: value 
    });
   }

  const { legalFee, other, vatTax, estimatedDisbursements } = EnquiryQuotation || {};
  const newTotal = getTotal({
    legalFee: Number(legalFee),
    vatTax: Number(vatTax),
    estimatedDisbursements: Number(estimatedDisbursements),
    other: Number(other)
  });

  const vat = getVat({
    legalFee: Number(quotation.legalFee),
    vatTax: VAT
  })
    .toString()
    .replace('NaN', 0)

  const total = getTotal({
    legalFee: Number(quotation.legalFee),
    vatTax: VAT,
    estimatedDisbursements: Number(quotation.EDfee),
    other: Number(quotation.others)
  })
    .toString()
    .replace('NaN', 0);
    
  const handleSubmitReply = () => {
    const { legalFee, EDfee, others } = quotation
    const error = {};
    let eQuotation;
    if (Object.values(quotation).some(x => x)) {
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
      eQuotation = {
        legalFee,
        estimatedDisbursements: EDfee,
        vatTax: VAT,
        other: others
      }
      if (EnquiryQuotation) {
        eQuotation.id = EnquiryQuotation.id
      }
    }
    setMessage('');
    submitReply({
      enquiryId,
      content: content,
      quotation: eQuotation ,
    }) .then(({submittingReply,errorMessage})=>{
      if (errorMessage) return setMessage(errorMessage);
      setQuotation ({
        submittingReply,
        others :"",
        legalFee:"",
        EDfee:"",
      })

      setSlide(0)
      setContent('');
      getLawyerConversation({ enquiryId });
      })
      


  }

  
  return (
    <div>
      <div className="col-sm-12 pl0">
        {EnquiryReplies.map(({ id, replyContent, Lawyer, User, createdAt, EnquriyAttachments }) => {
          const { firstName, lastName, imageUrl } = User || Lawyer || {};
          return (
            <div className="row enquiry-section" key={id}>
              <div className="col-sm-2">
                <div className="box-image">
                  <Avatar src={imageUrl}/>
                </div>
              </div>

              <div className="col-sm-10 pl0">
                <div className="enquiry-user-name-date">
                  <span className="team-list-name-enquiry">{firstName} {lastName}</span>
                  <span className="team-list-para-enquiry">
                    {moment(createdAt).format('DD MMM YYYY, HH:mm')}
                  </span>
                </div>
                <div className="right-side-light-para">
                  {replyContent}
                </div>

                {(EnquriyAttachments && EnquriyAttachments.length > 0)
                  && (
                    <div className="right-side-light-para" style={{ marginTop: '10px' }}>
                      {EnquriyAttachments.map(({ name, url, id }) => {
                        return (
                          <div
                            key={id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              width: '100%',
                            }}>
                            <div>
                              <IconButton
                                onClick={() => window.open(url, '_blank')}
                                size='small'>
                                <GetApp />
                              </IconButton>
                            </div>
                            <div className="right-side-bold-yellow">{name}</div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                {quotationReplyId === id
                  && (
                    <div className="provided-box float-right">
                      <span className="provided-yellow-box" 
                       InputProps={{ readOnly: true }}
                        >£ {newTotal}</span>
                      <span className="provided-black-box">
                        <span className="blackbox-bold">Quote Provided</span>
                        <span className="blackbox-light">DETAILS</span>
                      </span>
                    </div>
                  )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="right-side-subheading">REPLY</div>
      <div className="form-group pt-10">
        <TextField
          style={{ width: '100%' }}
          name="replyContent"
          value={content}
          onChange={({ target: { value }}) => setContent(value)}
          placeholder="Write a reply"
          multiline
          variant='outlined'
          rows='4'
        />
      </div>
      <div className="provide-a-quote">
        <div
          className="right-side-bold-yellow"
          onClick={() => setSlide(1)}>
          PROVIDE A QUOTE
        </div>
        {slide === 1 && (
          <div className="quote-slide-down">
            <div className="right-side-subheading">
              <div
                className="right-side-bold-yellow float-right"
                onClick={() => setSlide(0)}>
                CLOSE
              </div>
            </div>
            <div className="right-side-light-para">
              Choose Fixed or Estimated fee to provide the most transparency
              to the user
            </div>
            <div className="provide-a-quote-box">
              <div className="filter-lawyer-prof">
                <span className="active-filter">FIXED FEE</span>
                <span>ESTIMATED FEE</span>
              </div>
              <div className="row consult-fee-row form-area">
                <div className="col-sm-4 quote-padding">
                  <div className="right-side-light-para">Legal Fee</div>
                </div>
                <div className="col-sm-3">
                  <TextField
                    helperText={validationSchema.legalFee}
                    error={validationSchema.legalFee}
                    required
                    onChange={handleOnChange  }
                    name="legalFee"
                    value={quotation.legalFee }
                    InputProps={{
                      startAdornment: <div style={{ marginRight: '5px' }}>£</div>
                    }}
                  />
                </div>
                <div className="col-sm-2 quote-padding">
                  <img src={require("../../../assets/img/plus-btn.png")} />
                </div>
              </div>
              <div className="row consult-fee-row form-area">
                <div className="col-sm-4 quote-padding">
                  <div className="right-side-light-para">VAT @ 20%</div>
                </div>
                <div className="col-sm-3">
                  <TextField
                    name="vatTax"
                    value={vat}
                    InputProps={{
                      readOnly: true,
                      startAdornment: <div style={{ marginRight: '5px' }}>£</div>
                    }}
                  />
                </div>
                <div className="col-sm-2 quote-padding" />
              </div>

              <div className="row consult-fee-row form-area">
                <div className="col-sm-4 quote-padding">
                  <div className="right-side-light-para">
                    Estimated Disbursements
                  </div>
                </div>
                <div className="col-sm-3">
                  <TextField
                    helperText={validationSchema.EDfee}
                    error={validationSchema.EDfee}
                    name="EDfee"
                    onChange={handleOnChange }
                    value={quotation.EDfee}
                    InputProps={{
                      startAdornment: <div style={{ marginRight: '5px' }}>£</div>
                    }}
                  />
                </div>
                <div className="col-sm-2 quote-padding">
                  <img src={require("../../../assets/img/plus-btn.png")} />
                </div>
              </div>

              <div className="row consult-fee-row form-area">
                <div className="col-sm-4 quote-padding">
                  <div className="right-side-light-para">Other</div>
                </div>
                <div className="col-sm-3">
                  <TextField
                    helperText={validationSchema.others}
                    error={validationSchema.others}
                    name="others"
                    onChange={handleOnChange }
                    value={quotation.others}
                    InputProps={{
                      startAdornment: <div style={{ marginRight: '5px' }}>£</div>
                    }}
                  />
                </div>
                <div className="col-sm-2 quote-padding">
                  <img src={require("../../../assets/img/plus-btn.png")} />
                </div>
              </div>
              <div className="row consult-fee-row form-area">
                <div className="col-sm-4 quote-padding">
                  <div className="right-side-dark-para">TOTAL</div>
                </div>
                <div className="col-sm-3">
                  <TextField
                    name="totalAmount"
                    value={total}
                    InputProps={{
                      readOnly: true,
                      startAdornment: <div style={{ marginRight: '5px' }}>£</div>
                    }}
                  />
                </div>
                <div className="col-sm-2 quote-padding" />
              </div>
            </div>
          </div>
        )}

        <div className="col-md-12 no-padding">
          {message && (
            <Alert
              style={{ fontSize: "16px", marginTop: '10px' }}
              severity="error">
              {message}
            </Alert>
          )}
          <div className="step-section-btns">
            <Button
              text="Cancel"
              type="button"
              onClick={() => { }}
              buttonType={TYPES.Generic}
            />
            <Button
              text="Reply"
              disabled={!content}
              type="submit"
              onClick={handleSubmitReply}
              buttonType={TYPES.Generic}
            />
          </div>
        </div>
      </div>

    </div>
  );
}