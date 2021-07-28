import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserManagement from "./pages/Dashboard";
import User from "./pages/User/User";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <UserManagement />
        </Route>
        <Route path="/user/:userId">
          <User />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
