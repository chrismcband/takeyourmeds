define(['backbone', 'moment', 'models/Patient', 'hbs!templates/patient/form', 'marionette'],
    function(Backbone, moment, Patient, template){
        var PatientFormView = Backbone.Marionette.ItemView.extend({
            template: template,
            events: {
                "submit form": "savePatient",
                "click button.new": "newPatient"
            },
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

                var that = this;

                if (data._id) {
                    //editing existing patient
                    this.model.save(data,
                        {
                            wait: true,
                            success: function(){
                                $saveButton.button("reset");
                                that.render();
                            }
                        }
                    );
                } else {
                    //create new model using collection
                    this.collection.create(data,
                        {
                            wait: true,
                            success: function(){
                                $saveButton.button("reset");
                                that.render();
                            }
                        }
                    );
                }

                return false;
            },
            newPatient: function(e){
                this.$("form input").val("");
                this.$("button.save").button("reset");
                this.model = new Patient();
            },
            serializeData: function(){
                var data = this.model ? this.model.toJSON() : {};
                //format dob so date input field displays correctly
                data.dobFormatted = moment.unix(data.dob).format("YYYY-MM-DD");
                data.isMale = data.gender == "male";

                return data;
            }
        });

        return PatientFormView;
    }
);