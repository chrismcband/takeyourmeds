define(['handlebars', 'moment'], function(Handlebars, moment){
    function numDays(startDate, endDate){
        var days = moment.duration(endDate - startDate, "seconds").asDays();
        days = Math.floor(days);
        if (days != 1) {
            return days + " days";
        } else {
            return days + " day";
        }
    }

    Handlebars.registerHelper('numDays', numDays);
    return numDays;
});