import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BarGraph from "./pages/BarGraph";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import AddExpense from "./expense/AddExpense";
import EditExpense from "./expense/EditExpense";
import ViewExpense from "./expense/ViewExpense";
import LineGraph from "./pages/LineGraph";

function App() {
  return (
    <div className="App">

      {/* Routes all the pages to a URL */}
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/addexpense/:id" element={<AddExpense />} />
          <Route exact path="/editexpense/:id" element={<EditExpense />} />
          <Route exact path="/viewexpense/:id" element={<ViewExpense />} />
          <Route exact path="/bargraph/:id" element={<BarGraph />} />
          <Route exact path="/linegraph/:id" element={<LineGraph />} />
        </Routes>
      </Router>
    </div >
  );
}
export default App;