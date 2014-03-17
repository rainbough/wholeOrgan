Meteor.methods({
	"sendContactEmail":function(email_body,sender_email,sender_name){
		Email.send({
			from: sender_email,
			to: "cwylie@landesbioscience.com",
			subject: "WholeOrgan Contact Email: "+sender_name,
			text: email_body
		});
	}
});

Meteor.methods({
	"sendVerificationEmail":function(registrant_email,email_body){
		Email.send({
			from:"noreply@wholeorgan.org",
			to: registrant_email,
			subject:"WholeOrgan: Thank you for your RSVP!",
			html:email_body
		});
	}
});
