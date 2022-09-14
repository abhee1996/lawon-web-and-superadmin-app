import React from 'react';
import { TextBlock, RectShape } from 'react-placeholder/lib/placeholders';

export const CategoryPlaceholder = () => (
  <div className='my-awesome-placeholder'>
    <div class="col-md-3">
      <RectShape
        showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 135, height: 135 }}
      />
      <TextBlock
        rows={1}
        style={{ width: 100, marginLeft: 20 }}
        />
      </div>
    <div class="col-md-3">
      <RectShape showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 140, height: 140 }} />
      <TextBlock
        rows={1}
        style={{ width: 100, marginLeft: 20 }}
      />
    </div>
    <div class="col-md-3">
      <RectShape showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 140, height: 140 }} />
      <TextBlock
        rows={1}
        style={{ width: 100, marginLeft: 20 }}
      />
    </div>
    <div class="col-md-3">
      <RectShape showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 140, height: 140 }} />
      <TextBlock
        rows={1}
        style={{ width: 100, marginLeft: 20 }}
      />
    </div>
  </div>
);

export const SubcategoryPlaceholder = () => (
  <div className='my-awesome-placeholder'>
    <div class="col-md-3">
      <RectShape
        showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 135, height: 135, marginTop: 100 }}
      />
      <TextBlock
        rows={1}
        style={{ width: 100, marginLeft: 20, }}
      />
    </div>
    <div class="col-md-3">
      <RectShape showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 135, height: 135, marginTop: 100 }} />
      <TextBlock
        rows={1}
        style={{ width: 100, marginLeft: 20 }}
      />
    </div>
    <div class="col-md-3">
      <RectShape showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 135, height: 135, marginTop: 100 }} />
      <TextBlock
        rows={1}
        style={{ width: 100, marginLeft: 20 }}
      />
    </div>
    <div class="col-md-3">
      <RectShape showLoadingAnimation={true}
        color="#F7F8F8"
        style={{ width: 135, height: 135, marginTop: 100 }} />
      <TextBlock
      rows={1}
      style={{ width: 100, marginLeft: 20 }}
      />
    </div>
  </div>
);