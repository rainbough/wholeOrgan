// this is basically the meteor version of $(document).ready()
// follow this example (replacing static_summit with the corresponding template name) for other pages
// if you for whatever reason want to make a file ouytside of the static folder, please tell me first
Template.static_summit.rendered = function() {

	$(".help-block").popover();

	new GMaps({
  		div: '#summit_map',
  		lat: -12.043333,
  		lng: -77.028333
	});
	
}
