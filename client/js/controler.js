const my_nba = MyNBA();
const renderer = Renderer();

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
        renderer.render(players);
    })
})

$('#filter').on('click', function () {
    my_nba.flipFilterMode();
    players = { players: my_nba.getTeam() }
    renderer.render(players);
})


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