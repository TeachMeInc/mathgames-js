'use strict';

var _ = require('lodash').noConflict();
var MathGamesAPI = require('mathgames-js');

module.exports = {

  options: {},
  api: null,

  init: function(options) {

      var self = this;

      this.options = _.pick(options,['wrapper','api_key']);

      this.api = MathGamesAPI.getInstance({
          api_key: this.options.api_key,
          wrapper: this.options.wrapper
      });

      this.api.onSkillSelected = function() {
          console.log('SKILL_SELECTED');
          self.api.startSession();
      };

      this.api.onSessionReady = function() {
          console.log("SESSION_READY");
          self.startQuestionLoop();
      };

      this.api.onSkillChanged = function() {
          console.log("SKILL_CHANGED");
      };

      this.api.onAverageTimeChange = function() {
          console.log("AVERAGE_TIME_CHANGE");
      };

      this.onProgressClosed = function() {
          console.log("PROGRESS_CLOSED");
          self.api.endSession();
      };

      this.startGame();
  },

  startGame: function() {
      this.api.selectSkill({pool_key: 'COMPLETE'});
  },

  startQuestionLoop() {
      //100 questions, then show the progress dialog
      var self = this;
      var totalCount = 30;
      var answeredCount = 0;

      var askQuestion = function() {
        if(answeredCount < totalCount) {
          answeredCount++;
          var question = self.api.getQuestion();
          setTimeout(function() {
            var randomAnswerIndex = Math.floor(Math.random() * question.choices.length) + 1;
            var correct = self.api.answerQuestion(randomAnswerIndex);
            console.log(question);
            console.log(answeredCount + "(" + correct + ")");
            askQuestion();
          }, 1000);
        } else {
          self.api.showProgress();
        }
      };

      //start asking questions
      askQuestion();
  }

};
