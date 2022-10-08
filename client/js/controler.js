let players = {
    players: [
        {
            "first_name": "Lonzo",
            "last_name": "Ball",
            "person_id": "1628366",
            "team_id": "1610612747",
            "jersey": "2",
            "img_url": "https://nba-players.herokuapp.com/players/Ball/Lonzo"
        },
        {
            "first_name": "Isaac",
            "last_name": "Bonga",
            "person_id": "1629067",
            "team_id": "1610612747",
            "jersey": "17",
            "img_url": "https://andscape.com/wp-content/uploads/2017/06/nbalogo.jpg?w=700"
        },
        {
            "first_name": "Reggie",
            "last_name": "Bullock",
            "person_id": "203493",
            "team_id": "1610612747",
            "jersey": "35",
            "img_url": "https://nba-players.herokuapp.com/players/Bullock/Reggie"
        },
        {
            "first_name": "Kentavious",
            "last_name": "Caldwell-Pope",
            "person_id": "203484",
            "team_id": "1610612747",
            "jersey": "1",
            "img_url": "https://nba-players.herokuapp.com/players/Caldwell-Pope/Kentavious"
        },
        {
            "first_name": "Alex",
            "last_name": "Caruso",
            "person_id": "1627936",
            "team_id": "1610612747",
            "jersey": "4",
            "img_url": "https://nba-players.herokuapp.com/players/Caruso/Alex"
        },
        {
            "first_name": "Tyson",
            "last_name": "Chandler",
            "person_id": "2199",
            "team_id": "1610612747",
            "jersey": "5",
            "img_url": "https://nba-players.herokuapp.com/players/Chandler/Tyson"
        },
        {
            "first_name": "Josh",
            "last_name": "Hart",
            "person_id": "1628404",
            "team_id": "1610612747",
            "jersey": "3",
            "img_url": "https://nba-players.herokuapp.com/players/Hart/Josh"
        },
        {
            "first_name": "Brandon",
            "last_name": "Ingram",
            "person_id": "1627742",
            "team_id": "1610612747",
            "jersey": "14",
            "img_url": "https://nba-players.herokuapp.com/players/Ingram/Brandon"
        },
        {
            "first_name": "LeBron",
            "last_name": "James",
            "person_id": "2544",
            "team_id": "1610612747",
            "jersey": "23",
            "img_url": "https://nba-players.herokuapp.com/players/James/LeBron"
        },
        {
            "first_name": "Jemerrio",
            "last_name": "Jones",
            "person_id": "1629203",
            "team_id": "1610612747",
            "jersey": "10",
            "img_url": "https://andscape.com/wp-content/uploads/2017/06/nbalogo.jpg?w=700"
        },
        {
            "first_name": "Kyle",
            "last_name": "Kuzma",
            "person_id": "1628398",
            "team_id": "1610612747",
            "jersey": "0",
            "img_url": "https://nba-players.herokuapp.com/players/Kuzma/Kyle"
        },
        {
            "first_name": "JaVale",
            "last_name": "McGee",
            "person_id": "201580",
            "team_id": "1610612747",
            "jersey": "7",
            "img_url": "https://nba-players.herokuapp.com/players/McGee/JaVale"
        },
        {
            "first_name": "Mike",
            "last_name": "Muscala",
            "person_id": "203488",
            "team_id": "1610612747",
            "jersey": "31",
            "img_url": "https://nba-players.herokuapp.com/players/Muscala/Mike"
        },
        {
            "first_name": "Rajon",
            "last_name": "Rondo",
            "person_id": "200765",
            "team_id": "1610612747",
            "jersey": "9",
            "img_url": "https://nba-players.herokuapp.com/players/Rondo/Rajon"
        },
        {
            "first_name": "Lance",
            "last_name": "Stephenson",
            "person_id": "202362",
            "team_id": "1610612747",
            "jersey": "6",
            "img_url": "https://nba-players.herokuapp.com/players/Stephenson/Lance"
        },
        {
            "first_name": "Moritz",
            "last_name": "Wagner",
            "person_id": "1629021",
            "team_id": "1610612747",
            "jersey": "15",
            "img_url": "https://andscape.com/wp-content/uploads/2017/06/nbalogo.jpg?w=700"
        },
        {
            "first_name": "Johnathan",
            "last_name": "Williams",
            "person_id": "1629140",
            "team_id": "1610612747",
            "jersey": "19",
            "img_url": "https://andscape.com/wp-content/uploads/2017/06/nbalogo.jpg?w=700"
        }
    ]
}

const my_nba = MyNBA();
const renderer = Renderer();

$('#get-team').on('click', function () {
    const year = $("#year").val();
    const team = $("#team").val();
    if (year == "YEAR" || team == "TEAM NAME") {
        return;
    }
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