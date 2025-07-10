const cron = require('node-cron');
const { getUpcomingContests } = require('./contestFetcher');
let botInstance = null;
function startScheduler(sock) {
    botInstance = sock;
    cron.schedule('0 9 * * 0', async () => {
        console.log('Sending weekly contest reminder...');
        await sendWeeklyReminder();
    });
    console.log('Contest scheduler started! Weekly reminders on Sundays at 9 AM.');
}
async function sendWeeklyReminder() {
    if (!botInstance) return;
    
    try {
        const contests = await getUpcomingContests();
        const groupJid = process.env.GROUP_JID || 'YOUR_GROUP_JID@g.us';
        await botInstance.sendMessage(groupJid, { 
            text: `*Weekly Contest Update*\n\n${contests}` 
        });
        console.log('Weekly reminder sent successfully!');
    } catch (error) {
        console.error('Error sending weekly reminder:', error);
    }
}

module.exports = { startScheduler };