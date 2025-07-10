const axios = require('axios');
const {filterUpcomingContests} = require('./utils');

async function getUpcomingContests() {
    try {
        const response = await axios.get('https://codeforces.com/api/contest.list');
        const contests = response.data.result;
        const upcoming = filterUpcomingContests(contests);
        if (upcoming.length === 0) {
            return "Looks like theres no upcoming contests!"
        }
        let message= "Upcoming Codeforces Contests:*\n\n";
      upcoming.forEach(contest => {
            const startTime = new Date(contest.startTimeSeconds * 1000);
            const duration = Math.floor(contest.durationSeconds / 3600);
            
            message += `*${contest.name}*\n`;
            message += `${startTime.toLocaleString()}\n`;
            message += `Duration: ${duration} hours\n`;
            message += `https://codeforces.com/contest/${contest.id}\n\n`;
        });

        return message;
    } catch(error) {
        console.error("Error fetching contests:", error);
        return "Error Fetching Contest Data";
    
    }
    
}
module.exports= {getUpcomingContests};