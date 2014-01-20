Attendees = new Meteor.Collection("attendees");

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
	if(!window.console) window.console={log:function(hi){return hi;}};
	Router.map(function(){
		this.route('home',{
			path:'/',
			template:'home'
		});
		this.route('admin_login',{
			path:'/admin_login'
		});
		this.route('attendee_list',{
			path:"/admin/attendee_list",
			before:function(){
				this.subscribe('currentUser').wait();
				if(!this.ready()) return;
				if(!Roles.userIsInRole(Meteor.user(),['admin'])){
					this.redirect(Router.routes.admin_login.path());
					this.stop(); 
				} else {
					this.subscribe('attendees').wait();
					if(!this.ready()) return;
				}
			},
			data:function(){
				return {attendees:Attendees.find().fetch()};
			}
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
	Template.admin_login.events({
		'submit .admin_login_form' : function(e, t){
			e.preventDefault();
			var email = t.find('[name="username"]').value
				, password = t.find('[name="password"]').value;
			console.log(email+" | "+password);
			Meteor.loginWithPassword(email, password, function(err){
				if (err) {
					console.log(err);
					alert("Error logging in!\nYou may have misspelled your email or password.\nPlease try again.");
				} else {
					Router.go("/admin/attendee_list");
				}
			});
			return false; 
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function(){
		var base_admin_id;
		var base_admin = Meteor.users.find({"emails.address":"admin@700forscience.com"}).fetch();
		if(!base_admin.length > 0) base_admin_id = Accounts.createUser({email:"admin@700forscience.com",password:"700admin",profile:{first_name:"SfS",last_name:"Admin"}})
		else base_admin_id = base_admin['_id'];
		if (base_admin_id) Roles.addUsersToRoles([base_admin_id], ['admin']);
		if(!Roles.userIsInRole([base_admin_id],['approved'])) Roles.addUsersToRoles([base_admin_id], ['approved']);
	});
}
