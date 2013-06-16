define(['backbone', 'hbs!templates/user/item', 'marionette'], function(Backbone, template){
    var UserItemView = Backbone.Marionette.ItemView.extend({
        tagName: 'tr',
        template: template,
        events: {
            "click": "select",
            "click button.delete": "deleteUser"
        },
        modelEvents: {
            "change:selected": "selectedChanged"
        },
        deleteUser: function(){
            this.model.destroy({wait: true});
        },
        select: function(){
            this.model.set("selected", true);
        },
        selectedChanged: function(model, selected){
            if (selected) {
                this.$el.addClass("info");
            } else {
                this.$el.removeClass("info");
            }
        },
        serializeData: function(){
            var data = this.model.toJSON();
            data.passwordHidden = "";
            if (data.password) {
                for (var i = 0; i < data.password.length; i++) {
                    data.passwordHidden += "*";
                }
            }
            data.roleName = data.role == 1 ? "Super user" : "Patient";

            return data;
        }
    });

    return UserItemView;
})