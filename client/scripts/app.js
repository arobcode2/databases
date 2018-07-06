//Pseudocode:
//Requirements:
// Send message feature
// Retrieve message feature
// Escape string feature
// Global object for all tweets
// Update screen method based on some condition
// Tweet input form, that resets after tweet sent
// Split tweets up by room
// Filter by room, show only those room messages
// Befriend other users
// Keep track of friends of specific users
// Render HTML object
// Part of filtering, bold friends


//App is our global object
// Stores all data and functions etc


const app = {};

app.init = function() {

  this.tweets = [];
  this.send = pushTweet;
  this.fetch = fetch;
  this.server = 'http://127.0.0.1:3000';
  this.clearMessages = clearMessages;
  this.renderMessage = renderMessage;
  this.renderMessages = renderMessages;
  this.renderRoom = fetch;
  this.roomNames = [];
  this.tabs = [];
  this.selectedRoom = 'room:' + parse('lobby');
  this.friends = [];
  this.roomTweets = {};


  // Adds a welcome message to the user
  $('#userwelcome').html('Hey ' + fetchUserName() + ' '); 

  addTab(this.selectedRoom);
  
  $('#input').submit(function(e) {
    e.preventDefault();
    inputBoxHandler(e);
  });

  // get a list of all the rooms once per minute
  window.roomTimer = setInterval(fetchRoomNames(), 60000);

  window.currentTab = setInterval(function() {
    fetch( app.selectedRoom );
    
  }, 2000);

  window.u = ()=>fetch(app.selectedRoom);
  
  

  
  
  // when a new room is created, switch context to the new room
  $('#roomCreator').on('submit', (e)=>{
    e.preventDefault();
    
    var text = $('#newroomname').val();
    console.log(text);
    $('#newroomname').val('');
    $.ajax({
      url: app.server + '/classes/messages',
      type: 'GET',
      data: {where: {roomname: text}, limit: 1000, order: '-createdAt'},
      success: function (data) { 
        console.log('success on new creation', data); 
        if (data.results.length > 0) {
          addTab('room:' + parse(text));
        } else {
          var message = {username: 'System', roomname: text, text: 'Room Created'};
          console.log('sending new room message', message);
          app.send(message);
          addTab('room:' + parse(text));
          setTimeout(fetchRoomNames, 1000);
          // app.selectedRoom = 'room:' + text;
          // console.log;
        }
      },
      error: function (data) {
        console.log('data not received', data);
      }
    });
  });
  

  // on dropdown menu of rooms change, load the selected room
  $('#roomSelector').on('change', function() {
    var newRoomName = 'room:' + parse($( '#roomSelector option:selected' ).text());
    addTab(newRoomName);
  });

  // initial fetch of tweets and a list of rooms
  fetch(app.selectedRoom);
  app.renderMessages();
  fetchRoomNames();
  
};

const inputBoxHandler = function inputBosHandler(e) {
  var room = unparse( app.selectedRoom.slice(5) );

  var message = {
    username: location.search.slice(10),
    text: e.target[0].value,
    roomname: room
  };

  e.target[0].value = '';

  app.send(message);
};

const fetchUserName = function fetchUserName() {
  var urlName = location.search.slice(10);
  return urlName.replace('%20', ' ');

};

// sweeps through all open tabs, gets tweets for those rooms
const roomSweeper = function roomSweeper() {
  for (let room of tabs) {
    
    

  }
  
};

const removeTab = function removeTab(name) {
  
  var index = app.tabs.indexOf(name);
  app.tabs.splice(index, 1);
  if (app.selectedRoom === name) {
    if (app.tabs.length > 0) {
      if (index === 0) {
        app.selectedRoom = app.tabs[index];
      } else {
        app.selectedRoom = app.tabs[index - 1];
      }
      
      app.fetch(app.selectedRoom);
    } else {
      app.selectedRoom = '';
      clearMessages();
    }
  }

};


