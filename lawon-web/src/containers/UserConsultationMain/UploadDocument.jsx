import React from "react";
import { Button, TYPES } from "../../components/atoms/YellowButton";
import { Button as UploadBtn } from "@material-ui/core";

const uploadBtn = {
  width: "120px",
  marginTop: "10px",
  fontSize: "13px",
  lineHeight: "1.42857143",
  borderRadius: "4px",
  padding: "6px 12px",
  background: "#feb41c",
  border: "1px solid #feb41c",
};

export default ({ onUpload }) => {

  const handleUpload = ({ target: { files }}) => {
    const file = files && files.length && files[0];
    onUpload({ file })
  }

  return (
    <div className="drawer-up-doc">
      <div class="right-side-dark-para">Upload</div>
      <div class="">Select file you want to upload</div>
      <div>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleUpload}
        />
        <label htmlFor="contained-button-file">
          <UploadBtn variant="contained" component="span" style={uploadBtn}>
            Upload
          </UploadBtn>
        </label>
      </div>

      <div class="pt40">or attach from cloud drives</div>
      <Button
        text="Google Drive"
        type="button"
        onClick={() => {}}
        buttonType={TYPES.BlackGeneric}
      />

      <Button
        text="Dropbox"
        type="button"
        onClick={() => {}}
        buttonType={TYPES.BlackGeneric}
      />
      <Button
        text="Box"
        type="button"
        onClick={() => {}}
        buttonType={TYPES.BlackGeneric}
      />
    </div>
  );
};
