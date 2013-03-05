(function(app, $){

    app.BaseView = Backbone.View.extend({
        serialize: function(){
            return this.model.toJSON();
        },
        render: function(){
            this.$el.html(this.template(this.serialize()));

            return this;
        }
    });

    $(function(){
        app.PatientProfileView = app.BaseView.extend({
            template: Handlebars.compile($("#patient-profile-template").html()),
            el: $("#profile-container")[0],
            serialize: function(){
                var data = this.model.toJSON();
                data.courses = data.courses.toJSON();
                return data;
            }
        });

        app.CourseItineraryView = app.BaseView.extend({
            template: Handlebars.compile($("#course-itinerary-template").html())
        });

        app.CourseListView = app.BaseView.extend({
            el: $("#courses-container"),
            initialize: function(){
                this.model.on("add", this.add, this);
                this.model.on("remove", this.remove, this);

                this._subviews = [];
                this.model.each(function(course){
                    this._subviews.push(new app.CourseItineraryView({model: course}));
                }, this);
            },
            add: function(course){
                this._subviews.push(new app.CourseItineraryView({model: course}));
            },
            remove: function(course){
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

        Handlebars.registerHelper('ageInYears', function(dob){
            var now = new Date();
            var diffInSecs = (now.getTime() / 1000) - dob;
            var oneYearInSecs = 60 * 60 * 24 * 365.25;
            var totalYears = diffInSecs / oneYearInSecs;

            return Math.floor(totalYears);
        });

        Handlebars.registerHelper('numDays', function(startDate, endDate){
            var numDays = moment.duration(endDate - startDate, "seconds").asDays();
            numDays = Math.floor(numDays);
            if (numDays != 1) {
                return numDays + " days";
            } else {
                return numDays + " day";
            }
        });

        Handlebars.registerHelper('formatTime', function(timeInSecs, format){
            if (typeof format != 'string') {
                format = 'HH:mm';
            }
            return moment().seconds(timeInSecs).format(format);
        });
    });

    window.app = app;
})(window.app || {}, jQuery)