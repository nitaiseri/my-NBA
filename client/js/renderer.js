const Renderer = function() {

    function render(players, dt_mode) {
        $(".cards").empty();
        let source;
        if (dt_mode){
            source = $('#personal-dt-template').html();
        } else {
            source = $('#personal-template').html();
        }
        const template = Handlebars.compile(source);
        const newHTML = template(players);
    
        // append our new html to the page
        $('.cards').append(newHTML);
    }


    return {
        render
    }
}