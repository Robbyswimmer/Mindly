# Mindly
A mental health tracking app that allows users to rate their own mental health, interface with their therapists, access critical mental health resources, and track their mental health over time.

# What is Mindly
![Mindly](/mindly-images/mindly-signin.png)
<img src="/mindly-images/mindly-signin.png" alt="Mindly" width="250"/><img src="/mindly-images/mindly-signin.png" alt="Mindly" width="250"/>

Mindly is a web / mobile app that was built with by a 5-person team during an engineering design class. The purpose of the app is to track the mental health of users and provide them with relevant statistics about their mental health, resources to help improve mental health, and instant messaging with their therapist if they have one. The app relies on users answering questions about their mental health on a daily basis, and their responses to these questions are saved to their profiles where the data is parsed and turned into useful information for the user. 

Based on the user's responses to their questions, the app can provide recommendations for resources that the user can access to improve their mental health. Additionally, if the user feels the app's standard set of questions do not fully cover their personal needs, the user can generate new questions that are automatically added to the question set for that user – questions can also be provided by a user's therapist. User's answers are judged based on two separate numerical scales used in psychology so that feedback from the app can be as accurate as possible – see "Assessing Mental Health" below. The tech stack used to build Mindly includes React Native, the Ionic Framework for React, NodeJS, Capacitor, MongoDB, and more – see "Technology Used to Build Mindly" for more information.

## Design of Mindly

## Technology Used to Build Mindly

## Core Features

## Assessing Mental Health

In order to assess mental health numerically in Mindly a custom scoring system had to be built. This scoring system is a combination of parts of two existing numerical scales used in psychology research: (1) [The Satisfaction With Life Scale (SWLS)](http://labs.psychology.illinois.edu/~ediener/SWLS.html) and, (2) the [Scale of Positive and Negative Experience (SPANE)](http://labs.psychology.illinois.edu/~ediener/SPANE.html). Using these two scales, a reasonable range of inputs can be recorded and measured on a numerical scale. 

For each question within Mindly, a 1-5 scale – where 5 is very good, and 1 is very bad – is used to judge the response of the user. Additionally, by utilizing both of these scales the user's well-being can be judged from two separate angles: 1) how satisfied they are with their life, and 2) what types of emotions they've been experiencing lately, and how strong the experienced emotions were. 

On top of both of these scales, users are also required to answer a more general, baseline question that measures a user's overall mental health and well-being. This last question is more opinion-based, but it still provides a valuable way to understand how a user is doing and it also triggers them to think more deeply about their overall mental health.


