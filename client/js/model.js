const MyNBA = function(){
    // Private variables
    let _players=[];
    let filtered = false;

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

    return {
        newTeam, 
        getTeam, 
        flipFilterMode, 
    };
};