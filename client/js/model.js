const MyNBA = function () {
    // Private variables
    let _players = [];
    let teamName = "";
    let filtered = false;
    let dt_mode = false;

    function setTeamName(name) {
        teamName = name;
    }

    function getTeamName() {
        return teamName;
    }

    async function newTeam(year, team) {
        _players = await $.get(`http://localhost:8000/players/?year=${year}&team=${team}`);
    }

    function getPlayerById(id) {
        return _players.find(player => player.person_id === id);
    }

    async function addToDreamTeam(id) {
        const player = getPlayerById(id);
        return await $.ajax({
            type: "POST",
            url: `http://localhost:8000/dream_team/`,
            data: JSON.stringify(player),
            success: function (a) { return }
        })
    }

    async function removeFromDreamTeam(playeId) {
        return await $.ajax({
            type: "DELETE",
            url: `http://localhost:8000/dream_team/${playeId}`,
            success: function (a) { return }
        })
    }

    function getTeam() {
        if (!filtered) {
            return _players;
        }
        else {
            return _players.filter(player => player.date_of_birthUTC !== "");
        }
    }

    function flipFilterMode() {
        filtered = !filtered;
    }

    function createDreamTeam() {
        $("#create-d-t").prop("disabled", true);
        dt_mode = !dt_mode;
    }

    function getMode() {
        return dt_mode;
    }

    async function setDreamTeam() {
        _players = await $.get(`http://localhost:8000/dream_team/`);
        dt_mode = false
    }

    async function deleteDreamTeam() {
        await $.ajax({
            url: 'http://localhost:8000/dream_team/',
            type: 'DELETE',
            success: function (result) {
                // Do something with the result
            }
        });
        $("#create-d-t").prop("disabled", false);
        dt_mode = false;
        _players = [];
    }

    async function get_stats(player_id) {
        const player = getPlayerById(player_id)
        return await $.get(`http://localhost:8000/stats/?first_name=${player["first_name"]}&last_name=${player["last_name"]}`);
    }

    return {
        newTeam,
        getTeam,
        flipFilterMode,
        createDreamTeam,
        getMode,
        setDreamTeam,
        addToDreamTeam,
        removeFromDreamTeam,
        deleteDreamTeam,
        get_stats,
        setTeamName,
        getTeamName
    };
};