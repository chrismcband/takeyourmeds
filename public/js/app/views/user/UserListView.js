define(['backbone', 'views/user/UserItemView', 'hbs!templates/user/list', 'marionette'],
    function(Backbone, UserItemView, template){
        var UserListView = Backbone.Marionette.CompositeView.extend({
            template: template,
            itemView: UserItemView,
            itemViewContainer: "tbody",
            collectionEvents: {
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
                    this.trigger("itemSelected", model);
                }
            }
        });

        return UserListView;
    }
);