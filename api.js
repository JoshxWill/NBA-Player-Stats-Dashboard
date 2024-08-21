async function fetchPlayers() {
    try {
        const response = await fetch('https://www.balldontlie.io/api/v1/players');
        if (!response.ok) {
            throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function fetchPlayerStats(playerId) {
    try {
        const response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=${playerId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch player stats');
        }
        const data = await response.json();
        if (data.data.length > 0) {
            const stats = data.data[0];
            return {
                pts: stats.pts || 0,
                reb: stats.reb || 0,
                ast: stats.ast || 0
            };
        }
        return { pts: 0, reb: 0, ast: 0 };
    } catch (error) {
        console.error(error);
        return { pts: 0, reb: 0, ast: 0 };
    }
}
