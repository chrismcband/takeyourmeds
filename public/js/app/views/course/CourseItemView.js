define(['backbone', 'hbs!templates/course-itinerary', 'marionette'], function(Backbone, template){
    var CourseItemView = Backbone.Marionette.ItemView.extend({
        template: template
    });

    return CourseItemView;
})