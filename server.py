from os import stat
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request, status, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import requests
from player import Player


app = FastAPI()

app.mount("/client", StaticFiles(directory="client"), name="client")

teams_id = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

def get_players(data, team):
    raw_players = data["league"]["standard"]
    players = filter(lambda raw_player: raw_player["teamId"]== teams_id[team], raw_players)
    players = list(map(Player, players))
    return players

@app.get('/')
def root():
    return FileResponse('./client/index.html')


@app.get('/data/')
def get_data(year, team):
    data = requests.get(f'http://data.nba.net/data/10s/prod/v1/{year}/players.json').json()
    players = get_players(data, team)
    return players

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000,reload=True)

