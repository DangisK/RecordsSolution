import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditRecordModal } from "./EditRecordModal";

export const RecordsTable = ({ records, onRecordDelete, onRecordUpdate }) => {
  const [updatingRecord, setUpdatingRecord] = useState(null);
  const [titleFilter, setTitleFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [filteredRecords, setFilteredRecords] = useState(records);
  const navigateTo = useNavigate();
  
  const closeUpdateModal = () => {
    setUpdatingRecord(null);
  };
  
  useEffect(() => {
    setFilteredRecords(records);
  }, [records]);

  useEffect(() => {
    filterRecords();
  }, [titleFilter, descriptionFilter]);

  const filterRecords = () => {
    const lowerCaseTitle = titleFilter.toLowerCase();
    const lowerCaseDescription = descriptionFilter.toLowerCase();
    if (titleFilter === "" && descriptionFilter === "") {
      setFilteredRecords(records);
      return;
    }
    let newFilteredRecords = [];
    if (titleFilter !== "") {
      newFilteredRecords = records.filter((record) =>
        record.title.toLowerCase().includes(lowerCaseTitle)
      );
    }
    if (descriptionFilter !== "" && !!newFilteredRecords.length > 0) {
      newFilteredRecords = newFilteredRecords.filter((record) =>
        record.description.toLowerCase().includes(lowerCaseDescription)
      );
    } else if (descriptionFilter !== "") {
      newFilteredRecords = records.filter((record) =>
        record.description.toLowerCase().includes(lowerCaseDescription)
      );
    }
    setFilteredRecords(newFilteredRecords);
  };

  return (
    <>
      <div className="mt-3 d-flex justify-content-center align-items-center">
        Filters
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Title
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setTitleFilter(e.target.value);
            }}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Description
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setDescriptionFilter(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="table-responsive mt-3 mb-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr
                key={record.recordId}
                onClick={() => navigateTo(`/records/${record.recordId}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{record.title}</td>
                <td>{record.description}</td>
                <td>
                  <button
                    className="btn btn-dark btn-lg mx-3 my-3"
                    onClick={(event) => {
                      event.stopPropagation();
                      setUpdatingRecord(record);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-lg"
                    onClick={(event) => {
                      event.stopPropagation();
                      onRecordDelete(record);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {updatingRecord !== null && (
          <EditRecordModal
            record={updatingRecord}
            close={closeUpdateModal}
            onRecordUpdate={onRecordUpdate}
          />
        )}
      </div>
    </>
  );
};