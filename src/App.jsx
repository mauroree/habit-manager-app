import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/layout/PrivateRoute'; // Seu componente PrivateRoute

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Habits from './components/habits/Habits';
import Medications from './components/medications/Medications';
import HabitForm from './components/habits/HabitForm';
import MedicationForm from './components/medications/MedicationForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/habits" component={Habits} />
            <PrivateRoute path="/medications" component={Medications} />
            <PrivateRoute path="/habit/new" component={HabitForm} />
            <PrivateRoute path="/medication/new" component={MedicationForm} />
            <Route render={() => <h1>404 Not Found</h1>} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
