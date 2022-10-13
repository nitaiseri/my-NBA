import requests

class Player:

    def __init__(self, player_obj) -> None:
        self.first_name = player_obj["firstName"]
        self.last_name = player_obj["lastName"]
        self.person_id = player_obj["personId"]
        self.team_id = player_obj["teamId"]
        self.jersey = player_obj["jersey"]
        self.pos = player_obj["pos"]
        self.date_of_birthUTC = player_obj["dateOfBirthUTC"]
        self.dream_team = False
        self.img_url =  self.get_url()

    def get_url(self):
        return f"https://nba-players.herokuapp.com/players/{self.last_name}/{self.first_name}"

    def set_dream_team(self, dt):
        self.dream_team = dt
        
