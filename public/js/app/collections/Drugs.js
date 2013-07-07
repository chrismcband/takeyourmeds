define(['backbone', 'models/Drug'], function(Backbone, Drug){
    var Drugs = Backbone.Collection.extend({
        url: '/api/drugs',
        model: Drug
    });

    return Drugs;
});