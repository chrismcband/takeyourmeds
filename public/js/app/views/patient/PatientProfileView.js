define(['jquery', 'hbs!templates/patient-profile', 'backbone', 'marionette'],
    function($, template, Backbone){
        var PatientProfileView = Backbone.Marionette.ItemView.extend({
            template: template,
            serializeData: function(){
                var data = this.model.toJSON();
                data.courses = data.courses.toJSON();
                return data;
            }
        });

        return PatientProfileView;
    }
);