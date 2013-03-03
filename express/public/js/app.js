(function($){
    var app = window.app || {};

    app.init = function(){
        var drugs = new app.Drugs([]);

        drugs.fetch({
            success: function(results){
                results.each(function(drug){
                    console.log(drug);
                });
            }
        });

        var courses = new app.Courses([]);

        courses.fetch({
            success: function(courses){
                var patient = new app.Patient({
                    _id: "51321002a345ff872b000001"
                });
                patient.fetch({
                    success: function(p){
                        p.set("courses", courses);
                    }
                });
            }
        });
    };

    app.init();

})(jQuery);