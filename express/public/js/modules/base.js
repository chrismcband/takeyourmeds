define(["handlebars", "moment"], function(Handlebars, moment){
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
        var s = '<option value="male" '+(gender=="male" ? 'selected="selected"' : '')+'/>';
        s += '<option value="female" '+(gender=="female" ? 'selected="selected"' : '')+'/>';

        return s;
    });
});