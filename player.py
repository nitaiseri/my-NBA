import requests

class Player:

    def __init__(self, player_obj) -> None:
        self.first_name = player_obj["firstName"]
        self.last_name = player_obj["lastName"]
        self.person_id = player_obj["personId"]
        self.team_id = player_obj["teamId"]
        self.jersey = player_obj["jersey"]
        self.position = player_obj["pos"]
        self.birth_day = player_obj["dateOfBirthUTC"]
        self.dream_team = False
        self.img_url =  self.get_url()


    def get_url(self):
        # if len(requests.get(f'https://nba-players.herokuapp.com/players/{self.last_name}/{self.first_name}')._content) == 60:
        #     return "https://andscape.com/wp-content/uploads/2017/06/nbalogo.jpg?w=700"
        return f"https://nba-players.herokuapp.com/players/{self.last_name}/{self.first_name}"

        
