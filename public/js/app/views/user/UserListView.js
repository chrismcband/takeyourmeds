define(['backbone', 'views/user/UserItemView', 'hbs!templates/user/list', 'marionette'],
    function(Backbone, UserItemView, template){
        var UserListView = Backbone.View.extend({
            template: template,
            itemView: UserItemView,
            itemViewContainer: "tbody",
            modelEvents: {
                "change:selected": "itemSelected"
            },
            itemSelected: function(model, selected){
                if (selected) {
                    //unselect other models
                    this.collection.each(function(user){
                        if (user !== model) {
                            user.set("selected", false);
                        }
                    }, this);
                }
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

        return UserListView;
    }
);