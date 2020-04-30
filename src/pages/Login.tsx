import {
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon
  } from '@ionic/react';
import { eye, eyeOff} from 'ionicons/icons';
import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import '../stylesheets/Login.css';
import {setUserState, refresh} from '../redux/actions'
import socketIOClient from "socket.io-client";
import {useDispatch, useSelector} from "react-redux"
const Login: React.FC = () => {
  let history = useHistory();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errorLogin, setLoginErrorStatus] = useState(false);
  const [ errorDatabaseConnect, setDatabaseConnectStatus] = useState(false);
  const [ formErrors, setFormErrors ] = useState({});
  const [ passwordIcon, setPasswordIcon ] = useState(eye);
  const [ currentPV, setCurrentPV ] = useState(false);
  const needsRefresh = useSelector((state: any) => state.user.refresh);

  const dispatch = useDispatch();
  const hidden = 'password';
  const shown = 'text';

  useEffect(() => {
    if(needsRefresh){
      dispatch<any>(refresh({'refresh': false}));
      window.location.reload();
    }
  });
  const submit = async () => {
    try {
      await login({
        email,
        password
      });
    } catch (e) {
      setFormErrors(e);
    }
  }

  function login(e:any){
    const socket = socketIOClient('http://76.167.174.196:8080/');

    socket.on('connect', () => {
        setDatabaseConnectStatus(false);
    });

    socket.on('connect_error', (error) => {
        setDatabaseConnectStatus(true);
        setLoginErrorStatus(false);
    });

    socket.emit('client_connect', { email: e.email, password: e.password });

    socket.on('login_status', (data) => {
        if(data.status === 'true'){
          setLoginErrorStatus(false);
        }else{
          setLoginErrorStatus(true);
        }
    });

    socket.on('user_info', (data) => {
      dispatch<any>(setUserState(data.user[0]));
      history.push("/home");
    });
}
  const LoginError = () => {
    if(errorLogin){
      return (<div className='error_message'>Error logging in. Please check email and password.</div>)
    }else{
      return <div></div>
    }
  }

  const DatabaseError = () => {
    if(errorDatabaseConnect){
      return (<div className='error_message'>Error connecting to database. Please try again later.</div>)
    }else{
      return <div></div>
    }
  }

  function togglePassword(){
    if(passwordIcon == eye){
      setPasswordIcon(eyeOff);
      setCurrentPV(true);
    }else{
      setPasswordIcon(eye);
      setCurrentPV(false);
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen={true} class="login_ion_content">
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeLg="8" sizeXl="4" class="login_page">
              <div className="login_main_content">
                <h1 className="login_header"> Mindly </h1>
                <form onSubmit={(e) => { e.preventDefault(); submit();}}>
                  <IonItem class="email_item login_item">
                    <IonLabel class="input_label" position="floating"color="light">Email</IonLabel>
                    <IonInput type="email"color="light"inputmode="email" value={email} onIonChange={(e) => setEmail(e.detail.value)}></IonInput>
                  </IonItem>
                  <IonItem class="login_item">
                    <IonLabel position="floating"color="light" class="password_with_icon input_label">Password</IonLabel>
                    <IonInput class="password_with_icon" type={currentPV ? shown : hidden} color="light" value={password} onIonChange={(e) => setPassword(e.detail.value)}></IonInput>
                    <IonIcon onClick={togglePassword} slot="end"class="password_icon" icon={passwordIcon}/>
                  </IonItem>
                  <LoginError/>
                  <DatabaseError/>
                  <IonButton className="login_buttons" expand="block" size="small" type="submit">Log-In</IonButton>
                </form>
                <IonButton className="login_buttons" expand="block" color="medium" size="small" routerLink="/sign_up">Sign-Up</IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
