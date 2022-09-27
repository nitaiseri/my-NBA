let players = {players:[
    {
        "first_name": "Kostas",
        "last_name": "Antetokounmpo",
        "person_id": "1628961",
        "team_id": "1610612747",
        "jersey": "37"
    },
    {
        "first_name": "Devontae",
        "last_name": "Cacok",
        "person_id": "1629719",
        "team_id": "1610612747",
        "jersey": "12"
    },
    {
        "first_name": "Kentavious",
        "last_name": "Caldwell-Pope",
        "person_id": "203484",
        "team_id": "1610612747",
        "jersey": "1"
    },
    {
        "first_name": "Alex",
        "last_name": "Caruso",
        "person_id": "1627936",
        "team_id": "1610612747",
        "jersey": "4"
    },
    {
        "first_name": "Anthony",
        "last_name": "Davis",
        "person_id": "203076",
        "team_id": "1610612747",
        "jersey": "3"
    },
    {
        "first_name": "Andre",
        "last_name": "Drummond",
        "person_id": "203083",
        "team_id": "1610612747",
        "jersey": "2"
    },
    {
        "first_name": "Jared",
        "last_name": "Dudley",
        "person_id": "201162",
        "team_id": "1610612747",
        "jersey": "10"
    },
    {
        "first_name": "Marc",
        "last_name": "Gasol",
        "person_id": "201188",
        "team_id": "1610612747",
        "jersey": "14"
    },
    {
        "first_name": "Montrezl",
        "last_name": "Harrell",
        "person_id": "1626149",
        "team_id": "1610612747",
        "jersey": "15"
    },
    {
        "first_name": "Talen",
        "last_name": "Horton-Tucker",
        "person_id": "1629659",
        "team_id": "1610612747",
        "jersey": "5"
    },
    {
        "first_name": "LeBron",
        "last_name": "James",
        "person_id": "2544",
        "team_id": "1610612747",
        "jersey": "6"
    },
    {
        "first_name": "Kyle",
        "last_name": "Kuzma",
        "person_id": "1628398",
        "team_id": "1610612747",
        "jersey": "0"
    },
    {
        "first_name": "Wesley",
        "last_name": "Matthews",
        "person_id": "202083",
        "team_id": "1610612747",
        "jersey": "9"
    },
    {
        "first_name": "Alfonzo",
        "last_name": "McKinnie",
        "person_id": "1628035",
        "team_id": "1610612747",
        "jersey": "28"
    },
    {
        "first_name": "Ben",
        "last_name": "McLemore",
        "person_id": "203463",
        "team_id": "1610612747",
        "jersey": "7"
    },
    {
        "first_name": "Markieff",
        "last_name": "Morris",
        "person_id": "202693",
        "team_id": "1610612747",
        "jersey": "88"
    },
    {
        "first_name": "Dennis",
        "last_name": "Schroder",
        "person_id": "203471",
        "team_id": "1610612747",
        "jersey": "17"
    }
]}

const my_nba = MyNBA()
players = {players: my_nba.getTeam()}

const source = $('#personal-template').html();
const template = Handlebars.compile(source);
const newHTML = template(players);

// append our new html to the page
$('.cards').append(newHTML);

$('#get-team').on('click')


$('.material-card > .mc-btn-action').click(function () {
    var card = $(this).parent('.material-card');
    var icon = $(this).children('i');
    icon.addClass('fa-spin-fast');

    if (card.hasClass('mc-active')) {
        card.removeClass('mc-active');

        window.setTimeout(function() {
            icon
                .removeClass('fa-arrow-left')
                .removeClass('fa-spin-fast')
                .addClass('fa-bars');

        }, 800);
    } else {
        card.addClass('mc-active');

        window.setTimeout(function() {
            icon
                .removeClass('fa-bars')
                .removeClass('fa-spin-fast')
                .addClass('fa-arrow-left');

        }, 800);
    }
});