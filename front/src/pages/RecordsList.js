import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecordsTable } from "../components/RecordsTable";
import RequestURL from "../utils/RequestURL";

export const RecordsList = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isRecordsLoading, setIsRecordsLoading] = useState(false);
  const navigateTo = useNavigate();

  const fetchRecords = async () => {
    setIsRecordsLoading(true);
    const url = `${RequestURL}?pageNumber=${currentPage}&pageSize=3`;
    try {
      const data = await fetch(url, {
        method: "GET",
        "Content-Type": "application/json",
        mode: "cors",
      });
      const response = await data.json();
      setRecords(response.records);
      setTotalPages(response.paginationMetadata.totalPages);
    } catch (e) {
      console.log(e);
    }
    setIsRecordsLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, [currentPage]);

  const deleteRecord = async (recordId) => {
    const url = `${RequestURL}/${recordId}`;
    try {
      await fetch(url, {
        method: "DELETE",
      });
      const updatedRecords = records.filter((record) => record.recordId !== recordId);
      setRecords(updatedRecords);
    } catch (e) {
      console.log(e);
    }
  };

  const onRecordDelete = (record) => {
    if (window.confirm(`Do you want to delete "${record.title}?`)) {
      deleteRecord(record.recordId);
    }
  };

  const onRecordUpdate = (updatedRecord) => {
    const newRecords = records.map((record) =>
      record.recordId === updatedRecord.recordId ? updatedRecord : record
    );
    setRecords(newRecords);
  };

  if (isRecordsLoading) return;

  return (
    <div className="w-100">
      <h1 className="mt-3">Records by Dangis Kažukauskas</h1>
      <div className="mt-3">
        <button
          className="btn btn-primary btn-lg mt-4 w-100"
          onClick={() => navigateTo("/records")}
        >
          Create
        </button>
      </div>
      {records.length > 0 && (
        <RecordsTable
          records={records}
          onRecordDelete={onRecordDelete}
          onRecordUpdate={onRecordUpdate}
        />
      )}
      <div className="d-flex justify-content-center align-items-center">
        {currentPage > 1 && (
          <button
            className="btn btn-primary col-sm-2"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
        )}
        <span>{`Page ${currentPage}`}</span>
        {currentPage < totalPages && (
          <button
            className="btn btn-primary col-sm-2"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
