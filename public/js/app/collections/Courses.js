define(['backbone', 'models/Course'], function(Backbone, Course){
    var Courses = Backbone.Collection.extend({
        url: '/api/courses',
        model: Course
    });

    return Courses;
});