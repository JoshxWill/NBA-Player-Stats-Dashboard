const API_URL = 'https://www.balldontlie.io/api/v1';

async function fetchPlayers() {
    try {
        const response = await fetch(`${API_URL}/players`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}

async function fetchPlayerStats(playerId) {
    try {
        const response = await fetch(`${API_URL}/season_averages?season=2023&player_ids[]=${playerId}`);
        const data = await response.json();
        return data.data[0];
    } catch (error) {
        console.error('Error fetching player stats:', error);
    }
}
