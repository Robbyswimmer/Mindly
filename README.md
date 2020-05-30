# Mindly
A mental health tracking app that allows users to rate their own mental health, interface with their therapists, access critical mental health resources, and track their mental health over time.

# What is Mindly
<img src="https://github.com/Robbyswimmer/Mindly/blob/master/mindly-images/mindly-signin.png?raw=true" alt="Mindly" width="250" height="500"/> <img src="https://github.com/Robbyswimmer/Mindly/blob/master/mindly-images/mindly-home.JPG?raw=true" alt="Mindly" width="250" height="500"/> <img src="https://github.com/Robbyswimmer/Mindly/blob/master/mindly-images/mindly-stats.JPG?raw=true" alt="Mindly" width="250" height="500"/>

Mindly is a web / mobile app that was built by a 5-person team during an engineering design class. The purpose of the app is to track the mental health of users and provide them with relevant statistics about their mental health, resources to help improve mental health, and instant messaging with their therapist if they have one. The app relies on users answering questions about their mental health on a daily basis, and their responses to these questions are saved to their profiles where the data is parsed and turned into useful information for the user. 

Based on the user's responses to their questions, the app can provide recommendations for resources that the user can access to improve their mental health. Additionally, if the user feels the app's standard set of questions do not fully cover their personal needs, the user can generate new questions that are automatically added to the question set for that user – questions can also be provided by a user's therapist. User's answers are judged based on two separate numerical scales used in psychology so that feedback from the app can be as accurate as possible – see "Assessing Mental Health" below. The tech stack used to build Mindly includes React Native, the Ionic Framework for React, NodeJS, Capacitor, MongoDB, and more – see "Technology Used to Build Mindly" for more information.

## Design of Mindly

The design of Mindly was approached with scalability in mind. It was important to build an app that could be used by individuals, but it was also important to make sure that eventually the app could be used as an administration tool. The original idea for the app had even more integration with therapists, but due to time constraints some of those features had to be removed. After deliberating on the design for quite some time, the following design scheme was created: 

![High Level Design](https://github.com/Robbyswimmer/Mindly/blob/master/mindly-images/Screen%20Shot%202020-04-20%20at%202.01.47%20PM.png?raw=true)

This is the final design of the app that was built, and all of the features present in this design scheme were implemented. One of the advantages of this design is that it would be relatively easy to scale from this point in development. This design still allows for individual use and implementation with health care professionals, but it could be scaled for broader application if necessary. Additionally, it would simple to expand the number of resources available to users and add more question related content to the app. While the app does have a starting set of 30 questions that rotate on a daily basis, to add more questions to the service it would be as simple as inserting them into the database and the app would automatically have access to the new questions. 

## Technology Used to Build Mindly

The following core technologies were used to build Mindly:

* React Native
* React Native Ionic Framework
* NodeJS
* MongoDB
* Capacitor

In developing Mindly, it was important that the app would be cross-platform. There are only a few well developed tools that can be used to easily build cross-platform, one of which is React Native. React Native was supplemented by the Ionic Framework which has a robust component system that made developing the appearance of the app incredibly simple.  The following example is of the code it took to generate the main card on the homepage of the app:

```C++
 <IonPage>
      <IonContent fullscreen={true} class="ion_content">
        <IonGrid>
          <div className="swipe_content" {...handlers}>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeLg="8" sizeXl="4">
                <div className="main_content">
                  <div className="top_banner home_banner">
                    <Menu appPages={appPages}/>
                    <h1 className="header1">Mindly</h1>
                  </div>
                  <DailyQuote />
                  <IonCard class="page_content">
                    <IonCardContent>
                      <IonList>
                        <IonItem routerLink='/daily_questions'><IonIcon icon={clipboardOutline} slot="start"/>Daily Questionaire</IonItem>
                        <IonItem routerLink='/create_questions'><IonIcon icon={pencilOutline} slot="start"/>Create Questionaire</IonItem>
                        <IonItem routerLink='/calendar'><IonIcon icon={calendarOutline} slot="start"/>Calendar View</IonItem>
                        <IonItem routerLink='/Messenger'><IonIcon icon={mailOutline} slot="start"/>Contact Theraprist</IonItem>
                      </IonList>
                    </IonCardContent>
                  </IonCard>
                </div>
              </IonCol>
            </IonRow>
          </div>
       </IonGrid>
     </IonContent>
   </IonPage>
```
The most difficult part of development ended up being the server implementation. From the beginning MongoDB had been chosen as the favored database option, but there was a lot of questions about the best way to have the app connect to the database. Eventually a NodeJS server had to be written from scratch to handle all of the database connections. In order for this app to be published the NodeJS server would have to be migrated to AWS or something similar, but this could be executed with relative ease. 

Beyond the server issues, Capacitor was another technology that had to be utilized to make the app perform as expected. One of the virtues of Capacitor is its simple integration with Ionic, which makes it an easy choice when building cross-platform applications with Ionic. Using Capacitor, the final version of this app is capable of running on the web, iOS, and Android with no discernible performance differences, which fulfills one of our original design goals for the app.

## Core Features

* Answer questions about your current mental health
* View your previous days that in the calendar view 
* Communicate with your therapist through custom questions and instant messaging
* Create your own personal questions for monitoring your mental health
* Create a custom profile with all relevant personal information
* Access important mental health resources when you need them the most
* View the statistics page to gain a better understanding of your mental health over time

## Assessing Mental Health

In order to assess mental health numerically in Mindly a custom scoring system had to be built. This scoring system is a combination of parts of two existing numerical scales used in psychology research: (1) [The Satisfaction With Life Scale (SWLS)](http://labs.psychology.illinois.edu/~ediener/SWLS.html) and, (2) the [Scale of Positive and Negative Experience (SPANE)](http://labs.psychology.illinois.edu/~ediener/SPANE.html). Using these two scales, a reasonable range of inputs can be recorded and measured on a numerical scale. 

For each question within Mindly, a 1-5 scale – where 5 is very good, and 1 is very bad – is used to judge the response of the user. Additionally, by utilizing both of these scales the user's well-being can be judged from two separate angles: 1) how satisfied they are with their life, and 2) what types of emotions they've been experiencing lately, and how strong the experienced emotions were. 

On top of both of these scales, users are also required to answer a more general, baseline question that measures a user's overall mental health and well-being. This last question is more opinion-based, but it still provides a valuable way to understand how a user is doing and it also triggers them to think more deeply about their overall mental health.


