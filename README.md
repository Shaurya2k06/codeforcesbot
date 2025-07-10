# Codeforces WhatsApp Bot 🤖

A WhatsApp bot that fetches upcoming Codeforces contests and sends weekly reminders to your group chats. Simply message "contests" to get information about upcoming contests, or let the bot automatically send weekly updates every Sunday at 9 AM.

## Quick Setup

1. **Install dependencies**: `npm install`
2. **Start the bot**: `npm start`  
3. **Scan QR code** with WhatsApp to authenticate
4. **Update `.env`**: Add your group JID as `GROUP_JID=your_group_jid@g.us`

## Features

- 📅 **On-demand contests**: Type "contests" to get upcoming Codeforces contests (next 7 days)
- 📊 **Weekly reminders**: Automatic contest updates every Sunday at 9 AM
- 🔍 **Smart filtering**: Shows contest name, start time, duration, and direct links
- 📱 **WhatsApp integration**: Works with groups and personal chats

Built with Baileys WhatsApp library and the official Codeforces API.