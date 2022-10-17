from server import app
from fastapi.testclient import TestClient
  
client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200, "Fail get static files"

def test_get_team():
    # Good
    response = client.get("/players/?year=2018&team=lakers")
    assert response.status_code == 200, "cant get valid team"

def test_bad_get_team():
    response = client.get("/players/?year=2018&team=bla")
    assert response.status_code == 404, "get invalid team"

test_bad_get_team()

# def test_get_dream_team():
#     response = client.get("/")


# def test_add_player_to_dream_team():
#     response = client.get("/")


# def test_remove_player_to_dream_team():
#     response = client.get("/")


# def test_delete_dream_team():
#     response = client.get("/")

# def test_get_stats():
#     response = client.get("/")