define(['backbone', 'models/User', 'hbs!templates/user/form', 'marionette'], function(Backbone, User, template){
    var UserFormView = Backbone.Marionette.ItemView.extend({
        template: template,
        events: {
            "submit form": "saveUser",
            "click button.new": "newUser"
        },
        ui: {
            saveButton: "button.save"
        },
        saveUser: function(e){
            //set save button to loading state
            var $saveButton = this.ui.saveButton;
            $saveButton.button("loading");

            var dataArray = this.$("form").serializeArray();
            var data = {};
            _(dataArray).each(function(d){
                data[d.name] = d.value;
            });
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
                this.collection.create(data,
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
        newUser: function(e){
            this.$("form input").val("");
            this.$("button.save").button("reset");
            this.model = new User();
        },
        serializeData: function(){
            var data = this.model ? this.model.toJSON() : {};
            data.isSuperUser = data.role == 1;
            data.isPatient = data.role == 2;

            return data;
        }
    });

    return UserFormView;
});