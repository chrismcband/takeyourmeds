define(['backbone', 'views/drug/DrugItemView', 'hbs!templates/drug/list', 'marionette'],
    function(Backbone, DrugItemView, template){
        var DrugListView = Backbone.Marionette.CompositeView.extend({
            template: template,
            itemView: DrugItemView,
            itemViewContainer: "tbody",
            collectionEvents: {
                "change:selected": "itemSelected"
            },
            itemSelected: function(model, selected){
                if (selected) {
                    //unselect other models
                    this.collection.each(function(drug){
                        if (drug !== model) {
                            drug.set("selected", false);
                        }
                    }, this);
                    this.trigger("itemSelected", model);
                }
            }
        });

        return DrugListView;
    }
);