import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestURL from "../utils/RequestURL";

export const RecordCreate = () => {
  const initialFormData = Object.freeze({
    title: "",
    description: "",
  });
  const [formData, setFormData] = useState(initialFormData);
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recordToCreate = {
      title: formData.title,
      description: formData.description,
    };

    try {
      await fetch(RequestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recordToCreate),
      });
      navigateTo("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="w-100 px-5">
      <button onClick={() => navigateTo("/")} className="btn btn-primary btn-lg w-12 mt-3">
        Back To Record List
      </button>
      <h1 className="mt-5">Create New Record</h1>
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
      <button
        onClick={handleSubmit}
        className="btn btn-dark btn-lg w-100 mt-5"
        disabled={formData.title === "" || formData.description === ""}
      >
        Submit
      </button>
    </form>
  );
};
