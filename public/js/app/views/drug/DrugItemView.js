define(['backbone', 'hbs!templates/drug/item', 'marionette'], function(Backbone, template){
    var DrugItemView = Backbone.Marionette.ItemView.extend({
        tagName: 'tr',
        template: template,
        events: {
            "click": "select",
            "click button.delete": "deleteDrug"
        },
        modelEvents: {
            "change:name change:description change:dosageInMG change:type": "render",
            "change:selected": "selectedChanged"
        },
        deleteDrug: function(){
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

            return data;
        }
    });

    return DrugItemView;
})