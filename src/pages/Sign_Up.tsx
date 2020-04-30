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
  IonCard,
  IonCardContent,
  IonIcon
  } from '@ionic/react';
import React, { useState } from 'react';
import { eye, eyeOff} from 'ionicons/icons';
import socketIOClient from "socket.io-client";
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux"
import {setUserState} from '../redux/actions'
import '../stylesheets/Login.css';
import '../stylesheets/Sign_Up.css';

const SignUp: React.FC = () => {
  let history = useHistory();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ formErrors, setFormErrors ] = useState({});
  const [ errorDuplicateUser, setDuplicateUserStatus] = useState(false);
  const [ currentPV, setCurrentPV ] = useState(false);
  const [ passwordIcon, setPasswordIcon ] = useState(eye);
  const dispatch = useDispatch();
  const hidden = 'password';
  const shown = 'text';

  const submit = async () => {
    try {
      await signup({
        email,
        password,
        firstName,
        lastName
      });
    } catch (e) {
      setFormErrors(e);
    }
  }

  function signup(e:any){
    const socket = socketIOClient('http://76.167.174.196:8080/');
    socket.emit('insert_client', { email: e.email, password: e.password, firstName: e.firstName, lastName: e.lastName });
    socket.on('duplicate_user', (status) => {
      if(status.isDuplicate === 'true'){
        setDuplicateUserStatus(true);
      }else{
        setDuplicateUserStatus(false);
        socket.emit('client_connect', { email: e.email, password: e.password });
      }
    });

    socket.on('insert_status', (status) => {
        console.log(status);
    });

    socket.on('user_info', (data) => {
      dispatch<any>(setUserState(data.user[0]));
      history.push("/home");
    });
  }

  const DuplicateUser = () => {
    if(errorDuplicateUser){
      return (<div className='error_message'>That email is already taken.</div>)
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
            <IonCol size="12" sizeLg="8" sizeXl="4" class="sign_up_page">
              <div className="login_main_content">
                <h1 className="sign_up_header">Sign-Up</h1>
                <IonCard class="page_content transparent">
                  <IonCardContent>
                    <form onSubmit={(e) => { e.preventDefault(); submit();}}>
                      <IonItem>
                        <IonLabel class="input_label" position="floating"color="light">Email</IonLabel>
                        <IonInput color="light" value={email} onIonChange={(e) => setEmail(e.detail.value)}></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel class="input_label" position="floating"color="light">Password</IonLabel>
                        <IonInput type={currentPV ? shown : hidden} color="light" value={password} onIonChange={(e) => setPassword(e.detail.value)}></IonInput>
                        <IonIcon onClick={togglePassword} slot="end"class="password_icon" icon={passwordIcon}/>
                      </IonItem>
                      <IonItem>
                        <IonLabel class="input_label" position="floating"color="light">First name</IonLabel>
                        <IonInput color="light" value={firstName} onIonChange={(e) => setFirstName(e.detail.value)}></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel class="input_label" position="floating"color="light">Last name</IonLabel>
                        <IonInput color="light" value={lastName} onIonChange={(e) => setLastName(e.detail.value)}></IonInput>
                      </IonItem>
                      <DuplicateUser/>
                      <IonButton color="light" routerLink="/login">Back</IonButton>
                      <IonButton type="submit">Sign-Up</IonButton>
                    </form>
                  </IonCardContent>
                </IonCard>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
