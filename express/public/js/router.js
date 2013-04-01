define([
    // Application.
    "app",

    //Modules
    "modules/user",
    "modules/patient",
    "modules/course"
],

function (app, User, Patient, Course) {

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({
        initialize: function(){
            var that = this;
            User.sessionCheck(function(user){
                app.user = user;
                that.trigger("session", user);
            });

            //set the default app layout
            app.useLayout("layouts/main");

            app.layout.on("afterRender", function(){
                //hide elements the session user should not see
                if (app.user && app.user.get("role") == 1) {
                    app.layout.$(".role-1").show();
                }
            }, this);
        },

        routes: {
            "": "index",
            "login": "login",
            "admin/patients": "patientForm",
            "admin/users": "usersForm"
        },

        index: function () {
            if (!app.user){
                this.on("session", function(user){
                    this.index();
                }, this)
                return;
            }
            if (!app.user.isAuth()) {
                //redirect to login
                this.navigate("/login", {trigger: true, replace: true});
                return;
            }

            var patient = new Patient.Model({
                _id: '51465d91acc9f0fd07000002'
            });

            var patientView = new Patient.Views.PatientProfileView({
                model: patient
            });

            patient.fetch({
                success: function (p) {
                    var courseListView = new Course.Views.CourseListView({
                        model: patient.get('courses')
                    });

                    var layout = app.useLayout("layouts/main");

                    //remove all views
                    layout.removeView();

                    layout.setViews({
                        "#profile-container": patientView,
                        "#courses-container": courseListView
                    }).render();
                }
            });
        },

        login: function () {
            console.log("In login");

            //if already authenticated, redirect back to index
            if (app.user && app.user.isAuth()) {
                this.navigate("", {trigger: true, replace: true});
                return;
            }

            var loginFormView = new User.Views.LoginFormView({
                model: app.user
            });
            loginFormView.on("login", function (user) {
                app.user = new User.Model(user);
                console.log("Logged in user: ", app.user.toJSON());
                this.navigate("", {trigger: true});
            }, this);

            app.useLayout("layouts/main").setViews({
                "#main-content": loginFormView
            }).render();
        },

        patientForm: function(){
            //fetch patients collection
            var patients = new Patient.Collection([]);
            var patientList = new Patient.Views.PatientListView({
                model: patients
            });
            patients.fetch({update: true});

            var form = new Patient.Views.PatientFormView({
                collection: patients
            });

            patientList.on("select", function(patientId){
                form.model = patients.get(patientId);
                form.render();
            }, this);

            var layout = app.useLayout("layouts/admin");

            layout.removeView();

            layout.setViews({
                "#admin-collection-list": patientList,
                "#admin-edit-content": form
            }).render().then(function(){
                layout.$("#patients-admin").parent().addClass("active");
            });
        },

        usersForm: function(){
            //fetch users collection
            var users = new User.Collection([]);
            var userList = new User.Views.UserListView({
                model: users
            });
            users.fetch({update: true});

            var form = new User.Views.UserFormView({
                collection: users
            });

            userList.on("select", function(userId){
                form.model = users.get(userId);
                form.render();
            }, this);

            var layout = app.useLayout("layouts/admin");

            layout.removeView();

            layout.setViews({
                "#admin-collection-list": userList,
                "#admin-edit-content": form
            }).render().then(function(){
                layout.$("#users-admin").parent().addClass("active");
            });
        }
    });

    return Router;

});
