$(document).ready(() => {
  /*Global Variables*/
  let breakLength = 5;
  let sessionLength = 25;
  let seconds;
  let minutes;  
  /*sessionTimer will be assigned to a function that counts down the session time - the variable needs to be global so that Reset can access it*/
  let sessionTimer;
  
  /*Arbitrary date, set time as 9.25am - countdown will be to 9am*/
  let startTime = new Date(1991, 6, 31, 9, 25, 0);
  
  /*Format to show minutes and seconds only*/
  let timeString = startTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit'});  
  $('#time-left').html(timeString);
  
  
  /*Decrease Break Length*/
  $('#break-decrement').on('click', () => {
    if ($('#start_stop').hasClass('active') === false) {
      if (breakLength > 1) {
        breakLength -= 1;
        $('#break-length').html(breakLength);      
      }      
   }
  });

  /*Increase Break Length*/
  $('#break-increment').on('click', () => {
    if ($('#start_stop').hasClass('active') === false) {
      if (breakLength < 60) {
        breakLength += 1;
        $('#break-length').html(breakLength);      
      }      
    }
  });  
  
  /*Decrease Session Length*/
  $('#session-decrement').on('click', () => {
    if ($('#start_stop').hasClass('active') === false) {
      if (sessionLength > 1) {
        sessionLength -= 1;
        minutes = sessionLength;
        seconds = 0;
        startTime.setMinutes(minutes, seconds);
        timeString = startTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit'});      
        $('#time-left').html(timeString);
        $('#session-length').html(sessionLength);      
      }      
    }
  });

  /*Increase Session Length*/
  $('#session-increment').on('click', () => {
    if ($('#start_stop').hasClass('active') === false) {
      if (sessionLength < 60) {
        sessionLength += 1;     
      }   
      
      if($('#timer-label').html().includes('Session')) {
        minutes = sessionLength;
        seconds = 0;
        startTime.setMinutes(minutes, seconds);
        timeString = startTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit'});      
        if (sessionLength !== 60) {
          $('#time-left').html(timeString);           
        } else {
          $('#time-left').html('60:00');
        }
       
      }      
        $('#session-length').html(sessionLength);      
    }
  });   
  
  /*Reset*/
  $('#reset').on('click', () => {
    /*Stop and rewind audio*/
    /*This website was useful:
    https://codesamplez.com/programming/control-html5-audio-with-jquery*/
    $('#beep').trigger('pause');
    $('#beep').prop('currentTime', 0);
    
    /*If a session is in progress, stop it*/
    clearInterval(sessionTimer);
    
    /*If timer was paused, remove the class*/
    if ($('#start_stop').hasClass('pause')) {
      $('#start_stop').removeClass('pause');     
    }
    
    /*If timer was active, remove the class*/
    if ($('#start_stop').hasClass('active')) {
      $('#start_stop').removeClass('active');     
    }
    
    /*Reset values*/
    $('#timer-label').html('Session');
    breakLength = 5;
    sessionLength = 25;
    startTime.setMinutes(sessionLength, 0);
    timeString = startTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit'});       
    $('#time-left').html(timeString);     
    
    $('#break-length').html(breakLength);
    $('#session-length').html(sessionLength);
  });   
  
  
 /*Start/Stop*/ 
 /*This site was very helpful https://www.w3schools.com/howto/howto_js_countdown.asp*/
  $('#start_stop').on('click', () => {
    /*Toggle active class to determine whether it is playing or pausing*/
    $('#start_stop').toggleClass('active');
    
    /*Play*/
    if ($('#start_stop').hasClass('active')) {
      
      if ($('#start_stop').hasClass('pause')) {
        $('#start_stop').removeClass('pause');
      } else {
          /*Display time straight away*/
          seconds = 0;
          minutes = sessionLength;
          startTime.setMinutes(minutes, seconds);      
      }
          /*Decrease time by 1 second every second*/
          sessionTimer = setInterval(function() {
            seconds -= 1;
            startTime.setSeconds(seconds);
            /*Change to session/break*/
            if (seconds === -1 && minutes === 0) {
              
                if ($('#timer-label').html().includes('Session')) {
                  $('#timer-label').html('Break');

                  seconds = 0;
                  minutes = breakLength;

                  startTime.setHours(9, minutes, seconds);

                } else if ($('#timer-label').html().includes('Break')) {
                 // $('#beep').trigger('play');
                  $('#timer-label').html('Session');
                  seconds = 0;
                  minutes = sessionLength;

                  startTime.setHours(9, minutes, seconds);            
                } 
            } else if (seconds === -1 && minutes !== 0) {
              seconds = 59;
              minutes -= 1;
              startTime.setMinutes(minutes, seconds);              
            }

            /*Display time left*/
          timeString = startTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit'});  
          $('#time-left').html(timeString);  
            
            /*If at end of session/break, play audio*/
          if (timeString === '00:00') {
            $('#beep').trigger('play');
          }  
          },
            1000);       
    }
    
    /*Pause*/
    else {
      clearInterval(sessionTimer);
      $('#start_stop').addClass('pause');
    }
    
  
  });
  
});
