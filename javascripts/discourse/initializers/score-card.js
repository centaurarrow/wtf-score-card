var tabs;
var panels;
var json;
  

function scoreloadByEventID(eventID) {
  parent = document.getElementById('score-card');
  tabs = parent.querySelectorAll('[role="score-tab"]');
  panels = parent.querySelectorAll('[role="score-tabpanel"]');
  // Bind listeners
  for (i = 0; i < tabs.length; ++i) {
    scoreaddListeners(i);
  };

  $.ajax({
    type:'GET',
    url:'http://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/summary?event='+eventID,
    dataType:'json',
    async:true,
    success:function(data){
      response = data;
        Roster = '';

        Roster = Roster +'\n# Roster' + '\n## '+response.rosters[0].team.displayName + ' ![25x25]('+response.rosters[0].team.logos[0].href+') '; 
        for(i in response.rosters[0].roster) {
          if(response.rosters[0].roster[i].starter) {
            Roster = Roster + '\n* '+ response.rosters[0].roster[i].jersey +'  '+response.rosters[0].roster[i].athlete.displayName;
            if(response.rosters[0].roster[i].subbedOutFor) {
              Roster = Roster + ' ![15x15](https://www.flaticon.com/premium-icon/icons/svg/919/919450.svg) '+ 
                       response.rosters[0].roster[i].subbedOutFor.jersey +'  '+ 
                       response.rosters[0].roster[i].subbedOutFor.athlete.displayName;
            }
          }
        }
    
        Roster = Roster + '\n## '+response.rosters[1].team.displayName + ' ![25x25]('+response.rosters[1].team.logos[0].href+') '; 
        for(i in response.rosters[1].roster) {
          if(response.rosters[1].roster[i].starter) {
            //
            Roster = Roster + '\n* '+ response.rosters[1].roster[i].jersey +'  '+response.rosters[1].roster[i].athlete.displayName;
            if(response.rosters[1].roster[i].subbedOutFor) {
              Roster = Roster + ' ![15x15](https://www.flaticon.com/premium-icon/icons/svg/919/919450.svg) '+ response.rosters[1].roster[i].subbedOutFor.jersey +'  '+ response.rosters[1].roster[i].subbedOutFor.athlete.displayName;
            }
          }
        }

        console.log(Roster);

        matchStats = '';
        //Match Stats Update - use the value of response.boxscore.teams[0]  
        matchStats = matchStats + '\n# Match Stats';
        matchStats = matchStats + '\n|'+ response.boxscore.teams[0].team.name +'| |'+ response.boxscore.teams[1].team.name +' | \n|--|--|--|';
        for(i in response.boxscore.teams[0].statistics) {
          matchStats = matchStats + '\n|'+ response.boxscore.teams[0].statistics[i].displayValue +'|'+  response.boxscore.teams[0].statistics[i].label +
                        '|'+ response.boxscore.teams[1].statistics[i].displayValue +' |';
        }

        console.log(matchStats);

        keyEvents = '';
        keyEvents = keyEvents + '\n# Key Events';
        keyEvents = keyEvents + '\n| &nbsp; | |&nbsp;|&nbsp;|&nbsp;| \n|--|--|--|--|--|';
        for(i in response.keyEvents) {
          if(response.keyEvents[i].type.text.indexOf("Goal")>-1){
             keyEvents = keyEvents + '\n|'+ response.keyEvents[i].clock.displayValue +'|&nbsp; | ![20x20](https://image.flaticon.com/icons/svg/1165/1165187.svg)|&nbsp; | **'+ response.keyEvents[i].shortText  +' ('+response.keyEvents[i].team.displayName+')** |';
          } else if(response.keyEvents[i].type.text.indexOf("Penalty - Scored")>-1 ){
             keyEvents = keyEvents + '\n|'+ response.keyEvents[i].clock.displayValue +'|&nbsp; | ![20x20](https://image.flaticon.com/icons/svg/1165/1165187.svg)|&nbsp; **(P)** | **'+ response.keyEvents[i].shortText  +' ('+response.keyEvents[i].team.displayName+')** |';
          } else if(response.keyEvents[i].type.text.indexOf("Hand ball")>-1 ){
             keyEvents = keyEvents + '\n|'+ response.keyEvents[i].clock.displayValue +'|&nbsp; | ![20x20](https://image.flaticon.com/icons/svg/2817/2817842.svg)|&nbsp; |'+ response.keyEvents[i].shortText  +' |';
          } else if(response.keyEvents[i].type.text.indexOf("Yellow Card")>-1){
             keyEvents = keyEvents + '\n|'+ response.keyEvents[i].clock.displayValue +'|&nbsp; | ![20x20](https://image.flaticon.com/icons/svg/2817/2817867.svg)|&nbsp; |'+ response.keyEvents[i].shortText  +' ('+response.keyEvents[i].team.displayName+') |';
          } else if(response.keyEvents[i].type.text.indexOf("Red Card")>-1){
             keyEvents = keyEvents + '\n|'+ response.keyEvents[i].clock.displayValue +'|&nbsp; | ![20x20](https://image.flaticon.com/icons/svg/2817/2817905.svg)|&nbsp; |'+ response.keyEvents[i].shortText  +' ('+response.keyEvents[i].team.displayName+') |';
          } else if(response.keyEvents[i].type.text.indexOf("Halftime")>-1){
             keyEvents = keyEvents + '\n|'+ response.keyEvents[i].clock.displayValue +'|&nbsp; | ![20x20](https://image.flaticon.com/icons/svg/2817/2817883.svg)|&nbsp; |&nbsp; |';
          }  else if(response.keyEvents[i].type.text.indexOf("End Regular Time")>-1){
             keyEvents = keyEvents + '\n|'+ response.keyEvents[i].clock.displayValue +'|&nbsp; | ![20x20](https://image.flaticon.com/icons/svg/2817/2817886.svg)|&nbsp; |&nbsp; |';
            } else if(response.keyEvents[i].type.text.indexOf("Substitution")>-1){
               keyEvents = keyEvents + '\n|'+ response.keyEvents[i].clock.displayValue +'|&nbsp; | ![20x20](https://www.flaticon.com/premium-icon/icons/svg/919/919450.svg)|&nbsp; |'+ response.keyEvents[i].shortText  +' ('+response.keyEvents[i].team.displayName+') |';
            } else if(response.keyEvents[i].type.text.indexOf("Kickoff")>-1 || response.keyEvents[i].type.text.indexOf("Start 2nd Half")>-1){
            
            }
            else {
              keyEvents = keyEvents + '\n|'+ response.keyEvents[i].clock.displayValue +'| &nbsp; |**'+ response.keyEvents[i].type.text  +'** |&nbsp; |'+ response.keyEvents[i].shortText  +' |';
            }
      
          }
        console.log(keyEvents);  

        fullCommentary = '';
        fullCommentary = fullCommentary + '\n# Full Commentary';
        fullCommentary = fullCommentary + '\n| &nbsp; | |&nbsp;| \n|--|--|--|';
        for(i in response.commentary) {
          if(response.commentary[i].text.indexOf("Goal!")>-1){
             fullCommentary = fullCommentary + '\n|'+ response.commentary[i].time.displayValue +'| ![50x50](https://image.flaticon.com/icons/svg/1165/1165187.svg)| **'+ response.commentary[i].text  +'** |';
          } else if(response.commentary[i].text.indexOf("Hand ball")>-1 || response.commentary[i].text.indexOf("Foul")>-1){
             fullCommentary = fullCommentary + '\n|'+ response.commentary[i].time.displayValue +'| ![50x50](https://image.flaticon.com/icons/svg/2817/2817842.svg)|'+ response.commentary[i].text  +' |';
          } else if(response.commentary[i].text.indexOf("yellow card")>-1){
             fullCommentary = fullCommentary + '\n|'+ response.commentary[i].time.displayValue +'| ![50x50](https://image.flaticon.com/icons/svg/2817/2817867.svg)|'+ response.commentary[i].text  +' |';
          } else if(response.commentary[i].text.indexOf("red card")>-1){
             fullCommentary = fullCommentary + '\n|'+ response.commentary[i].time.displayValue +'| ![50x50](https://image.flaticon.com/icons/svg/2817/2817905.svg)|'+ response.commentary[i].text  +' |';
          } else if(response.commentary[i].text.indexOf("First Half ends")>-1){
             fullCommentary = fullCommentary + '\n|'+ response.commentary[i].time.displayValue +'| ![50x50](https://image.flaticon.com/icons/svg/2817/2817883.svg)|'+ response.commentary[i].text  +' |';
          }  else if(response.commentary[i].text.indexOf("Second Half ends")>-1){
             fullCommentary = fullCommentary + '\n|'+ response.commentary[i].time.displayValue +'| ![50x50](https://image.flaticon.com/icons/svg/2817/2817886.svg)|'+ response.commentary[i].text  +' |';
          } else if(response.commentary[i].text.indexOf("Substitution")>-1){
             fullCommentary = fullCommentary + '\n|'+ response.commentary[i].time.displayValue +'| ![50x50](https://www.flaticon.com/premium-icon/icons/svg/919/919450.svg)|'+ response.commentary[i].text  +' |';
          }
          else {
             fullCommentary = fullCommentary + '\n|'+ response.commentary[i].time.displayValue +'| &nbsp; |'+ response.commentary[i].text  +' |';
          }
        }
        console.log(fullCommentary);

    }
  });
}; 

