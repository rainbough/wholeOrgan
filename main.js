Router.configure({
	autoRender: false,
	layoutTemplate: 'base',
	unload: function(){
		Session.set("lastpath",window.location.pathname);
		console.log(this);
	}
});

Router.load(function(){
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	/*$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	});*/
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
				if(this.params.route[0] == "#") this.stop();
				console.log(this.params.route);
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
