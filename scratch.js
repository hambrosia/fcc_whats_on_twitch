
var getData = function(){

  var type = ["users/", 'streams/'];
  var userURL = "";
  var counter = 0;
  for (var i = 0; i < type.length; i++) {

    for (var j = 0; j < twitchFaves.length; j++) {

      var userURL = "https://wind-bow.gomix.me/twitch-api/"+ type[i] + twitchFaves[j];

      $.ajax({
        type        : 'GET',
        url         : userURL,
        dataType    : 'jsonp',
        success     : function(twitchData) {

        //  console.log(twitchData);

          if (counter < twitchFaves.length){
            twitchUsers.push(twitchData);
            console.log(twitchUsers);
          }

          console.log(counter);

          counter++;

        },
        error       : function() {

        }
      });
    }
  }

}
//getData();


var whosOnline = function(){

  var j=0;
  for(i = 0; i < twitchFaves.length ; i++){
    var userURL = "https://wind-bow.gomix.me/twitch-api/streams/" + twitchFaves[i];

    $.ajax({
      type        : 'GET',
      url         : userURL,
      dataType    : 'jsonp',
      success     : function(twitchData) {

        if (twitchData.stream !== null){
          favesOnline.push(twitchFaves[j]);
        }
        if (twitchData.stream == null){
          favesOffline.push(twitchFaves[j])
        }
        j++;
      },
      error       : function() {

      }
    });
  }
}


var getTwitches = function(twitchUsers, num) {

$(function() {
  $("#twitch-boxes").empty();

  var userSearch = $("#search-box").val();
  var type = "";

  if(num === 1){
    type = "users/";
  }

  if(num === 2){
    type = "streams/";
  }
  if(num == 3){
    type = "users/";
  }

  var j = 0;
  for(i = 0; i < twitchUsers.length ; i++){
    var userURL = "https://wind-bow.gomix.me/twitch-api/"+ type + twitchUsers[i];
    console.log(userURL);
    console.log(twitchFaves[j]);
    console.log(twitchFaves[i]);

    $.ajax({
      type        : 'GET',
      url         : userURL,
      dataType    : 'jsonp',
      success     : function(twitchData) {


        console.log(twitchData);
        //all faves (1)
        //if(num === 1){

          if(twitchData.logo == null){
            var userLogo = "https://cdn1.iconfinder.com/data/icons/micon-social-pack/512/twitch-128.png";
          } else{
            userLogo = twitchData.logo;
          }

          if(twitchData.bio == null){
            var userBio = "I'm not one for words."
          } else{
            var userBio = twitchData.bio;
          }

          if(!twitchData.display_name){
            userBio = "This profile is inactive or deleted."
          }

          console.log(j, twitchFaves[j], twitchData.display_name);
          var $newdiv1 = $( "<a href='" + "https://www.twitch.tv/" + twitchFaves[j] +"'>" +  "<div class='twitchtile col-sm-6'>" + "<img class = 'usericon' src='" + userLogo + "'>" + "<h1>" + twitchFaves[j] + "</h1>" + "<p>"  + userBio + "</p>" +  "</div></a>" );
      //  }

        //if online (2)
        if(num === 2){
          var $newdiv1 = $( "<a href='#'>" +  "<div class='twitchtile col-xs-6'>" + "<img class = 'usericon' src='" + twitchData.stream.preview.small + "'>" + "<h1>" + twitchData.stream.channel.display_name + "</h1>" + "<h2>" + twitchData.stream.channel.game + "</h2>" + "<p>"  + twitchData.stream.channel.status + "</p>" +  "</div></a>" );

        }

        //if offline (3)
        if(num === 3){
          var $newdiv1 = $( "<a href='#'>" +  "<div class='twitchtile col-xs-6'>" + "<img class = 'usericon' src='" + "#" + "'>" + "<h1>" + "globalName" + "</h1>" + "<p>"  + "globalBio" + "..." + "</p>" +  "</div></a>" );

        }

        $($newdiv1).attr("id", "post" + i);

        $( "#twitch-boxes" ).append( $newdiv1 ).hide().fadeIn(500);
      },
      error       : function() {

      }
    });
    j++;

  }
});

}



var allUsers = [];
var allStreams = [];
var getData = function(){

  var type = ["users/", 'streams/'];
  var userURL = "";
  var counter = 0;
  for (var i = 0; i < type.length; i++) {

    for (var j = 0; j < twitchFaves.length; j++) {

      var userURL = "https://wind-bow.gomix.me/twitch-api/"+ type[i] + twitchFaves[j];

      $.ajax({
        type        : 'GET',
        url         : userURL,
        dataType    : 'jsonp',
        success     : function(twitchData) {

            console.log(twitchData);


            allUsers.push(twitchData);
            console.log(allUsers);




          console.log(counter);

          counter++;

        },
        error       : function() {

        }
      });
    }
  }

}
getData();


// online output display jquery

      var $newdiv1 = $( "<a href='#'><div class='twitchtile col-md-6'><img class = 'usericon' src='" + userData.logo + "'>" + "<h1>" + userData.display_name + "</h1>" + "<h2>Playing: " + streamData.stream.game + "</h2>" + "<p>"  + streamData.stream.channel.status + "</p></div></a>" );
      $( "#twitch-boxes" ).append( $newdiv1 ).hide().fadeIn(500);

            $($newdiv1).attr("id", userData.display_name);

            $( "#twitch-boxes" ).append( $newdiv1 ).hide().fadeIn(500);
