define(['handlebars'], function(Handlebars){
    /**
     * Operates over a series of select options tags and marks the selected option.
     */
    function select( value, options ){
        var $el = $('<select />').html( options.fn(this) );
        $el.find('[value=' + value + ']').attr({'selected':'selected'});
        return $el.html();
    }

    Handlebars.registerHelper('select', select);

    return select;
});