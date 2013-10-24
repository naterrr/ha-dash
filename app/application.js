
window.API = (document.location.host == '10.0.54.74')?'http://10.0.54.74':'http://data.hyperaud.io';
// window.API = 'https://data.hyperaud.io';

window.user = null;

$.fn.editable.defaults.mode = 'inline';


// Application bootstrapper.
Application = {
  
  initialize: function() {
    
    filepicker.setKey('A8RudJZ9NTTC8MTn61ia7z');
    
    var HomeView = require('views/home_view');

    var LoginView = require('views/login_view');
    var RegisterView = require('views/register_view');
    var SettingsView = require('views/settings_view');

    var MediaView = require('views/media_view');
    var TranscriptsView = require('views/transcripts_view');
    var MixesView = require('views/mixes_view');
    
    var Router = require('lib/router');
    
    this.homeView = new HomeView();

    this.loginView = new LoginView();
    this.registerView = new RegisterView();
    this.settingsView = new SettingsView();

    this.mediaView = new MediaView();
    this.transcriptsView = new TranscriptsView();
    this.mixesView = new MixesView();
    
    this.router = new Router();
    
    if (typeof Object.freeze === 'function') Object.freeze(this);
  },
    
  whoami: function(callback) {
    $.get(window.API + '/whoami', function(whoami) {
      console.log(whoami);
      if (whoami.user) {
        window.user = whoami.user;
        $('body').removeClass('anonymous').addClass('user');
        $('#userName').text(window.user.username);
      } else {
        window.user = null;
        $('body').removeClass('user').addClass('anonymous');
        $('#userName').text('Account');
      }
      if (callback) callback();
    });
  }
}

module.exports = Application;
