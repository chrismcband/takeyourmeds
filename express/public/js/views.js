(function(app, $){

    app.BaseView = Backbone.View.extend({
        serialize: function(){
            return this.model.toJSON();
        },
        render: function(){
            this.$el.html(this.template(this.serialize()));
        }
    });

    $(function(){
        app.PatientProfileView = app.BaseView.extend({
            template: Handlebars.compile($("#patient-profile-template").html()),
            el: $("#profile-container")[0],
            serialize: function(){
                console.log(this.model.get("courses"));
                var data = this.model.toJSON();
                for (var i = 0; i < data.courses.length; i++) {
                    data.courses[i] = this.model.get("courses")[i].toJSON();
                }
                return data;
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
    });

    window.app = app;
})(window.app || {}, jQuery)