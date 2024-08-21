async function fetchPlayers() {
    const mockPlayers = [
        { id: 1, first_name: 'LeBron', last_name: 'James' },
        { id: 2, first_name: 'Stephen', last_name: 'Curry' },
        { id: 3, first_name: 'Kevin', last_name: 'Durant' },
        { id: 4, first_name: 'Giannis', last_name: 'Antetokounmpo' },
        { id: 5, first_name: 'Luka', last_name: 'Dončić' }
    ];

    try {
        const response = await fetch('https://www.balldontlie.io/api/v1/players');
        if (!response.ok) {
            throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        return mockPlayers;
    }
}

async function fetchPlayerStats(playerId) {
    const mockStats = {
        1: { pts: 25.3, reb: 7.4, ast: 7.8 },
        2: { pts: 30.1, reb: 5.3, ast: 6.7 },
        3: { pts: 27.8, reb: 7.1, ast: 5.9 },
        4: { pts: 29.9, reb: 11.3, ast: 5.7 },
        5: { pts: 28.4, reb: 8.9, ast: 8.7 }
    };

    try {
        const response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch player stats');
        }
        const data = await response.json();
        const stats = data.data[0];
        return {
            pts: stats.pts || 0,
            reb: stats.reb || 0,
            ast: stats.ast || 0
        };
    } catch (error) {
        console.error(error);
        return mockStats[playerId] || { pts: 0, reb: 0, ast: 0 };
    }
}
