const MyNBA = function(){
    // Private variables
    let _players=[];


    async function newTeam(year, team) {
        _players = await $.get(`http://localhost:8000/data/?year=${year}&team=${team}`);
    }

    function getTeam() {
        return _players;
    }

    return {
        newTeam, 
        getTeam
    };
};