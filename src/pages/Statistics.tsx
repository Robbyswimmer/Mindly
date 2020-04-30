import {
    IonContent,
    IonRow,
    IonCol,
    IonItem,
    IonList,
    IonPage,
    IonGrid,
    IonCard,
    IonCardContent
    } from '@ionic/react';

import React, {useEffect, useState} from 'react';
import '../stylesheets/Main.css';
import Menu from '../components/Menu';
import appPages from '../components/Constants';
import { useSwipeable } from 'react-swipeable';
import {useDispatch, useSelector} from "react-redux";
import {closeMenu, openMenu} from '../redux/actions';
import Chart from "chart.js";
import socketIOClient from "socket.io-client";
import * as dateFns from 'date-fns';

const Statistics: React.FC = () => {
  const dispatch = useDispatch();
  var values = new Array();
  var labels = new Array();
  var pointColors = new Array();
  const[, testRefresh] = useState();
  const email = useSelector((state: any) => state.user.email);

  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch<any>(closeMenu('')),
    onSwipedRight: () => dispatch<any>(openMenu('')),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  useEffect(() => {
    loadData();
  }, []);

  function loadData(){
    const socket = socketIOClient('http://76.167.174.196:8080/');

    socket.emit('calendar_questions', {email: email});

    socket.on('30_day_answers', (data) => {
      var dateValueMap = new Map();
      const today = dateFns.startOfToday();

      const start = dateFns.sub(today, {days: 31});
      var day;
      const answersArray = Array.from(data.data);

      if(typeof answersArray[0] !== 'undefined') {
          day = dateFns.toDate(new Date(answersArray[0]["date"].replace(/-/g, '\/').replace(/T.+/, '')));
      }else{
        day = start;
      }

      answersArray.forEach(response => {
          var total = 0;

          Array.from(response["answers"]).forEach(answer => {
              total += parseInt(answer["value"]);
          });

          dateValueMap.set(response["date"], total);
        });

        while(day <= today){
          if(dateValueMap.has(dateFns.format(day, "yyyy-MM-dd"))){
            values.push(dateValueMap.get(dateFns.format(day, "yyyy-MM-dd")));
            var currTotal = dateValueMap.get(dateFns.format(day, "yyyy-MM-dd"));
            if(currTotal >= 1 && currTotal <= 5){
              pointColors.push('rgba(234, 0, 1, 1)');
            }else if(currTotal >= 6 && currTotal <= 10){
              pointColors.push('rgba(250, 153, 36, 1)');
            }else if(currTotal >= 11 && currTotal <= 15){
              pointColors.push('rgba(254, 201, 35, 1)');
            }else if(currTotal >= 16 && currTotal <= 20){
              pointColors.push('rgba(46, 209, 79, 1)');
            }else if(currTotal >= 21 && currTotal <= 25){
              pointColors.push('rgba(0, 96, 43, 1)');
            }
          }else{
            values.push(NaN)
            pointColors.push('rgba(0, 0, 0, 1)');
          }

          labels.push(dateFns.format(day, "MM-dd"));
          day = dateFns.addDays(day, 1);
        }

        loadCanvas();
        testRefresh('');
    });
    socket.on('no_answers', (data) => {
      const today = dateFns.startOfToday();
      const start = dateFns.sub(today, {days: 31});
      var day = start;

      while(day <= today){
        values.push(NaN)
        labels.push(dateFns.format(day, "MM-dd"));
        day = dateFns.addDays(day, 1);
      }

      loadCanvas();
      testRefresh('');
    });
  }

  function loadCanvas(){
    Chart.defaults.global.defaultFontColor = 'white';
    const canvas = (document.getElementById('myChart') as HTMLCanvasElement);
    const ctx = canvas.getContext('2d');

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          spanGaps: true,
          label: 'Daily Question Total Response Value (Higher is better)',
          data: values,
          lineTension: 0.0,
          backgroundColor: ['rgba(0, 0, 0, 0.0)'],
          borderColor: ['rgba(255, 255, 255, 0.5)'],
          pointBackgroundColor: pointColors,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              callback: function(tick, index, array) {
                return (index % 2) ? "" : tick;
              }
            }
          }]
        }
      }
    });
  }

  return (
    <IonPage>
      <IonContent fullscreen={true} class="ion_content">
        <IonGrid>
          <div className="swipe_content" {...handlers}>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeLg="8" sizeXl="4">
                <div className="main_content">
                  <div className="top_banner statistics_banner">
                    <Menu appPages={appPages}/>
                    <h1 className="header1">Statistics</h1>
                  </div>
                  <IonCard class="page_content">
                    <IonCardContent>
                      <canvas id="myChart" width="400" height="400"></canvas>
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


export default Statistics;
