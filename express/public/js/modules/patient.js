define(["app", "modules/course", "modules/base"], function(app, Course){
    var Patient = app.module();

    Patient.Model = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            courses: new Course.Collection([])
        },
        urlRoot: '/api/patients',
        parse: function(response, options){
            if (response.courses) {
                var courses = [];
                for (var i=0; i < response.courses.length; i++) {
                    courses.push(new Course.Model(response.courses[i]));
                }
                response.courses = new Course.Collection(courses);
            }
            return response;
        }
    });

    Patient.Collection = Backbone.Collection.extend({
        url: '/api/patients',
        model: Patient.Model
    });

    Patient.Views.PatientProfileView = Backbone.View.extend({
        template: "patient-profile",
        manage: true,
        serialize: function(){
            var data = this.model.toJSON();
            data.courses = data.courses.toJSON();
            return data;
        }
    });

    return Patient;
});