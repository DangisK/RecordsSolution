import React, { useState } from "react";
import RequestURL from "../utils/RequestURL";

export const RecordUpdateForm = ({ onRecordUpdate, record }) => {
  const initialFormData = Object.freeze({
    title: record.title,
    description: record.description,
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recordToUpdate = {
      title: formData.title,
      description: formData.description,
    };

    const url = `${RequestURL}/${record.recordId}`;

    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recordToUpdate),
      });
    } catch (e) {
      console.log(e);
    }

    const returnedRecord = {
      recordId: record.recordId,
      ...recordToUpdate,
    };

    onRecordUpdate(returnedRecord);
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Update Record</h1>
      <div className="mt-5">
        <label className="h3 form-label">Title</label>
        <input
          value={formData.title}
          name="title"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-4">
        <label className="h3 form-label">Description</label>
        <input
          value={formData.description}
          name="description"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">
        Submit
      </button>
      <button onClick={() => onRecordUpdate(null)} className="btn btn-secondary btn-lg w-100 mt-3">
        Cancel
      </button>
    </form>
  );
};
