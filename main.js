var twitchFaves = ["ESL_SC2", "drdisrespectlive"];

//"bloodyfaster", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "daigothebeastv", "ognglobal"

//https://wind-bow.gomix.me/twitch-api/streams/ESL_SC2
//https://wind-bow.gomix.me/twitch-api/users/ESL_SC2

$(function() {
  $("#favorites").on("click", function(){
    console.log("Favorites was clicked.");
    getFaves();
  });
  $("#online").on("click", function(){
    console.log("Online was clicked.");
    getOnline();

  });
  $("#offline").on("click", function(){
    console.log("Offline was clicked.");
    //  getOffline();
  });



  var streamData = [];
  var userData = [];
  var userName = "";

  var getFaves = function(){
    $("#twitch-boxes").empty();

    for (var i = 0; i < twitchFaves.length; i++) {
      userName = twitchFaves[i];

      //console.log(streamURL, userURL);
      streamAjax(userName);

    }
  }


  var streamAjax = function(userName){


    $.ajax({
      type        : 'GET',
      url         :  "https://wind-bow.gomix.me/twitch-api/streams/" + userName,
      dataType    : 'jsonp',
      success     : function(twitchData) {

        streamData = twitchData;

        userAjax(userName);
      }
    });
  }


    var userAjax = function(userName){
      $.ajax({
        type        : 'GET',
        url         :  "https://wind-bow.gomix.me/twitch-api/users/" + userName,
        dataType    : 'jsonp',
        success     : function(twitchData) {

          userData = twitchData;

          /*
          console.log("From stream",  streamData);
          console.log(" from stream",  userData);

          console.log(userData.display_name);
          console.log(userData.bio);
          console.log(userData.logo);

          console.log(streamData.stream.average_fps);
          console.log(streamData.stream.game);
          */


          displayTwitch(streamData, userData);
        }
      });
    }

      var getOnline = function(){
        $("#twitch-boxes").empty();

        for (var i = 0; i < twitchFaves.length; i++) {
          userName = twitchFaves[i];

          streamAjaxOnline(userName);

        }
      }

  var streamAjaxOnline = function(userName){


    $.ajax({
      type        : 'GET',
      url         :  "https://wind-bow.gomix.me/twitch-api/streams/" + userName,
      dataType    : 'jsonp',
      success     : function(twitchData) {

        streamData = twitchData;
        console.log(userName);

        if (streamData.stream){
          userAjaxOnline(userName);

        }
      }
    });
  }

  var userAjaxOnline = function(userName){
    $.ajax({
      type        : 'GET',
      url         :  "https://wind-bow.gomix.me/twitch-api/users/" + userName,
      dataType    : 'jsonp',
      success     : function(twitchData) {

        userData = twitchData;

        /*
        console.log("From stream",  streamData);
        console.log(" from stream",  userData);

        console.log(userData.display_name);
        console.log(userData.bio);
        console.log(userData.logo);

        console.log(streamData.stream.average_fps);
        console.log(streamData.stream.game);
        */

        displayTwitchOnline(streamData, userData);
      }
    });
  }

    var displayTwitchOnline = function(arr1, arr2){


      var $newdiv1 = $( "<a href='#'><div class='twitchtile col-md-6'><img class = 'usericon' src='" + userData.logo + "'>" + "<h1>" + userData.display_name + "</h1>" + "<h2>Playing: " + streamData.stream.game + "</h2>" + "<p>"  + streamData.stream.channel.status + "</p></div></a>" );
      $( "#twitch-boxes" ).append( $newdiv1 ).hide().fadeIn(500);



      $($newdiv1).attr("id", userData.display_name);

      $( "#twitch-boxes" ).append( $newdiv1 ).hide().fadeIn(500);
    }





  var displayTwitch = function(arr1, arr2){

    var $newdiv1 = $( "<a href='" + "https://www.twitch.tv/" + userData.display_name +"'>" +  "<div class='twitchtile col-md-6'>" + "<img class = 'usericon' src='" + userData.logo + "'>" + "<h1>" + userData.display_name + "</h1>" + "<p>"  + userData.bio + "</p>" +  "</div></a>" );

    $($newdiv1).attr("id", userData.display_name);
    $( "#twitch-boxes" ).append( $newdiv1 ).hide().fadeIn(500);
  }


});
