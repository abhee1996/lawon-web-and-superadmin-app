import React, { useState } from "react";
import { Button, TYPES } from "../../components/atoms/YellowButton";

export default ({ handleClose, handleCallType }) => {
  const [callType, setcallType] = useState(null);

  return (
    <div className="drawer-up-doc">
      <div class="right-side-dark-para">CHANGE CALL TYPE</div>
      <div class="">How should the lawyer contact you?</div>
      <div>
        <Button
          text="Phone Call"
          type="button"
          //   onClick={() => setcallType("phone")}
          onClick={() => setcallType(1)}
          buttonType={TYPES.BlackGeneric}
        />
        <Button
          text="Video Call"
          type="button"
          //   onClick={() => setcallType("video")}
          onClick={() => setcallType(2)}
          buttonType={TYPES.BlackGeneric}
        />
      </div>

      <div className="calltype-btn float-right">
        <Button
          text="Cancel"
          type="button"
          onClick={handleClose}
          buttonType={TYPES.Generic}
        />
        <Button
          style={{background:'#feb41c',color:'#000'}}
          text="Book"
          type="button"
          onClick={() => handleCallType(callType)}
          buttonType={TYPES.Generic}
        />
      </div>
    </div>
  );
};
