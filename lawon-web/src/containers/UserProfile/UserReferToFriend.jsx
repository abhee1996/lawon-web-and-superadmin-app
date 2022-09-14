import React from 'react';

export default () => {
  return (
    <div className='row refer-section'>
      <div className='col-md-8'>
        <div className='grey-box'>
          Share Referral Link
        </div>

        <div className='input-group-ref' style={{ marginBottom: '30px' }}>
          <div className='copy'>lawon/pr/br</div>
          <span className='copy-yellow'>Copy</span>
        </div>

        <div className='grey-box'>
          Invite By Social Media
        </div>

        <div className='input-group-ref'>
          <span className='copy-social' style={{ background: '#0b73d5' }}><i className='fa fa-facebook'></i></span>
          <div className='copy-link-social'>Share referral link</div>
        </div>

        <div className='input-group-ref'>
          <span className='copy-social' style={{ background: '#00a7f7' }}><i className='fa fa-twitter'></i></span>
          <div className='copy-link-social'>Tweet referral link</div>
        </div>

        <div className='input-group-ref'>
          <span className='copy-social' style={{ background: '#47b04b' }}><i className='fa fa-whatsapp'></i></span>
          <div className='copy-link-social'>WhatsApp referral link</div>
        </div>

        <div className='input-group-ref'>
          <span className='copy-social' style={{ background: '#f03f22' }}><i className='fa fa-envelope'></i></span>
          <div className='copy-link-social'>Email referral link</div>
        </div>
      </div>
    </div>
  )
}