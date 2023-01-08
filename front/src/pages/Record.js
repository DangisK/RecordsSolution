import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RequestURL from "../utils/RequestURL";

export const Record = () => {
  const [record, setRecord] = useState([]);
  const [isRecordsLoading, setIsRecordsLoading] = useState(false);
  const navigateTo = useNavigate();
  const { recordId } = useParams();

  const fetchRecord = async () => {
    const url = `${RequestURL}/${recordId}`;
    setIsRecordsLoading(true);
    try {
      const data = await fetch(url, {
        method: "GET",
      });
      const response = await data.json();
      setRecord(response);
    } catch (e) {
      console.log(e);
    }
    setIsRecordsLoading(false);
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  return (
    <div>
      <button onClick={() => navigateTo("/")} className="btn btn-primary btn-lg w-12 mt-3">
        Back To Record List
      </button>
      <h1 className="display-5 mt-4">
        <strong>Title: {record.title}</strong>
      </h1>
      <p className="display-6">Id: {record.recordId}</p>
      <p className="display-6">Description: {record.description}</p>
    </div>
  );
};
