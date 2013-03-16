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
            app.user = app.user || new User.Model();
        },

        routes: {
            "": "index",
            "login": "login"
        },

        index: function () {
            if (app.user.get("role") == 0) {
                //redirect to login
                Backbone.history.navigate("/login", true);
                return;
            }

            var patient = new Patient.Model({
                _id: '5144e71b2f89000a04000002'
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

            var loginFormView = new User.Views.LoginFormView({
                model: app.user
            });
            loginFormView.on("login", function (user) {
                app.user = new User.Model(user);
                console.log("Logged in user: ", app.user.toJSON());
                Backbone.history.navigate("", true);
            }, this);

            app.useLayout("layouts/login").setViews({
                "#main-content": loginFormView
            }).render();
        }
    });

    return Router;

});
