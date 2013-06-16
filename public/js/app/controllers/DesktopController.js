define(['App', 'backbone', 'marionette', 'jquery', 'models/User', 'collections/Users',
    'models/Patient', 'collections/Patients',
    'views/WelcomeView', 'views/DesktopHeaderView',
    'views/patient/PatientListView', 'views/patient/PatientFormView', 'views/patient/PatientProfileView',
    'views/user/UserListView', 'views/user/UserFormView', 'views/user/LoginFormView', 'views/layout/AdminLayout'],
    function (App, Backbone, Marionette, $, User, Users, Patient, Patients,
              WelcomeView, DesktopHeaderView, PatientListView, PatientFormView, PatientProfileView,
              UserListView, UserFormView, LoginFormView, AdminLayout) {

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
                //use the admin layout for main content
                var layout = new AdminLayout();
                App.mainRegion.show(layout);

                //fetch patients collection
                var patients = new Patients([]);
                var patientList = new PatientListView({
                    collection: patients
                });
                patients.fetch({add: true});

                var form = new PatientFormView({
                    collection: patients
                });

                patientList.on("itemSelected", function(patient){
                    form.model = patient;
                    form.render();
                }, this);

                layout.listItems.show(patientList);
                layout.detail.show(form);
            },

            usersForm: function(){
                //use the admin layout for main content
                var layout = new AdminLayout();
                layout.render();
                App.mainRegion.show(layout);

                //fetch users collection
                var users = new Users([]);
                var userList = new UserListView({
                    collection: users
                });
                users.fetch({add: true});

                var form = new UserFormView({
                    collection: users
                });

                userList.on("itemSelected", function(user){
                    form.model = user;
                    form.render();
                }, this);

                layout.detail.show(form);
                layout.listItems.show(userList);
            }
        });
    }
);