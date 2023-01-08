import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Record } from "./pages/Record";
import { RecordCreate } from "./pages/RecordCreate";
import { RecordsList } from "./pages/RecordsList";

function App() {
  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<RecordsList />} />
              <Route path="/records/:recordId" element={<Record />} />
              <Route path="/records" element={<RecordCreate />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
