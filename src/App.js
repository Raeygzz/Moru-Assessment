import React from "react";

import "./App.css";
import { Dashboard } from "./pages";

const App = (props) => {
  const {} = props;

  return (
    <>
      <p className="center">
        <b>Dashboard</b>
      </p>

      <Dashboard />
    </>
  );
};

export default App;
