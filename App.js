import React, { useEffect, useState } from "react";
import "./App.css";
import { BiEdit, BiLastPage } from "react-icons/bi";
import { RiAlignVertically, RiDeleteBinLine } from "react-icons/ri";
import Pagination from "./pagination";
import Model from "./model";
import "./pagination.css";
function App() {
  const [data, SetData] = useState([]);
  const [initData, setInitData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [noOfPages, setpages] = useState(1);
  const [search, SetSearch] = useState("");
  const [modaldata, SetModalData] = useState({});
  const [update, SetUpDate] = useState([]);
  const [edit, SetEdit] = useState(false);
  const [currentPage, SetCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const handleChange = (event) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };
  const handleRowCheckboxChange = (checked, id) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const deleteOnClick = (row) => {
    const list = data.filter((item) => {
      return item.id !== row.id;
    });
    SetData(list);
  };
  const handleOnEdit = (row) => {
    SetEdit(true);
    SetModalData(row);
  };

  useEffect(() => {
    getApiData();
  }, []);
  const getApiData = async () => {
    const responce = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((res) => {
        SetData(res);
        setInitData(res);
      });
  };

  useEffect(() => {
    setpages(Math.ceil(data.length / recordsPerPage));
  }, [data]);

  const bulkDelete = () => {
    SetData(data.filter((item) => !selectedRows.includes(item.id)));
  };

  const handlePageUpdate = (number) => {
    SetCurrentPage(number);
  };

  const handleEditRow = (updatedRow) => {
    const list = data.map((item) => {
      if (item.id === updatedRow.id) {
        return updatedRow;
      }
      return item;
    });
    const list2 = initData.map((item) => {
      if (item.id === updatedRow.id) {
        return updatedRow;
      }
      return item;
    });
    SetData(list);
    setInitData(list2);
    SetEdit(false);
  };

  const handleCloseModal = () => {
    SetEdit(false);
  };

  const handleSearch = (value) => {
    SetSearch(value);
    const list = initData.filter((item) => {
      return value.toLowerCase() === ""
        ? item
        : item.name.toLowerCase().includes(value) ||
            item.email.toLowerCase().includes(value) ||
            item.role.toLowerCase().includes(value);
    });
    SetData(list);
  };

  return (
    <div style={{ maxWidth: `90%`, margin: `2% auto` }}>
      <input
        className="search form-control"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder=" search by name or email or role"
      />

      <table className="table">
        <thead className="table header">
          <tr className="table">
            <th>
              <input type="checkbox" name="checked" onChange={handleChange} />
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"> Role</th>
            <th scope="col"> Actions</th>
          </tr>
        </thead>
        <tbody className="body">
          {data.slice(currentPage * 10 - 10, currentPage * 10).map((row) => {
            const isSelected = selectedRows.includes(row.id);
            return (
              <tr key={row.id} className={isSelected ? `selected` : ``}>
                <th>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      handleRowCheckboxChange(e.target.checked, row.id);
                    }}
                  />
                </th>
                <th scope="row">{row.name}</th>
                <td>{row.email}</td>
                <th>{row.role}</th>
                <th>
                  {" "}
                  <BiEdit onClick={() => handleOnEdit(row)} />{" "}
                  <RiDeleteBinLine
                    className="red"
                    onClick={() => deleteOnClick(row)}
                  />
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      {edit && (
        <Model
          handleclosemodal={handleCloseModal}
          handleeditrow={handleEditRow}
          rowdata={modaldata}
        />
      )}

      <div>
        <button
          disabled={!selectedRows.length > 0}
          className="btn btn-danger"
          onClick={bulkDelete}
        >
          Delete Selected
        </button>
      </div>
      <Pagination
        totalpages={noOfPages}
        currentpage={currentPage}
        handlepageupdate={handlePageUpdate}
      />
    </div>
  );
}

export default App;
