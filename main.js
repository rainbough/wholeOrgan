Router.configure({
	autoRender: false,
	layoutTemplate: 'base'
});

Router.load(function(){
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});

if (Meteor.isClient) {
	Router.map(function(){
		this.route('home',{
			path:'/',
			template:'home'
		});
		this.route('static',{
			path:"/:route",
			before:function(){
				var staticName = "static_"+this.params.route;
				if(Template[staticName]) {
					this.template = staticName;
				} else {
					Router.go('home');
					this.stop();
				}
			}
		});
	});
}

if (Meteor.isServer) {
}
