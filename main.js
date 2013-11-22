Router.configure({
	autoRender: false,
	layoutTemplate: 'base'
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
