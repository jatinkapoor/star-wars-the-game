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
  
  //selects players character and moves other characters to enemy section
  $(document).on('click','.char', function() {
    $(this).siblings().appendTo('#enemies').attr('class', 'enemy');
    $(this).appendTo('#your-character').attr('class', 'mychar');
    setMyCharacter();
  });

  //selects the defender for the player to fight against
  $(document).on('click', '.enemy', function () {
    
    if ($('.defender').length === 0) {
      $(this).appendTo('.defender-sec').attr('class', 'defender');
      setDefender();
      $('.messages').text('');
    } 
  });

  /** attack click function **/
  $(document).on('click','#attack', function() {
      if ($('.defender').length > 0) {
        /* Check for player's loss and if yes give an option to reset and play again */
        if (checkForLoss()) {
          messageCheckForLoss(); //display message when player loses
        } else {
          iAttack(); //Action when player attacks
          //checks if defender got defeated
          if (checkForDefenderDefeat()) {
            //displays message when defender gets defeated
            messageDefenderDefeat(); 
            //checks if all enemies got defeated
            if (checkForAllEnemiesDefeated()) {
              messageAllEnemiesDefeated(); //display message when all enemies get defeated
            }
          } else {
            defenderAttack(); //defender attacks the player
          }
        }
      } else {
        //message when there is no character and defender selected and player tries to click attack.
        messageCharacterAndDefender();
      }
  });

  //sets up player hp and pw
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

  //sets up defender hp and pw
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

  //attack function for player
  const iAttack = function() {
    hp_defender = hp_defender - (pw_mychar * attackCount);
    updateHealthPointDefender();
    $('.messages').text('');
    $('.messages').append(`You attacked ${defender.split('_')[0]}  ${defender.split('_')[1]} for ${eval(pw_mychar * attackCount)} damage.`);
    $('.messages').append('</br>');
    attackCount++;
  };

  //attack function for defender
  const defenderAttack = function() {
    hp_mychar = hp_mychar - pw_defender;
    updateHealthPointMyChar();
    $('.messages').append(`${defender.split('_')[0]}  ${defender.split('_')[1]} attacked you for ${pw_defender} damage.`);
  };

  //updates hp for players character
  const updateHealthPointMyChar = function() {
    $('.mychar > .score').text(hp_mychar);
  };
  
  //updates hp for defender 
  const updateHealthPointDefender = function(){
    $('.defender > .score').text(hp_defender);
  };

  //function to check for player's character loss
  const checkForLoss = function() {
    if (hp_mychar <= 0) {
      return true;
    }
  };

  //function to check for defender's loss
  const checkForDefenderDefeat = function(){
    if (hp_defender <= 0) {
      return true;
    }
  };

  //checks if all enenies got defeated
  const checkForAllEnemiesDefeated = function(){
    if ($('.enemy').length === 0) {
      return true;
    }
  };

  /* Functions to display messages */
  const messageDefenderDefeat = function() {
    $('.messages').append(`You have defeated ${defender.split('_')[0]}  ${defender.split('_')[1]}, select another defender`);
    $('.defender').remove();
  }

  const messageCharacterAndDefender = function(){
    $('.messages').text('You must select a character, and a defender');
  }

  const messageAllEnemiesDefeated = function(){
    $('#attack').remove();
    $('.messages').text('');
    $('.messages').append('You won, click reset to play again');
    $('.messages').append('</br>');
    $('.messages').append('<button id="reset" class="button">Reset</button>');
  }

  const messageCheckForLoss = function(){
     $('#attack').remove();
     $('.messages').text('');
     $('.messages').append('You have been defeated, click reset to play again');
     $('.messages').append('</br>');
     $('.messages').append('<button id="reset" class="button">Reset</button>');
  }

  //reset game
  $(document).on('click','#reset', function(){
    location.reload(true);
  });
});

// Play/Pause audio function
const togglePlay = () => {
  let audioElement = document.getElementById('audio');
  return audioElement.paused ? audioElement.play() : audioElement.pause();
};

