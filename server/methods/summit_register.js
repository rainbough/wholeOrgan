Meteor.methods({
	"submitSummitRegistration":function(data){
		_.each(data,function(o){
			if(o.length < 1) throw new Meteor.Error(403,"One or more fields was not filled out.");
		});
		if(data.inv_code.toUpperCase() != "AA-BB-CC") throw new Meteor.Error(403,"Invalid invitation code.");
		var attendee_exists = Attendees.find({"email":data.email}).fetch();
		if(attendee_exists.length > 0) throw new Meteor.Error(403,"An attendee with that email address already exists.");

		var attendee_id = Attendees.insert(data);
		return attendee_id;
	}
});
