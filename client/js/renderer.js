const Renderer = function() {

    function render(players) {
        $(".cards").empty();
        const source = $('#personal-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template(players);
    
        // append our new html to the page
        $('.cards').append(newHTML);
    }


    return {
        render
    }
}