define(["app", "modules/drug"], function(app, Drug){
    var Course = app.module();

    Course.Model = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/api/courses',
        parse: function(response, options){
            response.drug = new Drug.Model(response.drug);

            return response;
        }
    });

    Course.Collection = Backbone.Collection.extend({
        url: '/api/courses',
        model: Course.Model
    });

    Course.Views.CourseItineraryView = Backbone.View.extend({
        template: "course-itinerary",
        manage: true
    });

    Course.Views.CourseListView = Backbone.View.extend({
        initialize: function(){
            this.model.on("add", this.addCourse, this);
            this.model.on("remove", this.removeCourse, this);

            this._subviews = [];
            this.model.each(function(course){
                this._subviews.push(new Course.Views.CourseItineraryView({model: course}));
            }, this);
        },
        manage: true,
        addCourse: function(course){
            this._subviews.push(new Course.Views.CourseItineraryView({model: course}));
        },
        removeCourse: function(course){
            //find the view associated with the course
            var v = _(this._subviews).find(function(subview){
                return subview.model == course;
            });

            v.remove();
            this._subviews = _(this._subviews).without(v);
        },
        render: function(){
            this.$el.empty();
            _(this._subviews).each(function(v){
                this.$el.append(v.render().el);
            }, this);
        }
    });

    return Course;
});