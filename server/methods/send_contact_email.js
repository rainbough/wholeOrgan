Meteor.methods({
	"sendContactEmail":function(email_body,sender_email,sender_name){
		Email.send({
			from: sender_email,
			to: "jackson@landesbioscience.com",
			subject: "WholeOrgan Contact Email: "+sender_name,
			text: email_body
		});
	}
});
