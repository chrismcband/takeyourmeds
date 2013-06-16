define(['handlebars'], function(Handlebars){
    /**
     * Provides iteration similar to #each but adds i (index) and iPlus1 (index + 1)
     * values to the context
     */
    function iterate(context, options) {
        var fn = options.fn, inverse = options.inverse;
        var ret = "";

        if(context && context.length > 0) {
            for(var i=0, j=context.length; i<j; i++) {
                ret = ret + fn(_.extend({}, context[i], { i: i, iPlus1: i + 1 }));
            }
        } else {
            ret = inverse(this);
        }
        return ret;
    }

    Handlebars.registerHelper('iterate', iterate);

    return iterate;
});