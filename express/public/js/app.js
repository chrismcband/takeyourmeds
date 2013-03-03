(function($){
    var app = window.app || {};

    app.init = function(){
        var patient = new app.Patient({
            _id: "51321002a345ff872b000001"
        });
        patient.fetch({
            success: function(p){
                var patientView = new app.PatientProfileView({
                    model: patient
                });

                patientView.render();
            }
        });
    };

    $(function(){
        app.init();
    });


})(jQuery);