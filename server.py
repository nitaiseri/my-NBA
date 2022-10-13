# from functools import cache
from os import stat
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request, status, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import requests
from player import Player
from stats import Stats
from tools import json_under_to_camel


app = FastAPI()

app.mount("/client", StaticFiles(directory="client"), name="client")

teams_id = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

dream_team = []

def is_in_dream_team(id):
    for player in dream_team:
        if player.person_id == id:
            return True
    return False

def get_players(data, team):
    raw_players = data["league"]["standard"]
    players = filter(lambda raw_player: raw_player["teamId"]== teams_id[team], raw_players)
    players = list(map(Player, players))
    for player in players:
        player.set_dream_team(is_in_dream_team(player.person_id))
    return players

@app.get('/')
def root():
    return FileResponse('./client/index.html')

@app.get('/data/')
def get_data(year, team):
    data = requests.get(f'http://data.nba.net/data/10s/prod/v1/{year}/players.json').json()
    players = get_players(data, team)
    return players

@app.get('/dream_team/')
def get_dream_team(): 
    return dream_team

@app.post('/dream_team/')
async def add_player_to_dream_team(request: Request):
    player = await request.json()
    player = Player(json_under_to_camel(player))
    player.set_dream_team(True)
    dream_team.append(player)

@app.delete('/dream_team/{id}')
async def delete_player_from_dt(id):
    index = None
    for i, player in enumerate(dream_team):
        if player.person_id == id:
            index = i 
            break
    if index is not None:
        del dream_team[index]


@app.delete('/dream_team/')
def delete_dream_team():
    dream_team.clear()

@app.get('/stats/', status_code=status.HTTP_200_OK)
def get_statistics(first_name, last_name):
    stats = requests.get(f'https://nba-players.herokuapp.com/players-stats/{last_name}/{first_name}')
    try:
        stats.raise_for_status()
        stats = stats.json()
        return Stats(stats)
    except:
        raise HTTPException(status_code=500)

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000,reload=True)

