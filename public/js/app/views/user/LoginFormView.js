define(['jquery', 'backbone', 'hbs!templates/login', 'marionette'], function($, Backbone, template){
    var LoginFormView = Backbone.Marionette.ItemView.extend({
        template: template,
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

    return LoginFormView;
});