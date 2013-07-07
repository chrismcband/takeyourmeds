define(['backbone', 'hbs!templates/patient/item', 'marionette'], function(Backbone, template){
    var PatientItemView = Backbone.Marionette.ItemView.extend({
        tagName: 'tr',
        template: template,
        events: {
            "click": "select",
            "click button.delete": "deletePatient"
        },
        modelEvents: {
            "change:selected": "selectedChanged"
        },
        deletePatient: function(){
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

    return PatientItemView;
});