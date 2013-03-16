define(["app"], function(app){
    var Drug = app.module();

    Drug.Model = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/api/drugs'
    });

    Drug.Collection = Backbone.Collection.extend({
        url: '/api/drugs',
        model: Drug.Model
    });

    return Drug;
});