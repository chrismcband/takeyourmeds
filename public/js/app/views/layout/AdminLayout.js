define(['backbone', 'hbs!templates/layout/admin', 'marionette'], function(Backbone, template){
    var AdminLayout = Backbone.Marionette.Layout.extend({
        template:template,
        regions: {
            listItems: "#admin-collection-list",
            detail: "#admin-edit-content"
        },
        setActiveTab: function(tab){
            this.$("#"+tab+"-admin").parent().addClass("active")
                .siblings().removeClass("active");
        }
    });

    return AdminLayout;
});