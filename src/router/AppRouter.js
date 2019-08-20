import React from "react";
import { BrowserRouter, Route, Switch, Link , NavLink } from "react-router-dom";
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import Header from '../components/Header'
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NoMatch from '../components/NoMatch';  
 
  
  

  const AppRouter = () => {
      return ( <BrowserRouter>
        <div>
        <Header />
          <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>);

  }

  export default AppRouter;