document.addEventListener('DOMContentLoaded', async () => {
    const playerSelect = document.getElementById('playerSelect');
    const playerName = document.getElementById('playerName');
    const points = document.getElementById('points');
    const rebounds = document.getElementById('rebounds');
    const assists = document.getElementById('assists');

    const players = await fetchPlayers();

    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = `${player.first_name} ${player.last_name}`;
        playerSelect.appendChild(option);
    });

    playerSelect.addEventListener('change', async (e) => {
        const playerId = e.target.value;
        const stats = await fetchPlayerStats(playerId);

        playerName.textContent = `${players.find(p => p.id == playerId).first_name} ${players.find(p => p.id == playerId).last_name}`;
        points.textContent = stats.pts;
        rebounds.textContent = stats.reb;
        assists.textContent = stats.ast;

        updateChart(stats);
    });

    const ctx = document.getElementById('statsChart').getContext('2d');
    let statsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Points', 'Rebounds', 'Assists'],
            datasets: [{
                label: 'Player Stats',
                data: [0, 0, 0],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });

    function updateChart(stats) {
        statsChart.data.datasets[0].data = [stats.pts, stats.reb, stats.ast];
        statsChart.update();
    }
});
