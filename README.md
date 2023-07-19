# Speech-Recognition
Basic speech recognition tool powered by web speech api. Works in ONLY in Chrome because of Google Speech API.

To use it just open the linked site and press the 'start' button. It just works.

## Buttons functions

Start button: starts voice recognition

Stop button: stops recognition

Copy: copies results of the recognition to the clipboard

Clear: deletes results of the recognition

Change to...: changes language, if current language is Russian then to English and vice versa

## Files

index.html: base html file

index.css: base css file

index.js: electron file, currently useless because of the google api problem

main.js: base js file

## Technologies

I used web speech api (https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to recognise speech. 
Also I builded an app in electron, but as I said previously it doesn't really matter. 

## Problem with google api

In Chrome google speech api works natively, however electron uses chromium in which this api don't work initially.
To make it work, I'd have to set enviroment variables on my device. Unfortunately I can't do it because it's not
for free and even if i'd like to pay, google doesn't accept Russian cards.
