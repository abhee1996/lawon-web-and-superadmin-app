import React from 'react';
import { getTotal, getVat } from '../../../utils/utils';
import { round } from 'lodash';

export default ({ instructionDetails }) => {
  const { details, InstructionQuotation } = instructionDetails || {}
  const { legalFee, estimatedDisbursements, vatTax, other } = InstructionQuotation || {};
  const vat20 = getVat({ legalFee, vatTax })

  const total = getTotal({
    legalFee,
    vatTax,
    estimatedDisbursements,
    other
  });

  return (
    <div className='col-sm-12 pl0'>
      <div class="right-side-light-para-cases">{details}</div>
      <div class="right-side-subheading">ESTIMATE</div>
      <div class="right-side-subheading">FIXED FEE</div>
      <div className='row cases-fee-row'>
        <div className='col-sm-4'>
          <div class="right-side-light-para">Legal Fee</div>
        </div>
        <div className='col-sm-2'>
          <div class="right-side-light-para">£{round(legalFee).toFixed(2)}</div>
        </div>
        <div className='col-sm-6'>
          <div class="right-side-light-para">optional description written before</div>
        </div>
      </div>

      <div className='row cases-fee-row'>
        <div className='col-sm-4'>
          <div class="right-side-light-para">VAT @ 20%</div>
        </div>
        <div className='col-sm-2'>
          <div class="right-side-light-para">£{round(vat20).toFixed(2)}</div>
        </div>
        <div className='col-sm-6'>
          <div class="right-side-light-para"></div>
        </div>
      </div>

      <div className='row cases-fee-row'>
        <div className='col-sm-4'>
          <div class="right-side-light-para">Estimated Disbursements</div>
        </div>
        <div className='col-sm-2'>
          <div class="right-side-light-para">£{round(estimatedDisbursements || 0).toFixed(2)}</div>
        </div>
        <div className='col-sm-6'>
          <div class="right-side-light-para">optional description written before</div>
        </div>
      </div>

      <div className='row cases-fee-row'>
        <div className='col-sm-4'>
          <div class="right-side-light-para">Other</div>
        </div>
        <div className='col-sm-2'>
          <div class="right-side-light-para">£{round(other || 0).toFixed(2)}</div>
        </div>
        <div className='col-sm-6'>
          <div class="right-side-light-para">optional description written before</div>
        </div>
      </div>

      <div className='row cases-fee-row'>
        <div className='col-sm-4'>
          <div class="right-side-dark-para">TOTAL</div>
        </div>
        <div className='col-sm-2'>
          <div class="right-side-dark-para">£{round(total).toFixed(2)}</div>
        </div>
        <div className='col-sm-6'>
        </div>
      </div>

      <div class="right-side-subheading">LAWYER SUMMARY</div>
      <div class="right-side-light-para-cases">Proactively develop B2C niches whereas multifunctional alignments. Efficiently seize economically sound "outside the box" thinking rather than 2.0
      "outside the box" thinking. Compellingly communicate
       inexpensive markets with leading-edge niches. Efficiently
        enhance one-to-one vortals whereas emerging solutions.
         Seamlessly customize functionalized communities vis-a-vis
          dynamic supply chains.
    </div>
      <div class="right-side-light-para-cases">Seamlessly network cutting-edge
       bandwidth before transparent catalysts for change. Synergistically
        grow corporate innovation for pandemic infrastructures. Distinctively
        develop impactful intellectual
      capital without seamless web services. Proactively generate.
    </div>
      <div class="right-side-subheading">ACTIVITY</div>
      <div className='row cases-fee-row'>
        <div className='col-sm-5'>
          <div class="right-side-light-para">7 July 2017, 23:20</div>
        </div>
        <div className='col-sm-7'>
          <div class="right-side-light-para">Amanda sent enquiry</div>
        </div>
      </div>
      <div className='row cases-fee-row'>
        <div className='col-sm-5'>
          <div class="right-side-light-para">7 July 2017, 23:20</div>
        </div>
        <div className='col-sm-7'>
          <div class="right-side-light-para">Joe replies to enquiry and provide a quote</div>
        </div>
      </div>

    </div>
  );
}