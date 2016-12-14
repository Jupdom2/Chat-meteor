if (Meteor.isClient) {
  Messages = new Meteor.Collection('messages');

  Deps.autorun(function() {
    Meteor.subscribe('messages', {
      onReady : function() {
        Session.set("active", true); 
      }
    });
  });

  Template.cosmochat.events({
    'submit form': function(event) {
      event.preventDefault();
      var post = {
        pseudo : $(event.target).find('[name=pseudo]').val(),
        message : $(event.target).find('[name=message]').val(),
        channel : $(event.target).find('[name=chanel]').val()
      }

      $(event.target).find('[name=pseudo]').val(" "),
      $(event.target).find('[name=message]').val(" ")
      
      console.log(post)

      if ( (post.message != "") && (post.pseudo != "") ) {
        Meteor.call("ajouteMessage", post);
        var post = {
        }
      }
    }
  });

  Template.chanel1.helpers({
    MessagesChan1 : function() {
      if (Session.get("active")) {
        return Messages.find({ chanel:1}, {sort : {time : 1}, limit : 200});
      } 
      else {
        return [];
      }
    }
  });
}


// ///// CHANEL /////