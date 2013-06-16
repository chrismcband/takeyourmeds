define(['App', 'backbone', 'marionette', 'jquery', 'models/User', 'collections/Users',
    'models/Patient', 'collections/Patients',
    'views/WelcomeView', 'views/DesktopHeaderView',
    'views/patient/PatientListView', 'views/patient/PatientFormView', 'views/patient/PatientProfileView',
    'views/user/UserListView', 'views/user/UserFormView', 'views/user/LoginFormView'],
    function (App, Backbone, Marionette, $, User, Users, Patient, Patients,
              WelcomeView, DesktopHeaderView, PatientListView, PatientFormView, PatientProfileView,
              UserListView, UserFormView, LoginFormView) {

        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                App.headerRegion.show(new DesktopHeaderView());

                var that = this;
                this.sessionCheck(function(user){
                    App.user = user;
                    if (App.user.isAuth()) {
                        that.index();
                    } else {
                        that.login();
                    }
                });

    //            app.layout.on("afterRender", function(){
    //                //hide elements the session user should not see
    //                if (app.user && app.user.get("role") == 1) {
    //                    app.layout.$(".role-1").show();
    //                }
    //            }, this);

            },

            sessionCheck: function(callback) {
                var u = new User();
                $.getJSON("/api/session", function(data){
                    if (data) {
                        u.set(data);
                        callback(u);
                    } else {
                        callback(u);
                    }
                });
            },

            //gets mapped to in AppRouter's appRoutes
            index:function () {
//                App.mainRegion.show(new WelcomeView());

                if (!App.user){
                    this.on("session", function(user){
                        this.index();
                    }, this)
                    return;
                }
                if (!App.user.isAuth()) {
                    //redirect to login
                    App.appRouter.navigate("/login", {trigger: true, replace: true});
                    return;
                }

                var patient = new Patient({
                    _id: '51465d91acc9f0fd07000002'
                });

                var patientView = new PatientProfileView({
                    model: patient
                });

                patient.fetch({
                    success: function (p) {
                        App.mainRegion.show(patientView);
//                        var courseListView = new Course.Views.CourseListView({
//                            model: patient.get('courses')
//                        });
//
//                        var layout = app.useLayout("layouts/main");
//
//                        //remove all views
//                        layout.removeView();
//
//                        layout.setViews({
//                            "#profile-container": patientView,
//                            "#courses-container": courseListView
//                        }).render();
                    }
                });
            },

            login: function () {
                console.log("In login");

                //if already authenticated, redirect back to index
                if (App.user && App.user.isAuth()) {
                    App.appRouter.navigate("", {trigger: true, replace: true});
                    return;
                }

                var loginFormView = new LoginFormView({
                    model: App.user
                });
                App.mainRegion.show(loginFormView);

                loginFormView.on("login", function (user) {
                    App.user = new User(user);
                    console.log("Logged in user: ", App.user.toJSON());
                    App.appRouter.navigate("", {trigger: true});
                }, this);
            },

            patientForm: function(){
                //fetch patients collection
                var patients = new Patients([]);
                var patientList = new PatientListView({
                    model: patients
                });
                patients.fetch({update: true});

                var form = new PatientFormView({
                    collection: patients
                });

                patientList.on("select", function(patientId){
                    form.model = patients.get(patientId);
                    form.render();
                }, this);

//                var layout = app.useLayout("layouts/admin");
//
//                layout.removeView();
//
//                layout.setViews({
//                    "#admin-collection-list": patientList,
//                    "#admin-edit-content": form
//                }).render().then(function(){
//                    layout.$("#patients-admin").parent().addClass("active");
//                });
            },

            usersForm: function(){
                console.log("In usersForm");
                //fetch users collection
                var users = new Users([]);
                var userList = new UserListView({
                    model: users
                });
                users.fetch({update: true});

                var form = new UserFormView({
                    collection: users
                });

                userList.on("select", function(userId){
                    form.model = users.get(userId);
                    form.render();
                }, this);



//                var layout = app.useLayout("layouts/admin");
//
//                layout.removeView();
//
//                layout.setViews({
//                    "#admin-collection-list": userList,
//                    "#admin-edit-content": form
//                }).render().then(function(){
//                    layout.$("#users-admin").parent().addClass("active");
//                });
            }
        });
    }
);