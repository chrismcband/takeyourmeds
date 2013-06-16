define(['backbone', 'collections/Courses'], function(Backbone, Courses){
    var Patient = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            courses: new Courses([])
        },
        urlRoot: '/api/patients',
        parse: function(response, options){
            if (response.courses) {
                response.courses = new Courses(response.courses);
            }
            return response;
        }
    });

    return Patient;
});