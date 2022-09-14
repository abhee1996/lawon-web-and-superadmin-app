import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import { Button} from "../YellowButton";


export default function DeleteBox({deleteBoxSet,deletePlan,dialogClose}) {
    return (
        <div>
             <Dialog open={deleteBoxSet}>
          <div>
            <div class="col-md-12 plan-popup" style={{ padding: "0px", margin: "0px" }}>
              <div class="col-md-12" style={{ background: "#feb41c" }}>
                <h1>Free User List</h1>
              </div>
              <div class="col-md-5"> <br></br>  </div>
              <div class="col-md-12">
                <div class="dialog-popup-subtext">
                  <form action="/action_page.php">
                    <div class="form-group" style={{ marginBottom: "0px" }}>
                      <label for="email" style={{ fontSize: "15px" }}>First Name:</label>
                      <input type="email" class="form-control" id="email" name="email" />
                    </div>

                    <div class="form-group" style={{ marginBottom: "0px" }}>
                      <label for="email" style={{ fontSize: "15px" }}>Last Name:</label>
                      <input type="email" class="form-control" id="email" name="email" />
                    </div>

                    <div class="form-group" style={{ marginBottom: "0px" }}>
                      <label for="email" style={{ fontSize: "15px" }}>Phone</label>
                      <input type="email" class="form-control" id="email" name="email" />
                    </div>

                    <div class="form-group" style={{ marginBottom: "0px" }}>
                      <label for="email" style={{ fontSize: "15px" }}>Email</label>
                      <input type="email" class="form-control" id="email" name="email" />
                    </div>
                    <div class="form-group" style={{ marginBottom: "0px" }}>
                      <label for="email" style={{ fontSize: "15px" }}>Password</label>
                      <input type="email" class="form-control" id="email" name="email" />
                    </div>
                  </form>

                </div>
              </div>

              <div class="col-md-12  created-popup-action" style={{ paddingBottom: '20px' }}>
                <div class="col-md-6"></div>

                <div class="col-md-3 no-padding ">
                  <Button
                    text="Add"
                    type="button"
                    buttonType="btn dialog-delete-btn"
                    onClick={() => this.dialogClose()}
                  />
                </div>
                <div class="col-md-3 no-padding ">
                  <Button
                    text="Close"
                    type="button"
                    buttonType="btn dialog-delete-btn"
                    onClick={() => this.dialogClose()}
                  />
                </div>

                <div class="col-md-4"></div>

              </div>
            </div>
          </div>
        </Dialog>
        </div>
    )
}
