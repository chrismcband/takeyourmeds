define(["handlebars", "moment", "bootstrap"], function(Handlebars, moment){
    Handlebars.registerHelper('ageInYears', function(dob){
        var now = new Date();
        var diffInSecs = (now.getTime() / 1000) - dob;
        var oneYearInSecs = 60 * 60 * 24 * 365.25;
        var totalYears = diffInSecs / oneYearInSecs;

        return Math.floor(totalYears);
    });

    Handlebars.registerHelper('numDays', function(startDate, endDate){
        var numDays = moment.duration(endDate - startDate, "seconds").asDays();
        numDays = Math.floor(numDays);
        if (numDays != 1) {
            return numDays + " days";
        } else {
            return numDays + " day";
        }
    });

    Handlebars.registerHelper('formatTime', function(timeInSecs, format){
        if (typeof format != 'string') {
            format = 'HH:mm';
        }
        return moment().seconds(timeInSecs).format(format);
    });

    Handlebars.registerHelper('genderFields', function(gender){
        var s = '<option value="male" '+(gender=="male" ? 'selected="selected"' : '')+'>Male</option>';
        s += '<option value="female" '+(gender=="female" ? 'selected="selected"' : '')+'>Female</option>';

        return new Handlebars.SafeString(s);
    });

    /**
     * Provides iteration similar to #each but adds i (index) and iPlus1 (index + 1)
     * values to the context
     */
    Handlebars.registerHelper('iter', function(context, options) {
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
    });
});