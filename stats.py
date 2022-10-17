class Stats:

    def __init__(self, stats_obj) -> None:
        self.points = stats_obj["points_per_game"]
        self.rebounds = stats_obj["rebounds_per_game"]
        self.minutes = stats_obj["minutes_per_game"]
        self.asists = stats_obj["assists_per_game"]
        self.turnovers = stats_obj["turnovers_per_game"]
    
