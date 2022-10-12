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

    function renderStats(object, stats) {
        for (const stat in stats){
            let category = document.createElement("p");
            let text = document.createTextNode(`${stat}: ${stats[stat]}`);
            category.appendChild(text);
            object.appendChild(category);
        }
    }


    return {
        render, 
        renderStats
    }
}