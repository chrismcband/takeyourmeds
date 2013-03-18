define(["app", "modules/course", "moment", "modules/base"], function(app, Course, moment){
    var Patient = app.module();

    Patient.Model = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            courses: new Course.Collection([])
        },
        urlRoot: '/api/patients',
        parse: function(response, options){
            if (response.courses) {
                var courses = [];
                for (var i=0; i < response.courses.length; i++) {
                    courses.push(new Course.Model(response.courses[i]));
                }
                response.courses = new Course.Collection(courses);
            }
            return response;
        }
    });

    Patient.Collection = Backbone.Collection.extend({
        url: '/api/patients',
        model: Patient.Model,
        comparator: function(patient){
            return patient.get("_id");
        }
    });

    Patient.Views.PatientProfileView = Backbone.View.extend({
        template: "patient-profile",
        manage: true,
        serialize: function(){
            var data = this.model.toJSON();
            data.courses = data.courses.toJSON();
            return data;
        }
    });

    Patient.Views.PatientListView = Backbone.View.extend({
        template: "patient/list",
        events: {
            "click tr": "selectPatient"
        },
        initialize: function(){
            this.model.on("add remove", this.render, this);
        },
        manage: true,
        selectPatient: function(e){
            var $row = $(e.currentTarget);
            var patientId = $row.attr("data-patient-id");
            $row.addClass("info").siblings().removeClass("info");
            this.trigger("select", patientId);
        },
        serialize: function(){
            var data = this.model.toJSON();
            return data;
        }
    });

    Patient.Views.PatientFormView = Backbone.View.extend({
        template: "patient/form",
        events: {
            "submit form": "savePatient",
            "click button.new": "newPatient"
        },
        manage: true,
        savePatient: function(e){
            //set save button to loading state
            var $saveButton = this.$("button.save");
            $saveButton.button("loading");

            var dataArray = this.$("form").serializeArray();
            var data = {};
            _(dataArray).each(function(d){
                data[d.name] = d.value;
            });
            data.dob = moment(data.dob, "YYYY-MM-DD").unix();
            if (data._id == "") {
                delete data._id;
            }

            if (data._id) {
                //editing existing patient
                this.model.save(data,
                    {
                        wait: true,
                        success: function(){
                            $saveButton.button("reset");
                        }
                    }
                );
            } else {
                //create new model using collection
                this.options.collection.create(data,
                    {
                        wait: true,
                        success: function(){
                            $saveButton.button("reset");
                        }
                    }
                );
            }

            return false;
        },
        newPatient: function(e){
            this.$("form input").val("");
        },
        serialize: function(){
            var data = this.model ? this.model.toJSON() : {};
            //format dob so date input field displays correctly
            data.dobFormatted = moment.unix(data.dob).format("YYYY-MM-DD");

            return data;
        }
    });

    return Patient;
});