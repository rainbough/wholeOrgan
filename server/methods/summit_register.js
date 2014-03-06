Meteor.methods({
	"subscribeMailchimp": function(email) {
		var apiKey = "e9fd5b0cb4d88eb584905f36b65e13b7-us3";
		var listId = "73e079ba6d";
		var apiEndPoint = apiKey.slice(-3); // Pull appropriate api endpoint datacenter from apiKey http://apidocs.mailchimp.com/api/rtfm/#api-endpoints
		var url = "http://"+ apiEndPoint +".api.mailchimp.com/1.3/?method=listSubscribe&apikey="+ apiKey +"&id="+ listId +"&email_address="+ encodeURIComponent(email) +"&output=json";
		//synchronous POST
		var result = HTTP.post(url, {timeout:30000});
		if(result.statusCode==200) {
			var respJson = JSON.parse(result.content);
			console.log("response received.");
			return respJson;
		} else {
			// TODO: Add better error handling
			//if(result.statusCode==502) {
			//  some stuff;
			//} else {
			//  some stuff;
			//}
			console.log("Response issue: ", result.statusCode);
			var errorJson = JSON.parse(result.content);
			throw new Meteor.Error(result.statusCode, errorJson.error);
		}
	},
	"submitSummitRegistration":function(data){
		_.each(data,function(o,k){
			if (k != "subscribe") {
				if(o.length < 1) throw new Meteor.Error(403,"One or more fields was not filled out.");
			}
		});
		if(data.inv_code.toUpperCase() != "57WRQL") throw new Meteor.Error(403,"Invalid invitation code.");
		var attendee_exists = Attendees.find({"email":data.email}).fetch();
		if(attendee_exists.length > 0) throw new Meteor.Error(403,"An attendee with that email address already exists.");
		if(data.subscribe == "on") {
			Meteor.call("subcribeMailchimp",data.email,function(err,res){
				if(err) console.log(err);
				else console.log("mailchimp subcription success");
			});
		}
		var attendee_id = Attendees.insert(data);
		return attendee_id;
	}
});
