import React from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';

import { getVat, getTotal } from '../../../utils/utils';

export default ({  conversation }) => {
  const { EnquiryQuotation, Consultation, activities = [] } = conversation || {};
  const { legalFee, other, vatTax, estimatedDisbursements } = EnquiryQuotation || {};
  const vat = getVat({
    legalFee: Number(legalFee),
    vatTax : Number(vatTax)
  });

  const total = getTotal({
    legalFee: Number(legalFee),
    vatTax: Number(vatTax),
    estimatedDisbursements: Number(estimatedDisbursements),
    other: Number(other)
  });
  
  const { startTime, channel, id } = Consultation || {};
  return (
    <div className="col-sm-12 pl0">
      <div className="right-side-subheading">ESTIMATE</div>
      <div className="right-side-subheading">FIXED FEE</div>
      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div className="right-side-light-para">Legal Fee</div>
        </div>
        <div className="col-sm-2">
          <div className="right-side-light-para">£{legalFee}</div>
        </div>
        <div className="col-sm-6">
          <div className="right-side-light-para">
            optional description written before
          </div>
        </div>
      </div>

      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div className="right-side-light-para">VAT @ 20%</div>
        </div>
        <div className="col-sm-2">
          <div className="right-side-light-para">£{vat}</div>
        </div>
        <div className="col-sm-6">
          <div className="right-side-light-para" />
        </div>
      </div>

      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div className="right-side-light-para">Estimated Disbursements</div>
        </div>
        <div className="col-sm-2">
          <div className="right-side-light-para">£{estimatedDisbursements}</div>
        </div>
        <div className="col-sm-6">
          <div className="right-side-light-para">
            optional description written before
          </div>
        </div>
      </div>

      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div className="right-side-light-para">Other</div>
        </div>
        <div className="col-sm-2">
          <div className="right-side-light-para">£{other}</div>
        </div>
        <div className="col-sm-6">
          <div className="right-side-light-para">
            optional description written before
          </div>
        </div>
      </div>

      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div className="right-side-dark-para">TOTAL</div>
        </div>
        <div className="col-sm-2">
          <div className="right-side-dark-para">£{total}</div>
        </div>
        <div className="col-sm-6" />
      </div>

      {Consultation
        && (
          <>
            <div className="right-side-subheading">CONSULTATION</div>
            <div className="row cases-fee-row">
              <div className="col-sm-4">
                <div className="right-side-light-para">{moment(startTime).format('DD MMM YYYY, HH:mm')}</div>
              </div>
              <div className="col-sm-2">
                <div className="right-side-light-para">{channel}</div>
              </div>
              <div className="col-sm-6">
                <Link to="/main/dashboardmaster/dashboardconsultation">
                  <div className="right-side-bold-yellow">GO TO CONSULTATION</div>
                </Link>
              </div>
            </div>
          </>
        )}

      <div className="right-side-subheading">ACTIVITY</div>
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