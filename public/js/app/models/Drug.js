define(['backbone'], function(Backbone){
    var Drug = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/api/drugs'
    });

    return Drug;
});