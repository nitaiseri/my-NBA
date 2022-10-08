const MyNBA = function(){
    // Private variables
    let _players=[];
    let filtered = false;
    let dt_mode = false;

    async function newTeam(year, team) {
        _players = await $.get(`http://localhost:8000/data/?year=${year}&team=${team}`);
    }

    function getTeam() {
        if (!filtered) {
            return _players;
        }
        else {
            return _players.filter(player => player.birth_day !== "");
        }
    }

    function flipFilterMode() {
        filtered = !filtered;
    }

    function create_dream_team() {
        dt_mode = !dt_mode;
    }

    function get_mode(){
        return dt_mode;
    }

    return {
        newTeam, 
        getTeam, 
        flipFilterMode,
        create_dream_team, 
        get_mode
    };
};