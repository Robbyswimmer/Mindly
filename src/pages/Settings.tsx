import {
  IonContent,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonPage,
  IonGrid,
  IonButton,
  IonDatetime,
  IonAvatar,
  IonCard,
  IonCardContent
  } from '@ionic/react';
import React,{ useState, useCallback, useEffect } from 'react';
import {useDropzone} from 'react-dropzone'
import Menu from '../components/Menu';
import socketIOClient from "socket.io-client";
import appPages from '../components/Constants';
import '../stylesheets/Main.css';
import '../stylesheets/Settings.css';
import {useSelector, useDispatch} from 'react-redux';
import {setProfileImgUrl, signOut, closeMenu, openMenu, refresh } from '../redux/actions'
import { useHistory } from "react-router-dom";
import { useSwipeable } from 'react-swipeable';
import {updateName} from '../redux/actions'

const SettingsPage: React.FC = () => {
  const profileImgUrl = useSelector((state: any) => state.user.profileImgUrl);
  const [profileUrl, setProfileUrl] = useState(profileImgUrl);
  const [email, setEmail] = useState(useSelector((state: any) => state.user.email));
  const [firstName, setFirstName] = useState(useSelector((state: any) => state.user.firstName));
  const [lastName, setLastName] = useState(useSelector((state: any) => state.user.lastName));

  const dispatch = useDispatch();
  let history = useHistory();

  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch<any>(closeMenu('')),
    onSwipedRight: () => dispatch<any>(openMenu('')),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  useEffect(() => {
    setProfileUrl(profileImgUrl);
  });

  const submit = async () => {
    try {
      await changeInfo({
        email,
        firstName,
        lastName
      });
    } catch (e) {
    }
  }

  function changeInfo(e:any){
    const socket = socketIOClient('http://76.167.174.196:8080/');

    socket.emit('update_info', {'email': email, 'firstName': firstName, 'lastName': lastName});
    const data = {'firstName': firstName, 'lastName': lastName};
    dispatch<any>(updateName(data));
  }

  function imageHandling(binaryImg:any){
    const socket = socketIOClient('http://76.167.174.196:8080/');

    socket.on('login_status', (status) => {
        console.log(status);
    });

    socket.emit('image_upload', { data: binaryImg, email: email});

    socket.on('image_url', (data) => {
      setProfileUrl(data.url);
      dispatch<any>(setProfileImgUrl(data.url));
      socket.emit('change_profile_img_url', {url: data.url});
    });
  }

  function logOut(){
    dispatch<any>(signOut(''));
    dispatch<any>(refresh({'refresh': true}))
    history.push("/login");
  }

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        imageHandling(reader.result);
        const binaryStr = reader.result;
      }
      reader.readAsArrayBuffer(file);
    })
  }, []);
  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/jpeg',
    //maxSize: 8192,
    onDrop
  });

  return (
    <IonPage>
      <IonContent fullscreen={true} class="ion_content">
        <IonGrid>
          <div className="swipe_content" {...handlers}>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeLg="8" sizeXl="4">
                <div className="main_content">
                  <div className="top_banner settings_banner">
                    <Menu appPages={appPages}/>
                    <h1 className="header1">Settings</h1>
                  </div>
                  <IonCard class="page_content">
                    <IonCardContent>
                      <IonItem className="button_item">
                        <div {...getRootProps()} slot="end">
                          <input {...getInputProps()} />
                          {
                            <IonAvatar class="settings_avatar" >
                              <img src={profileUrl} />
                            </IonAvatar>
                          }
                        </div>
                      </IonItem>
                      <form onSubmit={(e) => { e.preventDefault(); submit();}}>
                        <IonItem>
                          <IonLabel>Email:</IonLabel>
                          <IonInput value={email} color="light" inputmode="email" type="email" class="place_holder_color" onIonChange={(e) => setEmail(e.detail.value)}></IonInput>
                        </IonItem>
                        <IonItem>
                          <IonLabel>First name:</IonLabel>
                          <IonInput value={firstName} color="light" class="place_holder_color" onIonChange={(e) => setFirstName(e.detail.value)}></IonInput>
                        </IonItem>
                        <IonItem>
                          <IonLabel >Last name:</IonLabel>
                          <IonInput value={lastName} color="light" class="place_holder_color" onIonChange={(e) => setLastName(e.detail.value)}></IonInput>
                        </IonItem>
                        <IonItem className="button_item">
                          <div slot="end">
                            <IonButton className="settings_button" color="dark" size="small" type="submit">Submit Changes</IonButton>
                          </div>
                        </IonItem>
                      </form>
                      <IonButton onClick={logOut} color="danger">Sign-out</IonButton>
                    </IonCardContent>
                  </IonCard>
                </div>
              </IonCol>
            </IonRow>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
