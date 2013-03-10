(function(app){
    app.Drug = Backbone.Model.extend({
        idAttribute: "_id",
        urlRoot: '/api/drugs'
    });

    app.Drugs = Backbone.Collection.extend({
        url: '/api/drugs',
        model: app.Drug
    });

    app.Course = Backbone.Model.extend({
        idAttribute: "_id",
        urlRoot: '/api/courses',
        parse: function(response, options){
            response.drug = new app.Drug(response.drug);

            return response;
        }
    });

    app.Courses = Backbone.Collection.extend({
        url: '/api/courses',
        model: app.Course
    });

    app.Patient = Backbone.Model.extend({
        idAttribute: "_id",
        defaults: {
            courses: new app.Courses([])
        },
        urlRoot: '/api/patients',
        parse: function(response, options){
            if (response.courses) {
                var courses = [];
                for (var i=0; i < response.courses.length; i++) {
                    courses.push(new app.Course(response.courses[i]));
                }
                response.courses = new app.Courses(courses);
            }
            return response;
        }
    });

    app.Patients = Backbone.Collection.extend({
        url: '/api/patients',
        model: app.Patient
    });

    window.app = app;
})(window.app || {});