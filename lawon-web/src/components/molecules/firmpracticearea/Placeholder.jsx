import React from 'react';
import { TextBlock, RectShape } from 'react-placeholder/lib/placeholders';

export default (
  <div className='my-awesome-placeholder'>
    <div className="col-md-3">
      <RectShape
        showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 80, height: 80 }}
      />
      <TextBlock rows={1} style={{ width: 80, marginLeft: 0 }} /></div>
    <div className="col-md-3">
      <RectShape showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 80, height: 80 }} />
      <TextBlock rows={1} style={{ width: 80, marginLeft: 0 }} />
    </div>
    <div className="col-md-3">
      <RectShape showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 80, height: 80 }} />
      <TextBlock rows={1} style={{ width: 80, marginLeft: 0 }} /></div>
    <div className="col-md-3">
      <RectShape showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 80, height: 80 }} />
      <TextBlock rows={1} style={{ width: 80, marginLeft: 0 }} /></div>
  </div>
);
