define(['jquery', 'hbs!templates/desktopHeader', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            user: function(user){
                this.model = user;
                this.render();
            },
            serializeData: function(){
                var data = this.model ? this.model.toJSON() : {};
                if (data.role && data.role == 1) {
                    data.isAdmin = true;
                }
                return data;
            }
        });
    });