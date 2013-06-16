define(["backbone"],
    function(Backbone){
        var User = Backbone.Model.extend({
            idAttribute: '_id',
            urlRoot: '/api/users',
            defaults: {
                role: 0
            },
            isAuth: function(){
                return this.get("role") > 0;
            }
        });

        return User;
    }
);