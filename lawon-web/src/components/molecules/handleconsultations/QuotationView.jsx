import React from 'react';

import { getTotal, getVat } from '../../../utils/utils';
import { VAT } from '../../../common/constants';

export default ({ legalFee, estimatedDisbursements, other }) => {
  const vat = getVat({ legalFee, vatTax: VAT });
  const total = getTotal({ legalFee, vatTax: VAT, estimatedDisbursements, other });
  return (
    <>
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
    </>
  )
}