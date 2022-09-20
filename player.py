class Player:

    def __init__(self, player_obj) -> None:
        self.first_name = player_obj["firstName"]
        self.last_name = player_obj["lastName"]
        self.person_id = player_obj["personId"]
        self.team_id = player_obj["teamId"]
        self.jersey = player_obj["jersey"]
    