      (function (document, window, undefined) {

  'use strict';

  // Vars
  var faqSection = $('.js-faq'),
    faqQuestion = $('.js-faq-question'),
    faqAnswer = $('.js-faq-answer'),
    showOneAnswerAtATime = false;

  /**
   * Save question focus
   */
  var saveFocus = function (elem, thisSectionFaqQuestions) {

    // Reset other tab attributes
    thisSectionFaqQuestions.each(function () {
      $(this).attr('tabindex', '-1');
      $(this).attr('aria-selected', 'false');
    });

    // Set this tab attributes
    elem.attr({
      'tabindex': '0',
      'aria-selected': 'true'
    });

  };

  /**
   * Show answer on click
   */
  var showAnswer = function (elem, thisSectionFaqQuestions) {
    var thisFaqAnswer = elem.next();
    
    // Save focus
    saveFocus(elem, thisSectionFaqQuestions);

    // Set this tab attributes
    if (thisFaqAnswer.hasClass('active')) {
      // Hide answer
      thisFaqAnswer.removeClass('active');      
      elem.attr('aria-expanded', 'false');      
      thisFaqAnswer.attr('aria-hidden', 'true');
    } else {
      if (showOneAnswerAtATime) {
        // Hide all answers
        faqAnswer.removeClass('active').attr('aria-hidden', 'true');
        faqQuestion.attr('aria-expanded', 'false');
      }
      
      // Show answer
      thisFaqAnswer.addClass('active');      
      elem.attr('aria-expanded', 'true');      
      thisFaqAnswer.attr('aria-hidden', 'false');
    }
  };

  /**
   * Keyboard interaction
   */
  var keyboardInteraction = function (elem, e, thisSectionFaqQuestions) {
    var keyCode = e.which,
      nextQuestion = elem.next().next().is('dt') ? elem.next().next() : false,
      previousQuestion = elem.prev().prev().is('dt') ? elem.prev().prev() : false,
      firstQuestion = elem.parent().find('dt:first'),
      lastQuestion = elem.parent().find('dt:last');

    switch(keyCode) {
    // Left/Up
    case 37:
    case 38:
      e.preventDefault();
      e.stopPropagation();

      // Check for previous question
      if (!previousQuestion) {
        // No previous, set focus on last question
        lastQuestion.focus();
      } else {
        // Move focus to previous question
        previousQuestion.focus();
      }

      break;

    // Right/Down
    case 39:
    case 40:
      e.preventDefault();
      e.stopPropagation();

      // Check for next question
      if (!nextQuestion) {
        // No next, set focus on first question
        firstQuestion.focus();
      } else {
        // Move focus to next question
        nextQuestion.focus();
      }

      break;

    // Home
    case 36:
      e.preventDefault();
      e.stopPropagation();

      // Set focus on first question
      firstQuestion.focus();
      break;

    // End
    case 35:
      e.preventDefault();
      e.stopPropagation();

      // Set focus on last question
      lastQuestion.focus();
      break;

    // Enter/Space
    case 13:
    case 32:
      e.preventDefault();
      e.stopPropagation();

      // Show answer content
      showAnswer(elem, thisSectionFaqQuestions);
      break;
    }

  };

  /**
   * On load, setup roles and initial properties
   */
  
  // Each FAQ Question
  faqQuestion.each(function (i) {
    $(this).attr({
      'id': 'faq-question-' + i,
      'role': 'tab',
      'aria-controls': 'faq-answer-' + i,
      'aria-expanded': 'false',
      'aria-selected': 'false',
      'tabindex': '-1'
    });
  });

  // Each FAQ Answer
  faqAnswer.each(function (i) {
    $(this).attr({
      'id': 'faq-answer-' + i,
      'role': 'tabpanel',
      'aria-labelledby': 'faq-question-' + i,
      'aria-hidden': 'true'
    });
  });

  // Each FAQ Section
  faqSection.each(function () {
    var $this = $(this),
      thisSectionFaqQuestions = $this.find('.js-faq-question');

    // Set section attributes
    $this.attr({
      'role': 'tablist',
      'aria-multiselectable': 'true'
    });

    thisSectionFaqQuestions.each(function (i) {
      var $this = $(this);

      // Make first tab clickable
      if (i === 0) {
        $this.attr('tabindex', '0');
      }

      // Click event
      $this.on('click', function () {
        showAnswer($(this), thisSectionFaqQuestions);
      });

      // Keydown event
      $this.on('keydown', function (e) {
        keyboardInteraction($(this), e, thisSectionFaqQuestions);
      });

      // Focus event
      $this.on('focus', function () {
        saveFocus($(this), thisSectionFaqQuestions);
      });
    });
  });

})(document, window  );
