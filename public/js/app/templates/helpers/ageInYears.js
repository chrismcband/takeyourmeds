define(['handlebars'], function(Handlebars){
    function ageInYears(dob){
        var now = new Date();
        var diffInSecs = (now.getTime() / 1000) - dob;
        var oneYearInSecs = 60 * 60 * 24 * 365.25;
        var totalYears = diffInSecs / oneYearInSecs;

        return Math.floor(totalYears);
    }

    Handlebars.registerHelper('ageInYears', ageInYears);

    return ageInYears;
})