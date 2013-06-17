define(['backbone', 'models/Drug'], function(Backbone, Drug){
    var Course = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/api/courses',
        parse: function(response, options){
            response.drug = new Drug(response.drug);

            return response;
        }
    });

    return Course;
});