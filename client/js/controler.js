const my_nba = MyNBA();
const renderer = Renderer();

//  Get team
$('#get-team').on('click', function () {
    const year = $("#year").val();
    const team = $("#team").val();
    if (year == "YEAR" || team == "TEAM NAME") {
        return;
    }
    $("#year").val("");
    $("#team").val("");
    my_nba.setTeamName(`${team} - ${year}`);
    my_nba.newTeam(year, team).then((result) => {
        players = { players: my_nba.getTeam() }
        renderer.render(players, my_nba.getMode());
    })
})

// Kobe
$('#kobe').on('click', function () {
    window.location.href = 'https://youtu.be/guMmZrnFx70?t=441';
})

// Filter
$('#filter').on('click', function () {
    my_nba.flipFilterMode();
    players = { players: my_nba.getTeam() }
    renderer.render(players, my_nba.getMode());
})

// Dream team
$('#create-d-t').on('click', function () {
    my_nba.createDreamTeam();
    players = { players: my_nba.getTeam() }
    renderer.render(players, my_nba.getMode());
})


$('#display-d-t').on('click', function () {
    my_nba.setTeamName(`Dream Team`);
    my_nba.setDreamTeam().then((result) => {
        players = { players: my_nba.getTeam() }
        renderer.render(players, my_nba.getMode());
    })
})

$('#delete-d-t').on('click', function () {
    my_nba.deleteDreamTeam().then((result) => {
        players = { players: my_nba.getTeam() }
        renderer.render(players, my_nba.getMode());
    })
})

$('#update-d-t').on('click', function () {
    my_nba.createDreamTeam();
    players = { players: my_nba.getTeam() }
    renderer.render(players, my_nba.getMode());
})

$($('body')).on('click', '.dt-button', function () {
    const card = $(this).parent('.material-card');
    var icon = $(this).children('i');
    const playerID = $(this).closest(".material-card").find("p").first().text();
    if (icon.hasClass('fa-plus')) {
        my_nba.addToDreamTeam(playerID);
        icon
            .removeClass('fa-plus')
            .addClass('fa-minus');
    } else {
        my_nba.removeFromDreamTeam(playerID);
        icon
            .removeClass('fa-minus')
            .addClass('fa-plus');
    }
});

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
        player_id = $(this).closest(".material-card").find("p").text();
        my_nba.get_stats(player_id).then((stats) => {
            renderer.renderStats($(this).closest(".material-card").find(".mc-description")[0], stats);
        });
        card.addClass('mc-active');
        window.setTimeout(function () {
            icon
                .removeClass('fa-bars')
                .removeClass('fa-spin-fast')
                .addClass('fa-arrow-left');
        }, 800);
    }
});