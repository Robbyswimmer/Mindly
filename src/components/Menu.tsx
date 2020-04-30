import SideNav, { NavItem } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon
  } from '@ionic/react';
import React, {useEffect}from 'react';
import { Plugins } from '@capacitor/core';
import {useSelector} from 'react-redux';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import { AppPage } from '../declarations';
import './Menu.css';
import {useDispatch} from "react-redux";
import {closeMenu, openMenu} from '../redux/actions'
interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}
const { Filesystem } = Plugins;


const Menu: React.FunctionComponent<MenuProps> = ({ appPages }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const expandedState = useSelector((state: any) => state.user.menuOpen);
  useEffect(() => {
    console.log('mounted');
    dispatch<any>(closeMenu(''));
  }, []);

  function newPage(url){
    dispatch<any>(closeMenu(''));
    history.push(url);
  }

  function foo(){
    if(expandedState){
      dispatch<any>(closeMenu(''));
    }else{
      dispatch<any>(openMenu(''));
    }

  }
  return (
      <SideNav expanded={expandedState}>
       <SideNav.Toggle  onClick={foo}/>
       <SideNav.Nav defaultSelected="home" expanded={expandedState}>
        {appPages.map((appPage, index) => {
            return (
           <NavItem eventKey={appPage.title}>
             <IonItem class="menu_item" >
               <IonButton onClick={(e) => newPage(appPage.url)} routerDirection="none" fill="clear" expand="full" class="menu_button">
                 <IonIcon slot="start" icon={appPage.icon} />
                 <IonLabel>{appPage.title}</IonLabel>
               </IonButton>
             </IonItem>
           </NavItem>
         );
       })}
       </SideNav.Nav>
   </SideNav>
  );
};


export default withRouter(Menu);