function scoreaddListeners (index) {

  tabs[index].addEventListener('click', scoreclickEventListener);
  // Build an array with all tabs (<button>s) in it
  tabs[index].index = index;
};

// When a tab is clicked, activateTab is fired to activate it
function scoreclickEventListener (event) {

  var tab = event.target;
  scoreactivateTab(tab, false);
};

// Activates any given tab panel
function scoreactivateTab (tab, setFocus) {
  parentNode = tab.parentElement.parentElement

  setFocus = setFocus || true;
  // Deactivate all other tabs
  scoredeactivateTabs(parentNode);

  // Remove tabindex attribute
  tab.removeAttribute('tabindex');

  // Set the tab as selected
  tab.setAttribute('aria-selected', 'true');

  // Get the value of aria-controls (which is an ID)
  var controls = tab.getAttribute('aria-controls');

  // Remove hidden attribute from tab panel to make it visible
  document.getElementById(controls).removeAttribute('hidden');

  // Set focus when required
  if (setFocus) {
    tab.focus();
  };
};

// Deactivate all tabs and tab panels
function scoredeactivateTabs (parent) {
  tabs = parent.querySelectorAll('[role="score-tab"]');
  panels = parent.querySelectorAll('[role="score-tabpanel"]');

  for (t = 0; t < tabs.length; t++) {
    tabs[t].setAttribute('tabindex', '-1');
    tabs[t].setAttribute('aria-selected', 'false');
  };

  for (p = 0; p < panels.length; p++) {
    panels[p].setAttribute('hidden', 'hidden');
  };
}