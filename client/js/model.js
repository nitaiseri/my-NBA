const MyNBA = function(){
    // Private variables
    let _players=[];
    let filtered = false;
    let dt_mode = false;

    async function newTeam(year, team) {
        _players = await $.get(`http://localhost:8000/data/?year=${year}&team=${team}`);
    }

    function getPlayerById(id) {
        return _players.find(player => player.person_id === id);
    }

    async function addToDreamTeam(id) {
        const player = getPlayerById(id);
        return await $.ajax({
            type: "POST",
            url: `http://localhost:8000/dream_team/add`,
            data: JSON.stringify(player),
            success: function(a){return}
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
        dt_mode = !dt_mode;
    }

    function getMode(){
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
            success: function(result) {
                // Do something with the result
            }
        });
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
        deleteDreamTeam,
        get_stats
    };
};