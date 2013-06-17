define(['handlebars', 'moment'], function(Handlebars, moment){
    function formatTime(timeInSecs, format){
        if (typeof format != 'string') {
            format = 'HH:mm';
        }
        return moment().seconds(timeInSecs).format(format);
    }

    Handlebars.registerHelper('formatTime', formatTime);

    return formatTime;
});