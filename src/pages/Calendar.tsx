import {
  IonContent,
  IonRow,
  IonCol,
  IonPage,
  IonGrid,
  } from '@ionic/react';

import React , {useState, useEffect} from 'react';
import "../stylesheets/Calendar.css";
import '../stylesheets/Main.css';
import Menu from '../components/Menu';
import appPages from '../components/Constants';
import * as dateFns from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import {useSelector, useDispatch} from "react-redux";
import {closeMenu, openMenu} from '../redux/actions'
import socketIOClient from "socket.io-client";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [initialAnswers, setInitialAnswers ] = useState([{}]);
  const [dayValueMap, setDayValueMap ] = useState( new Map());
  const[, testRefresh] = useState();
  const email = useSelector((state: any) => state.user.email);

  const dispatch = useDispatch();
  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch<any>(closeMenu('')),
    onSwipedRight: () => dispatch<any>(openMenu('')),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  useEffect(() => {
    loadAnswers();
  });

  function loadAnswers(){
    const socket = socketIOClient('http://76.167.174.196:8080/');
    socket.emit('calendar_questions', {email: email});

    socket.on('30_day_answers', (data) => {
      Array.from(data.data).forEach(response => {
          var total = 0;
          Array.from(response["answers"]).forEach(answer => {
              total += parseInt(answer["value"]);
          });
          setDayValueMap(dayValueMap.set(response["date"], total));
        });
        cells();
        testRefresh('');
    });

  }

  const header = () => {
    const dateFormat = "MMMM yyyy";
    return (
       <div className="header row flex-middle">
          <div className="column col-start">
             <div className="icon" onClick={prevMonth}>
                chevron_left
             </div>
          </div>
          <div className="column col-center">
             <span>{dateFns.format(currentDate, dateFormat)}</span>
          </div>
          <div className="column col-end">
             <div className="icon" onClick={nextMonth}>
                chevron_right
             </div>
          </div>
       </div>
       );
  };

  const days = () => {
    const dateFormat = "ddd";
    const days = [];
    let startDate = dateFns.startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
          days.push(
             <div className="column col-center" key={i}>
             {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
             </div>
          );
       }
       return <div className="days row">{days}</div>;
  };

  const cells = () => {
    const monthStart = dateFns.startOfMonth(currentDate);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
       for (let i = 0; i < 7; i++) {

         var bottom_border = "";
         if(dayValueMap.get(dateFns.format(day, "yyyy-MM-dd"))){
           var value = dayValueMap.get(dateFns.format(day, "yyyy-MM-dd"));

           if(value >= 1 && value <= 5){
             bottom_border = "red";
           }else if(value >= 6 && value <= 10){
             bottom_border = "orange";
           }else if(value >= 11 && value <= 15){
             bottom_border = "yellow";
           }else if(value >= 16 && value <= 20){
             bottom_border = "light_green";
           }else if(value >= 21 && value <= 25){
             bottom_border = "dark_green";
           }
         }else{

         }
         formattedDate = dateFns.format(day, dateFormat);
         const cloneDay = day;
         days.push(
            <div
             className={`column cell ${!dateFns.isSameMonth(day, monthStart)
             ? "disabled" : dateFns.isSameDay(day, selectedDate)
             ? "selected" : "" } ${bottom_border}`}
             key = {dateFns.getDate(day)}
             >
             <span className="number">{formattedDate}</span>
           </div>
          );
         day = dateFns.addDays(day, 1);
        }
        rows.push(
          <div className="row" key = {dateFns.getDate(day)}> {days} </div>
        );
       days = [];
     }
     return <div className="body">{rows}</div>;
  }

  const nextMonth = () => {
     setCurrentDate(dateFns.addMonths(currentDate, 1));
  };

  const prevMonth = () => {
     setCurrentDate(dateFns.subMonths(currentDate, 1));
  };

  const onDateClick = day => {
    setSelectedDate(day);
  }

  return (
    <IonPage>
      <IonContent class="ion_content">
        <IonGrid>
          <div className="swipe_content" {...handlers}>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeLg="8" sizeXl="4">
                <div className="main_content">
                  <Menu appPages={appPages}/>
                  <div className="calendar">
                    <div>{header()}</div>
                    <div>{days()}</div>
                    <div>{cells()}</div>
                  </div>
                </div>
              </IonCol>
            </IonRow>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Calendar;
