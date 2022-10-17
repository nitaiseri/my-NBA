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

# Data

dream_team = []

# Private Functions

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

# def input_validation_for_team(year, team)


# Routes

@app.get('/')
def root():
    return FileResponse('./client/index.html')

@app.get('/players/', status_code=status.HTTP_200_OK)
def get_data(year, team):
    data = requests.get(f'http://data.nba.net/data/10s/prod/v1/{year}/players.json')
    try:
        data.raise_for_status()
        data = data.json()
        players = get_players(data, team)
        return players
    except:
        if data.status_code == 404:
            raise HTTPException(status_code=data.status_code)
        raise HTTPException(status_code=data.status_code, detail="Invalid parameters")

@app.get('/dream_team/', status_code=status.HTTP_200_OK)
def get_dream_team(): 
    return dream_team

@app.post('/dream_team/', status_code=status.HTTP_201_CREATED)
async def add_player_to_dream_team(request: Request, response: Response):
    try:
        player = await request.json()
        player = Player(json_under_to_camel(player))
        player.set_dream_team(True)
        dream_team.append(player)
        return player
    except:
        response.status_code = status.HTTP_400_BAD_REQUEST

@app.delete('/dream_team/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_player_from_dt(id):
    index = None
    for i, player in enumerate(dream_team):
        if player.person_id == id:
            index = i 
            break
    if index is not None:
        del dream_team[index]
    else:
        raise HTTPException(status_code=404, detail="No such player in Dream Team")

@app.delete('/dream_team/', status_code=status.HTTP_204_NO_CONTENT)
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

