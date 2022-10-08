const my_nba = MyNBA();
const renderer = Renderer();

//  Get team
$('#get-team').on('click', function () {
    const year = $("#year").val();
    const team = $("#team").val();
    if (year == "YEAR" || team == "TEAM NAME") {
        return;
    }
    $("#year").val("YEAR");
    $("#team").val("TEAM NAME");
    my_nba.newTeam(year, team).then((result) => {
        players = { players: my_nba.getTeam() }
        renderer.render(players, my_nba.get_mode());
    })
})

// Filter
$('#filter').on('click', function () {
    my_nba.flipFilterMode();
    players = { players: my_nba.getTeam() }
    renderer.render(players, my_nba.get_mode());
})

// Dream team
$('#create-d-t').on('click', function () {
    my_nba.create_dream_team();
    players = { players: my_nba.getTeam() }
    renderer.render(players, my_nba.get_mode());
})


$('#display-d-t').on('click', function () {
    console.log("d")
    // players = { players: my_nba.getTeam() }
    // renderer.render(players);
})

$('#delete-d-t').on('click', function () {
    console.log("del")
    // players = { players: my_nba.getTeam() }
    // renderer.render(players);
})

$('#update-d-t').on('click', function () {
    console.log("u")
    // players = { players: my_nba.getTeam() }
    // renderer.render(players);
})




// Display stats
$($('body')).on('click', '.material-card > .mc-btn-action', function () {
    var card = $(this).parent('.material-card');
    var icon = $(this).children('i');
    icon.addClass('fa-spin-fast');

    if (card.hasClass('mc-active')) {
        card.removeClass('mc-active');

        window.setTimeout(function () {
            icon
                .removeClass('fa-arrow-left')
                .removeClass('fa-spin-fast')
                .addClass('fa-bars');

        }, 800);
    } else {
        card.addClass('mc-active');

        window.setTimeout(function () {
            icon
                .removeClass('fa-bars')
                .removeClass('fa-spin-fast')
                .addClass('fa-arrow-left');

        }, 800);
    }
});