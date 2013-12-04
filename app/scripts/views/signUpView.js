/*global haDash, Backbone, JST*/

haDash.Views = haDash.Views || {};

(function () {
    'use strict';

    haDash.Views.SignUpView = Backbone.View.extend({
		
		el: '#main',

        template: JST['app/scripts/templates/signup.ejs'],
		
		initialize: function() {
			this.render();
		},
		
		render: function() {
			this.$el.html(this.template());

			return this;
		},
		
		events: {
			'click input[type="submit"]': 'signup'
		},
		
		signup: function(event) {
			event.preventDefault();
			
			$.ajax({
				url: haDash.API + '/register',
				xhrFields: {
					withCredentials: true
				},
				method: 'post',
				data: {
			        username: $('#username').val(),
			        password: $('#password').val()
			    }
			})
			.done(function() {
		        haDash.whoami(function() {
		          if (haDash.user) {
					  haDash.router.navigate("mixes/", {trigger: true});
				  } else {
					  alert('Invalid Registration');
				  }
		        });
		    })
		    .fail(function() {
		      	alert( "Registration Error" );
		    });
					
		}

    });

})();