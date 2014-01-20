Meteor.publish('currentUser', function() {
	var user = Meteor.users.find(this.userId);
	return user;
});

Meteor.publish('attendees', function(){
	if(Roles.userIsInRole(this.userId,['admin'])) {
		var attendees = Attendees.find();
		return attendees;
	} else {
		return null;
	}
});
