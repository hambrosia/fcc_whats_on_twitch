var twitchFaves = ["ESL_SC2", "drdisrespectlive", "bloodyfaster", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "daigothebeastv", "ognglobal", "lirik", "pierredunn", "bikeman", "WSHand", "sourkoolaidshow"];


$(function() {

  $("#container").css("background-image", "url()");
  $("#loading").hide();

  $(document).ajaxStart(function(){
    $("#loading").show();

   });
   $(document).ajaxComplete(function(){
     $("#loading").fadeOut( "slow" );
   });



  $("#favorites").on("click", function(){
    $("#loading").show();
    $("#container").css("background-image", "url(twitch_background.png)");
    console.log("Favorites was clicked.");
    getUsers("favorite");

  });
  $("#online").on("click", function(){
    $("#loading").show();
    $("#container").css("background-image", "url(twitch_background.png)");
    console.log("Online was clicked.");
    getUsers("online");

  });
  $("#offline").on("click", function(){
    $("#loading").show();
    $("#container").css("background-image", "url(twitch_background.png)");
    console.log("Offline was clicked.");
    getUsers("offline");
  });
  $("#welcome-button").on("click", function(){
    $("#loading").show();
    $("#container").css("background-image", "url(twitch_background.png)");
    console.log("Online was clicked.");
    getUsers("online");

  });





  var getUsers = function(selector){
    var userName = "";

    $("#twitch-boxes").empty();

    for (var i = 0; i < twitchFaves.length; i++) {
      userName = twitchFaves[i];

      if(selector === "online"){
        getStreamers(userName);
      }
      if(selector === "offline"){
        getOfflineUsers(userName);
      }
      if(selector === "favorite")
      getFavorites(userName);
    }
  }


    var getFavorites = function(userName){

      $.ajax({
        type        : 'GET',
        url         :  "https://wind-bow.gomix.me/twitch-api/streams/" + userName,
        dataType    : 'jsonp',
        success     : function(streamData) {


            getFaveProfiles(userName, streamData);

        }
      });
    }



      var getFaveProfiles = function(userName, streamData){


        $.ajax({
          type        : 'GET',
          url         :  "https://wind-bow.gomix.me/twitch-api/users/" + userName,
          dataType    : 'jsonp',
          success     : function(userData) {

            generateFaveHTML(streamData, userData);
          }
        });
      }


        var generateFaveHTML = function(streamData, userData){

          var bio = userData.bio;
          var logo = userData.logo;
          var name = userData.display_name;
          var isStreaming = "Offline"

          if(streamData.stream){
            isStreaming = "Streaming " + streamData.stream.game ;
          }

          if (userData.bio === null){
            bio = "I'm not very wordy.";
          }
          if(!userData.logo){
            logo = "https://cdn0.iconfinder.com/data/icons/social-network-9/50/16-128.png";
          }
          if(!userData.display_name){
            var name = "Oops!";
            var bio = "We can't find the account you're looking for.";
          }

          var $newdiv1 = $( "<a href='" + "https://www.twitch.tv/" + name + "'><div class='twitchtile-offline col-md-4'><img class = 'usericon' src='" + logo + "'>" + "<h1>" + name + "</h1>" + "<h2>" + isStreaming + "</h2>" +  "<p>"  + bio + "</p>" + "</div></a>" );
          $( "#twitch-boxes" ).append( $newdiv1 ).hide().fadeIn(500);

          $($newdiv1).attr("id", userData.display_name);

          $("#loading").fadeOut( "slow" );

          if(streamData.stream){
            $( "#twitch-boxes" ).prepend( $newdiv1 ).hide().fadeIn(500);
          } else{
            $( "#twitch-boxes" ).append( $newdiv1 ).hide().fadeIn(500);
          }

        }




  var getStreamers = function(userName){

    $.ajax({
      type        : 'GET',
      url         :  "https://wind-bow.gomix.me/twitch-api/streams/" + userName,
      dataType    : 'jsonp',
      success     : function(streamData) {

        if (streamData.stream){
          getProfiles(userName, streamData);
        }
      }
    });
  }



  var getProfiles = function(userName, streamData){
    $.ajax({
      type        : 'GET',
      url         :  "https://wind-bow.gomix.me/twitch-api/users/" + userName,
      dataType    : 'jsonp',
      success     : function(userData) {

        generateHTML(streamData, userData);
      }
    });
  }



  var generateHTML = function(streamData, userData){


    var $newdiv1 = $( "<a href='" + "https://www.twitch.tv/" + userData.display_name + "'><div class='twitchtile col-md-4'><img class = 'usericon' src='" + userData.logo + "'>" + "<h1>" + userData.display_name + "</h1>" + "<h2>Streaming: " + streamData.stream.game + "</h2>" + "<p>"  + streamData.stream.channel.status + "</p>" +
    "<img class ='userpreview' src='" + streamData.stream.preview.medium + "'>" + "</div></a>" );
    $( "#twitch-boxes" ).append( $newdiv1 ).hide().fadeIn(500);

    $($newdiv1).attr("id", userData.display_name);
    $("#loading").fadeOut( "slow" );
    $( "#twitch-boxes" ).append( $newdiv1 ).hide().fadeIn(500);

  }




var getOfflineUsers = function(userName){

  $.ajax({
    type        : 'GET',
    url         :  "https://wind-bow.gomix.me/twitch-api/streams/" + userName,
    dataType    : 'jsonp',
    success     : function(streamData) {

      if (!streamData.stream){
        getOfflineProfiles(userName, streamData);
      }
    }
  });
}


var getOfflineProfiles = function(userName, streamData){
  $.ajax({
    type        : 'GET',
    url         :  "https://wind-bow.gomix.me/twitch-api/users/" + userName,
    dataType    : 'jsonp',
    success     : function(userData) {

      generateOfflineHTML(streamData, userData);
    }
  });
}


  var generateOfflineHTML = function(streamData, userData){

    var bio = userData.bio;
    var logo = userData.logo;
    var name = userData.display_name;
    var isStreaming = "Offline"


    if (userData.bio === null){
      bio = "I'm not very wordy.";
    }
    if(!userData.logo){
      logo = "https://cdn0.iconfinder.com/data/icons/social-network-9/50/16-128.png";
    }
    if(!userData.display_name){
      var name = "Oops!";
      var bio = "We can't find the account you're looking for.";
    }

    var $newdiv1 = $( "<a href='" + "https://www.twitch.tv/" + name + "'><div class='twitchtile-offline col-md-4'><img class = 'usericon' src='" + logo + "'>" + "<h1>" + name + "</h1>" + "<h2>" + isStreaming + "</h2>" +  "<p>"  + bio + "</p>" + "</div></a>" );
    $("#loading").fadeOut( "slow");
    $( "#twitch-boxes" ).append( $newdiv1 ).hide().fadeIn(500);


  }
});
