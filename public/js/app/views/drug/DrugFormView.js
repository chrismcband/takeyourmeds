define(['backbone', 'moment', 'models/Drug', 'hbs!templates/drug/form', 'marionette'],
    function(Backbone, moment, Drug, template){
        var DrugFormView = Backbone.Marionette.ItemView.extend({
            template: template,
            events: {
                "submit form": "save",
                "click button.new": "create"
            },
            save: function(e){
                //set save button to loading state
                var $saveButton = this.$("button.save");
                $saveButton.button("loading");

                var dataArray = this.$("form").serializeArray();
                var data = {};
                _(dataArray).each(function(d){
                    data[d.name] = d.value;
                });
                //delete id field if empty to invoke post instead of put
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
            create: function(e){
                this.$("form input").val("");
                this.$("button.save").button("reset");
                this.model = new Drug();
            },
            serializeData: function(){
                var data = this.model ? this.model.toJSON() : {};

                return data;
            }
        });

        return DrugFormView;
    }
);