const addTab = function addTab(name) {  
  
  //if tab exists, switch to it
  if (app.tabs.indexOf(name) !== -1) {
    app.selectedRoom = name;
    app.fetch(app.selectedRoom);
    return;
  }
  app.tabs.push(name);
  var tab = $(`<span class="tab" id="${name}"><div id="pp">${name}</div></span>`);
  tab.on('click', function(e) {
    e.preventDefault();
    app.selectedRoom = name;
    app.fetch(app.selectedRoom);
  });
  var close = $('<span class="close">x</span>');
  tab.append(close);
  close.on('click', function() {
    
    $(this).parent().remove();
    removeTab(name);

  });
  app.selectedRoom = name;
  app.fetch(app.selectedRoom);

  $('#chatTabBar').append(tab);
};

const promptUser = function promptUser() {
  location.search = '';
};

const fetchRoomNames = function fetchRoomNames() {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {keys: 'roomname', limit: 1000, order: '-createdAt'},

    success: function (data) {
      app.roomNames = data.results;
      app.roomNames = app.roomNames.filter( i=> i !== '');
      
      var list = $('#roomSelector');
      list.html('');
      for (var i = 0; i < 11; i++) {
        if (app.roomNames[i]) { list.append($(`<option value="${app.roomNames[i]}">${app.roomNames[i]}</option>`)); }
      }
      
    },
    error: function (data) {
      console.log('data not received', data);
    }
  });
  
};


const renderMessages = function renderMessages() {
  clearMessages();
  for (let tweet of app.tweets) {
    app.renderMessage(tweet);
  }
};


const fetch = function fetch(name) {
  let updateCurrentWindow = false;
  if (name !== '') {
    if (name.substring(0, 4) === 'room') {
      var room = name.slice(5);
      room = unparse(room);
      ajaxGet({order: '-createdAt', where: {roomname: room}}, name === app.selectedRoom);
    } else if (name(0, 4) === 'user') {
      var user = name.slice(5);
      ajaxGet({order: '-createdAt', where: {username: user}}, name === app.selectedRoom);
    }
  }

};

const addFriend = function addFriend(name) {

  app.friends.push(parse(name));
  app.fetch('user:' + parse(name));

};

const parse = e => { if (typeof e === 'string') { return e.replace(/[^]/g, function(e) { return '&#' + e.charCodeAt(0) + ';'; }); } return ''; };

const unparse = e => e.replace(/;/g, '').split('&#').filter(i=>i !== '').map(i => String.fromCharCode(i)).join('');  

const parseMessage = function parseMessage(message) {
  
  var username = parse(message.username);
  var text = parse(message.text);
 
  if (app.friends.includes(username) ) {
    username = '<a href="#" class="friend" onclick=addTab("user:' + username + '")>' + username + '</a>';
    username = '<b>@' + username + '</b>';
  } else {
    username = '<a href="#" onclick=addFriend("' + username + '")>' + '@' + username + '</a>';
  }

  var str = `${username}: ${text}`;
  return $('<div>').html(str);
};

const renderMessage = function renderMessage(message) {
  var parsed = parseMessage(message);
  parsed.attr('class', 'tweet');
  $('#chats').append(parsed);
};

const clearMessages = function clearMessages() {
  $('#chats').html('');
};

const ajaxGet = function ajaxGet(data, update = false) {
  $.ajax({
    url: app.server + '/classes/messages/',
    type: 'GET',
    data: data,
    success: function (data) {  
      if (update) {
        app.tweets = data.results;
      }
      app.roomTweets[data.roomname] = data.results;
      //console.log(data);
      renderMessages();
    },
    error: function (data) {
      console.log('data not received in ajax get request', data);
    }
  });
};

//Craft awesome injection
const pushTweet = function pushTweet(data) {
  console.log(data);
  $.ajax({
    url: app.server + '/classes/messages/',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
      console.log('tweet accepted');
    },
    error: function (data) {
      console.log('data not received', data);
    }
  });
};


window.onload = function () {
  app.init();
};
