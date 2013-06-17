define(['backbone', 'models/User'], function(Backbone, User){
    var Users = Backbone.Collection.extend({
        url: '/api/users',
        model: User,
        comparator: function(user){
            return user.get("_id");
        }
    });

    return Users;
});