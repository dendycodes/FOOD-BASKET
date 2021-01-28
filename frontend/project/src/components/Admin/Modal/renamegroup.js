import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
class Renamegroup extends Component {
  state = {};
  render() {
    return (
      <div
        className="modal fade"
        id="renamegroup"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {this.props.groupname}
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3"></div>
                <div className="mb-3">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        New group name:
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control w-50"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-danger">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Renamegroup;
