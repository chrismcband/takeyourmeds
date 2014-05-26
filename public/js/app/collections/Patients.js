define(['backbone', 'models/Patient'], function(Backbone, Patient){
    var Patients = Backbone.Collection.extend({
        url: '/api/patients',
        model: Patient,
        comparator: function(patient){
            return patient.get("_id");
        }
    });

    return Patients;
});