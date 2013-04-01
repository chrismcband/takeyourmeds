define(["app"], function(app){

    var User = app.module();

    User.Model = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/api/users',
        defaults: {
            role: 0
        },
        isAuth: function(){
            return this.get("role") > 0;
        }
    });

    User.Collection = Backbone.Collection.extend({
        url: '/api/users',
        model: User.Model,
        comparator: function(user){
            return user.get("_id");
        }
    });

    User.Views.LoginFormView = Backbone.View.extend({
        template: "login",
        manage: true,
        events: {
            "submit": function(e){
                var that = this;

                //submit login form using ajax
                $.ajax("/api/session", {
                    type: "POST",
                    data: this.$("form").serialize(),
                    success: function(response){
                        that.trigger("login", response);
                    }
                });

                return false;
            }
        }
    });

    User.Views.UserListView = Backbone.View.extend({
        template: "user/list",
        events: {
            "click tr": "selectUser",
            "click button.delete": "deleteUser"
        },
        initialize: function(){
            this.model.on("add remove", this.render, this);
            this.model.on("remove", function(){
                console.log("Remove event triggered in user collection");
            });
        },
        manage: true,
        selectUser: function(e){
            var $row = $(e.currentTarget);
            var userId = $row.attr("data-user-id");
            $row.addClass("info").siblings().removeClass("info");
            this.trigger("select", userId);
        },
        deleteUser: function(e){
            var userId = $(e.currentTarget).attr("data-user-id");

            this.model.get(userId).destroy({wait: true});
        },
        serialize: function(){
            var data = this.model.toJSON();
            _(data).each(function(d){
                d.passwordHidden = "";
                data.passwordHidden = "";
                if (d.password) {
                    for (var i = 0; i < d.password.length; i++) {
                        d.passwordHidden += "*";
                    }
                }
            })

            return data;
        }
    });

    User.Views.UserFormView = Backbone.View.extend({
        template: "user/form",
        events: {
            "submit form": "saveUser",
            "click button.new": "newUser"
        },
        manage: true,
        saveUser: function(e){
            //set save button to loading state
            var $saveButton = this.$("button.save");
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
        newUser: function(e){
            this.$("form input").val("");
        },
        serialize: function(){
            var data = this.model ? this.model.toJSON() : {};

            return data;
        }
    });

    User.sessionCheck = function(callback){
        var u = new User.Model();
        $.getJSON("/api/session", function(data){
            if (data) {
                u.set(data);
                callback(u);
            } else {
                callback(u);
            }
        });
    };

    return User;
});