(function($){
    var app = window.app || {};

    app.init = function(){

        //create backbone router
        var Router = Backbone.Router.extend({
            routes: {
                "": "index",
                "login": "login"
            },

            index: function(){
                console.log("In index");
                var patient = new app.Patient({
                    _id: '51321002a345ff872b000001'
                });
                patient.fetch({
                    success: function(p){
                        var patientView = new app.PatientProfileView({
                            model: patient
                        });

                        patientView.render();

                        var courseListView = new app.CourseListView({
                            model: patient.get('courses')
                        });

                        courseListView.render();
                    }
                });
            },

            login: function(){
                console.log("In login");
                var loginFormView = new app.LoginFormView();
                loginFormView.on("login", function(user){
                    app.user = new app.User(user);
                    console.log("Logged in user: ", app.user.toJSON());
                    window.location = "/";
                }, this);
                $("#main").html(loginFormView.render().el);
            }
        });

        app.router = new Router();

        $(document).on("click", "a:not([data-bypass])", function(evt) {
            var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
            var root = location.protocol + "//" + location.host + app.root;

            if (href.prop && href.prop.slice(0, root.length) === root) {
                evt.preventDefault();
                Backbone.history.navigate(href.attr, true);
            }
        });

        Backbone.history.start({ pushState: false, root: "/" });
    };

    $(function(){
        app.init();
    });


})(jQuery);