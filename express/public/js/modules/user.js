define(["app"], function(app){

    var User = app.module();

    User.Model = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/api/users',
        defaults: {
            role: 0
        },
        isAuth: function(){
            return this.get("role") > 0;
        }
    });

    User.Views.LoginFormView = Backbone.View.extend({
        template: "login",
        manage: true,
        events: {
            "submit": function(e){
                var that = this;

                //submit login form using ajax
                $.ajax("/api/session", {
                    type: "POST",
                    data: this.$("form").serialize(),
                    success: function(response){
                        that.trigger("login", response);
                    }
                });

                return false;
            }
        }
    });

    User.sessionCheck = function(callback){
        var u = new User.Model();
        $.getJSON("/api/session", function(data){
            if (data) {
                u.set(data);
                callback(u);
            } else {
                callback(u);
            }
        });
    };

    return User;
});