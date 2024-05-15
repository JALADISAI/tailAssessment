import React, { useState } from "react";
import "./model.css";
function Modal(props) {
  const [data, setData] = useState(props.rowdata);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleeditrow(data);
  };
  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {`Edit User`}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.handleclosemodal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                className="form-control"
                onChange={(e) => handleChange(`name`, e.target.value)}
                value={data.name}
              />
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  className="form-control"
                  onChange={(e) => handleChange(`email`, e.target.value)}
                  value={data.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                  name="role"
                  className="form-control"
                  onChange={(e) => handleChange(`role`, e.target.value)}
                  value={data.role}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={props.handleclosemodal}
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary"
            >
              Update User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
