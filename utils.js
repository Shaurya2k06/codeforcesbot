function filterUpcomingContests(contests) {
    const now = Date.now() / 1000;
    const nextWeek = now + (7 * 24 * 60 * 60); 
    
    return contests
        .filter(contest => contest.phase === 'BEFORE')
        .filter(contest => contest.startTimeSeconds > now && contest.startTimeSeconds < nextWeek)
        .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
        .slice(0, 5); 
}

module.exports = { filterUpcomingContests };