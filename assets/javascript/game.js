'use strict';
$(document).ready(function() {

  const char1 = 'van_kenobi';
  const char2 = 'luke_skywalker';
  const char3 = 'darth_siditious';
  const char4 = 'darth_maul';
  
  let mychar;
  let hp_mychar;
  let pw_mychar;

  let defender;
  let hp_defender;
  let pw_defender;

  let attackCount = 1;
  
  $(document).on('click','.char', function() {
    $(this).siblings().appendTo('#enemies').attr('class', 'enemy');
    $(this).appendTo('#your-character').attr('class', 'mychar');
    setMyCharacter();
  });

  $(document).on('click', '.enemy', function () {
    
    if ($('.defender').length === 0) {
      $(this).appendTo('.defender-sec').attr('class', 'defender');
      setDefender();
      $('.messages').text('');
    } 
  });

  $(document).on('click','#attack', function() {
      if ($('.defender').length > 0) {
        /* Check for player's loss and if yes give an option to reset and play again */
        if (checkForLoss()) {
          $('#attack').remove();
          $('.messages').text('');
          $('.messages').append('You have been defeated, click reset to play again');
          $('.messages').append('</br>');
          $('.messages').append('<button id="reset" class="button">Reset</button>');
        } else {
          iAttack();
          if (checkForDefenderDefeat()) {
            $('.messages').append(`You have defeated ${defender.split('_')[0]}  ${defender.split('_')[1]}, select another defender`);
            $('.defender').remove();
            if (checkForAllEnemiesDefeated()) {
              $('.messages').text('');
              $('.messages').append('You won, click reset to play again');
              $('.messages').append('</br>');
              $('.messages').append('<button id="reset" class="button">Reset</button>');
            }
          } else {
            defenderAttack(); 
          }
        }
      } else {
        $('.messages').text('You must select a character, and a defender');
      }
  });


  const setMyCharacter = function() {
    mychar = $('.mychar').attr('value');
    if (mychar === char1) {
        pw_mychar = 8;
        hp_mychar = 120;
    } else if (mychar === char2) {
        pw_mychar = 5;
        hp_mychar = 100;
    } else if (mychar === char3) {
        pw_mychar = 20;
        hp_mychar = 150;
    } else {
        pw_mychar = 25;
        hp_mychar = 180;
    }
  }

  const setDefender = function() {
    defender = $('.defender').attr('value');
    if (defender === char1) {
        pw_defender = 8;
        hp_defender = 120;
    } else if (defender === char2) {
        pw_defender = 5;
        hp_defender = 100;
    } else if (defender === char3) {
        pw_defender = 20;
        hp_defender = 150;
    } else {
        pw_defender = 25;
        hp_defender = 180;
    }
  }

  const iAttack = function() {
    hp_defender = hp_defender - (pw_mychar * attackCount);
    updateHealthPointDefender();
    $('.messages').text('');
    $('.messages').append(`You attacked ${defender.split('_')[0]}  ${defender.split('_')[1]} for ${eval(pw_mychar * attackCount)} damage.`);
    $('.messages').append('</br>');
    attackCount++;
  };

  const defenderAttack = function() {
    hp_mychar = hp_mychar - pw_defender;
    updateHealthPointMyChar();
    $('.messages').append(`${defender.split('_')[0]}  ${defender.split('_')[1]} attacked you for ${pw_defender} damage.`);
  };

  const updateHealthPointMyChar = function() {
    $('.mychar > .score').text(hp_mychar);
  };
  
  const updateHealthPointDefender = function() {
    $('.defender > .score').text(hp_defender);
  };

  const checkForLoss = function() {
    if (hp_mychar <= 0) {
      return true;
    }
  };

  const checkForDefenderDefeat = function() {
    if (hp_defender <= 0) {
      return true;
    }
  };

  const checkForAllEnemiesDefeated = function() {
    if ($('.enemy').length === 0) {
      return true;
    }
  };

  $(document).on('click','#reset', function(){
    location.reload(true);
  });
});

// Play/Pause audio function
const togglePlay = () => {
  let audioElement = document.getElementById('audio');
  return audioElement.paused ? audioElement.play() : audioElement.pause();
};

