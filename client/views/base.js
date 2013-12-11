Template.base.events({
	"click button#footer-mail-button": function(e){
		var adr = $("input[name=footer-mail-address]").val();
		Meteor.call("subscribeMailchimp",adr,function(err,res){
			if(err) alerterror(err.reason);
			else alertsuccess("Subscribed successfully!");
		});
	}
});
