# mathgames-js

MathGames API for Javascript

## Install

#### NPM

```
npm install mathgames-js
```

#### CDN

The Math Games APi is also available from CDN.

javascript: https://cdn.mathgames.com/api/dist/latest/mathgames-api.js

css: https://cdn.mathgames.com/api/dist/latest/mathgames-api.css

## Usage

This snippet uses the CDN configuration, you can also include the api as a module in your game. For example: 
```
var api = require('mathgames-js');
```

#### example HTML

```
<html>
  <head>
     <link rel="stylesheet" type="text/css" href="https://cdn.mathgames.com/api/dist/latest/mathgames-api.css">
  </head>
  <body>
    <div id="mathgames-api-wrapper">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
    </div>
  </body>
  <link rel="stylesheet" type="text/css" href="https://cdn.mathgames.com/api/dist/latest/mathgames-api.js">
</html>
```

#### example JS

```    
      //get instance
      var question = null;
      var api = MathGamesAPI.getInstance({
        wrapper: document.getElementById('mathgames-api-wrapper'),
        api_key: '<api-key>'
      });
      
      //listen to events
      api.on(this.api.SESSION_READY, function() {
        ...
        question = api.getQuestion();
      });
      
      //select skill (must be called before startSession);
      api.selectSkill({pool_key: 'COMPLETE'});
      
      //answer a question
      gameApp.onAnswer(function(index) {
        var correct = api.answerQuestion(index);
        //handle correct or incorrect answer in game
        question = api.getQuestion(); //get the next question
      });

```

## Methods

| Methods        | Parameters                                           | Returns                                 | Description                             |
|----------------|------------------------------------------------------|-----------------------------------------|-----------------------------------------|
| getInstance    | `{ api_key: <string>, wrapper: <DOMElement> }`       |  A new instance of the MathGames API    | The wrapper is a DOMElement which wraps the game canvas and is used to add api interface elements over the canvas. |

| Methods        | Parameters                                           | Returns                                 | Description                             |
|----------------|------------------------------------------------------|-----------------------------------------|-----------------------------------------|
| selectSkill    | -                                                    | -                                       | Display the select skill dialog to the user                   |
| startSession   | `{ pool_key: <string>}`                              | -                                       | Starts the session. Requires a pool_key (generally 'COMPLETE').  startSession should only be called after the SKILL_SELECTED event. |
| getQuestion    | -                                                    | QuestionObject *see notes below*        | Returns a new question.                 |
| answerQuestion | index: *number*                                      | -                                       | The index parameter is the index of the question choice that was answered |
| showProgress   | -                                                    | -                                       | Display the progress dialog             |
| endSession     | -                                                    | -                                       | Ends the session.                       |

## Events

| Event          | Description                                          |
|----------------|------------------------------------------------------|
| SKILL_SELECTED   | The user has selected a skill, startSession can be called                             |
| SESSION_READY    | Session is ready.  getQuestion can be called.                                                    |
| SKILL_CHANGED    | -                                                    |
| PROGRESS_CLOSED | The user has closed the progress dialog                                     |
| AVERAGE_TIME_CHANGE   | The average time has changed |


## Question Object

The question object has the image data needed to display the question using the following structure:

```
{
    display: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO8AAABlCAYAAAClW7QHAAASbElEQVR4Xu2de...",
    choices: [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABDCAYAAAA735O5AAAF50lEQVR4Xu1b633bRgwHKM...",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABDCAYAAAA735O5AAAFTklEQVR4Xu2b33nbNhDA7y...",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABDCAYAAAA735O5AAAFDklEQVR4Xu2b0XnbOAzHAV..."
    ]
}
```

The display image is for the the display of the question and the choices image array are used for choice display.  When the user selects a choice in game and the answerQuestion method is called, the index should match the index of the image in the choices array.




