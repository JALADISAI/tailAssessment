import React from "react";
const Pagination = (props) => {
  const totalpages = props.totalpages;
  const list = new Array(totalpages);
  for (let i = 1; i <= totalpages; i++) {
    list.push(i);
  }
  const currentpage = props.currentpage;
  return (
    <div className="pagination">
      {list.map((number, index) => {
        return (
          <button
            className="btn btn-primary"
            name={currentpage === number ? "selected" : ""}
            key={index}
            onClick={function () {
              props.handlepageupdate(number);
            }}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
};
export default Pagination;
