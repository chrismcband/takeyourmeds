define(['handlebars', 'moment'], function(Handlebars, moment){

    var Time = {
        ageInYears: function(dob){
            var now = new Date();
            var diffInSecs = (now.getTime() / 1000) - dob;
            var oneYearInSecs = 60 * 60 * 24 * 365.25;
            var totalYears = diffInSecs / oneYearInSecs;

            return Math.floor(totalYears);
        },

        numDays: function(startDate, endDate){
            var numDays = moment.duration(endDate - startDate, "seconds").asDays();
            numDays = Math.floor(numDays);
            if (numDays != 1) {
                return numDays + " days";
            } else {
                return numDays + " day";
            }
        },

        formatTime: function(timeInSecs, format){
            if (typeof format != 'string') {
                format = 'HH:mm';
            }
            return moment().seconds(timeInSecs).format(format);
        }
    };

    Handlebars.registerHelper('ageInYears', Time.ageInYears);
    Handlebars.registerHelper('numDays', Time.numDays);
    Handlebars.registerHelper('formatTime', Time.formatTime);

    return Time;
});