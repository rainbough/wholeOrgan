// this is basically the meteor version of $(document).ready()
// follow this example (replacing static_summit with the corresponding template name) for other pages
// if you for whatever reason want to make a file ouytside of the static folder, please tell me first
Template.static_summit.rendered = function() {

	$(".help-block").popover();
	$("button").click(function(e){
		var divid = $(this).data("scrollto");		
		if(divid) {
			var trg = $("#"+divid);
			$('html, body').stop().animate({
				'scrollTop': trg.offset().top
			}, 900, 'swing', function () {
			});
		}
	});

	GoogleMaps.init(
    {
        'sensor': true, //optional
        'key': 'AIzaSyBmAR5EIZmHkwM-pVpzldi1CV6VmAWowF8', //optional
        'language': 'de' //optional
    },

    function(){
        var myLatlng = new google.maps.LatLng(41.886848,-87.62078);
        var mapOptions = {
            zoom: 15,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("summit_map"), mapOptions); 
        map.setCenter(new google.maps.LatLng( 41.889723,-87.620305 ));

        var contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<span style="font-size: 20px;">Fairmont Chicago</span>'+
			'<div id="bodyContent">'+
			'<p>Millenium Park<br>200 North Columbus Drive<br><a target="_blank" href="https://maps.google.com/maps?ie=UTF-8&q=Fairmont+Chicago,+Millennium+Park+Hotel&fb=1&gl=us&hq=Fairmont+Chicago,+Millennium+Park+Hotel&hnear=Fairmont+Chicago,+Millennium+Park+Hotel&cid=3037630965665066886&ei=bCSWUoq_GIPVkQfP9oGoCg&ved=0CPMBEPwSMAo">Get Directions</a></p>'+
			'</div>'+
			'</div>';

		var infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 400
		});

        var marker = new google.maps.Marker({
      		position: myLatlng,
      		map: map,
      		title: 'Fairmont Chicago'

  		});

  		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});

		infowindow.open(map,marker);
    }
);
}

Template.static_summit.events({
	"click button#submit_registration": function(e) {
		e.preventDefault();
		var reg_data = $("form.summit_reg").serializeFormToObj();
		console.log(reg_data);
		Meteor.call("submitSummitRegistration",reg_data,function(err,res){
			if(err){
				bootbox.alert("There was an error!<br>"+err.reason);
			} else {
				bootbox.alert("Success!<br>You have been registered for the event.")
			}
		});
	}
});
