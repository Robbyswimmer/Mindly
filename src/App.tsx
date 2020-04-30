import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Sign_Up';
import Resources from './pages/Resources';
import Settings from './pages/Settings';
import Calendar from './pages/Calendar';
import DailyQuestions from './pages/DailyQuestions';
import CreateQuestions from './pages/CreateQuestions';
import Messenger from './pages/Messenger'
import Statistics from './pages/Statistics'
/* <Menu appPages={appPages} /> */
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <IonRouterOutlet id="main">
          <Route path="/login" component={Login} exact={true} />
          <Route path="/sign_up" component={SignUp} exact={true} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/resources" component={Resources} exact={true} />
          <Route path="/settings" component={Settings} exact={true} />
          <Route path="/calendar" component={Calendar} exact={true} />
          <Route path="/settings" component={Settings} exact={true} />
          <Route path="/daily_questions" component={DailyQuestions} exact={true} />
          <Route path="/create_questions" component={CreateQuestions} exact={true} />
          <Route path="/messenger" component={Messenger} exact={true} />
          <Route path="/Statistics" component={Statistics} exact={true} />
          <Route path="/" render={() => <Redirect to="/login"/> } exact={true} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
