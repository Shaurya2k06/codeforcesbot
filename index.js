const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const { startScheduler } = require('./scheduler');
const qrcode = require('qrcode-terminal'); 
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false 
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        
        if (qr) {
            qrcode.generate(qr, { small: true });
            console.log('Scan the QR code above with WhatsApp');
        }
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('WhatsApp bot connected!');
            startScheduler(sock);
        }
    });

    sock.ev.on('creds.update',saveCreds);

    sock.ev.on('messages.upsert', async(m)=> {
        const msg= m.messages[0];
        if(!msg.key.fromMe && msg.message) {
            const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

            if(text?.toLowerCase().includes('contests')) {
                const {getUpcomingContests} = require('./contestFetcher'); 
                const contests= await getUpcomingContests();
                await sock.sendMessage(msg.key.remoteJid, {text:contests});
            }
        }
    })
}
startBot()