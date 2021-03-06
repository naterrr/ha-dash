/*global haDash, Backbone, JST*/

haDash.Views = haDash.Views || {};

(function () {
    'use strict';

    haDash.Views.TranscriptListView = Backbone.View.extend({

    id: 'transcriptListView',

        template: JST['app/scripts/templates/transcriptList.ejs'],

    initialize: function() {
      console.log("transcriptListView init");

      this.listenTo(this.collection, 'add', this.addItem);
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'sort', this.render);
      this.listenTo(this.collection, 'change', this.render);
    },

    render: function() {
      // console.log("transcriptListView render");

      this.$el.html(this.template());
      this.addAllItems();

      this.$el.data('view', this);
      this.$el.data('collection', this.collection);
      return this;
    },


    addItem: function(item) {
      var view = new haDash.Views.TranscriptView({
        model: item
      });

      // this.$el.find('tbody').append(view.render().el);
      // console.log(haDash.user + ' vs ' + item.get('owner'));
      if (haDash.user == item.get('owner')) {
        // console.log('t your');
        this.$el.find('tbody.your').append(view.render().el);
      } else {
        // console.log('t other');
        this.$el.find('tbody.other').append(view.render().el);
      }
    },

    addAllItems: function() {
      this.collection.each(this.addItem, this);
    }

    });

})();
