define(['backbone', 'views/patient/PatientItemView', 'hbs!templates/patient/list', 'marionette'],
    function(Backbone, PatientItemView, template){
        var PatientListView = Backbone.Marionette.CompositeView.extend({
            template: template,
            itemView: PatientItemView,
            itemViewContainer: "tbody",
            modelEvents: {
                "change:selected": "itemSelected"
            },
            itemSelected: function(model, selected){
                if (selected) {
                    //unselect other models
                    this.collection.each(function(patient){
                        if (patient !== model) {
                            patient.set("selected", false);
                        }
                    }, this);
                }
            }
        });

        return PatientListView;
    }
);