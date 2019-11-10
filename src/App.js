import React, { Component } from "react";

import Header from "./components/Header";
import SelectionBar from "./components/SelectionBar";
import CalendarPersonal from "./components/CalendarPersonal";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <SelectionBar />
        <CalendarPersonal />
      </div>
    );
  }
}

export default App;
