define(['backbone', 'views/CourseItemView', 'marionette'], function(Backbone, CourseItemView){
    var CourseListView = Backbone.Marionette.CollectionView.extend({
        itemView: CourseItemView
    });

    return CourseListView;
});