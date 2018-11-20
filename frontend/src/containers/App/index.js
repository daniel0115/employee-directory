import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EmployeeListContainer from "../EmployeeListContainer";
import EmployeeDetailContainer from "../EmployeeDetailContainer";
import ReportersContainer from "../ReportersContainer";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact={true} component={EmployeeListContainer} />
          <Route
            path="/employee/:id"
            exact={true}
            component={EmployeeDetailContainer}
          />
          <Route
            path="/employee/reporters/:id"
            exact={true}
            component={ReportersContainer}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
