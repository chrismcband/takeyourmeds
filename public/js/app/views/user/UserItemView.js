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
        }
    });

    return UserItemView;
})