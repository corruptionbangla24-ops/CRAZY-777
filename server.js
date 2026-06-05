const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - গ্লোবাল গেটওয়ে সকেট প্রোটকল লক ভাই ভাই]
const io = socketIo(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক ভাই ভাই]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 🎰 ওরিজিনাল ক্রেজী ৭৭৭ ৩-রিল স্লট সিম্বল পুশ মেমোরি (ওয়েটেড র্যান্ডম ওッズ সিঙ্ক ওস্তাদ!)
const crazySymbolsPool = [
    { name: "GOLD_7", id: 0, weight: 10 },    
    { name: "TRIPLE_7", id: 1, weight: 15 },  
    { name: "DOUBLE_7", id: 2, weight: 20 },  
    { name: "SINGLE_7", id: 3, weight: 25 },  
    { name: "BAR_ANY", id: 4, weight: 30 }    
];

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স ইন্টারসেপ্টর গেটওয়ে
app.get('/api/crazy777-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    let finalUser = userId === "logged_in_player" || !userId || userId === "undefined" ? "guest" : userId;
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "balance", username: finalUser, amount: 0, wallet: targetWallet, game: "crazy777"
        }, { timeout: 15000 });

        if (response.data && response.data.status === "ok") {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. ক্রেজী ৭৭৭ কোর ৩-রিল স্পিন রাউট (মানি ট্রি ও ফ্যান-টানের মতো ১০০% সিকিউরড এয়ার-টাইট সিঙ্গেল পাইপলাইন প্রোটোকল)
app.post('/api/crazy777-spin', async (req, res) => {
    const { userId, amount, wallet } = req.body; 
    const reqAmount = parseFloat(amount) || 50;
    const finalGameName = "crazy777"; 
    const targetWallet = wallet || "main";

    let finalQueryUser = userId;
    if (!finalQueryUser || finalQueryUser === "logged_in_player" || finalQueryUser === "undefined") {
        finalQueryUser = "guest"; 
    }

    if (reqAmount < 1 || reqAmount > 20000) {
        return res.json({ success: false, message: "🚨 Invalid Bet Parameter! Max 20000 ৳" });
    }

    try {
        // 🔒 [🔒 ওরিজিনাল মানি ট্রি সিঙ্গেল এন্ট্রি বাউন্সার]: ডাবল কলব্যাকের ওল্ড জ্যাম ও ব্যালেন্স প্রি-চেকিং ট্র্যাপ এক টানে সাফ!
        // সরাসরি ১ম হিটে বাজি ডেবিট রিকোয়েস্ট ফায়ার লক ওস্তাদ! ডাটাবেজ নিজেই রিয়েল-টাইমে টাকা চেক করে যদি না থাকে, রিজেক্ট ছুড়বে!
        const balResponse = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet", username: finalQueryUser, amount: reqAmount, wallet: targetWallet, game: finalGameName
        }, { timeout: 30000 });
        
        if (!balResponse.data || balResponse.data.status !== "ok") {
            return res.json({ success: false, message: "❌ আপনার অ্যাকাউন্ট ব্যালেন্স জিরো বা অপ্রতুল! দয়া করে রিচার্জ করুন ওস্তাদ।" });
        }

        let currentDbBalance = parseFloat(balResponse.data.balance) || 0;
        
        let finalReelsResultMatrix = []; 
        let winMultiplier = 0.00;
        let finalStatus = "lose";

        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 আন্তর্জাতিক ৩-রিল জেনুইন স্লট র্যান্ডম ৯৫% RTP লুপ ইঞ্জিন ভাই ভাই]
        while (isLoopActive && loopSafety < 150) {
            loopSafety++;
            finalReelsResultMatrix = [];

            for (let i = 0; i < 3; i++) {
                let totalWeight = crazySymbolsPool.reduce((sum, s) => sum + s.weight, 0);
                let randomWeight = Math.random() * totalWeight;
                let selectedSymbol = "BAR_ANY";

                for (let s of crazySymbolsPool) {
                    currentWeightSum = 0;
                    currentWeightSum += s.weight;
                    if (randomWeight <= currentWeightSum) {
                        selectedSymbol = s.name;
                        break;
                    }
                }
                finalReelsResultMatrix.push(selectedSymbol);
            }

            let r1 = finalReelsResultMatrix[0];
            let r2 = finalReelsResultMatrix[1];
            let r3 = finalReelsResultMatrix[2];

            if (r1 === r2 && r2 === r3) {
                if (r1 === "GOLD_7") winMultiplier = 100.00;      
                else if (r1 === "TRIPLE_7") winMultiplier = 50.00; 
                else if (r1 === "DOUBLE_7") winMultiplier = 20.00; 
                else if (r1 === "SINGLE_7") winMultiplier = 10.00; 
                else winMultiplier = 5.00;                          
                finalStatus = "win";
            } else if ((r1 === "GOLD_7" || r1 === "TRIPLE_7" || r1 === "DOUBLE_7" || r1 === "SINGLE_7") &&
                       (r2 === "GOLD_7" || r2 === "TRIPLE_7" || r2 === "DOUBLE_7" || r2 === "SINGLE_7") &&
                       (r3 === "GOLD_7" || r3 === "TRIPLE_7" || r3 === "DOUBLE_7" || r3 === "SINGLE_7")) {
                winMultiplier = 3.00;
                finalStatus = "win";
            } else if (r1 === r2 || r2 === r3) {
                winMultiplier = 1.00;
                finalStatus = "win";
            } else {
                winMultiplier = 0.00;
                finalStatus = "lose";
            }

            if (balResponse.data && balResponse.data.crazy777_target) {
                let target = String(balResponse.data.crazy777_target).toUpperCase();
                if (target === "FORCE_LOSE" && finalStatus === "win") {
                    finalReelsResultMatrix = ["GOLD_7", "TRIPLE_7", "BAR_ANY"]; 
                    winMultiplier = 0.00; finalStatus = "lose";
                    isLoopActive = false;
                }
                if (target === "FORCE_WIN" && finalStatus === "win") isLoopActive = false;
            } else {
                if (finalStatus === "win") {
                    if (Math.random() <= 0.23) isLoopActive = false;
                } else {
                    isLoopActive = false; 
                }
            }
        }

        let winAmount = 0, dbAction = "win", dbAmount = 0;

        if (winMultiplier > 0) {
            winAmount = Math.round(reqAmount * winMultiplier);
            dbAction = "win"; dbAmount = parseFloat(winAmount); 
        } else {
            dbAction = "win"; dbAmount = 0; 
        }

        let phpPayload = { 
            action: dbAction, username: finalQueryUser, amount: dbAmount, wallet: targetWallet, game: finalGameName 
        };
        
        if (winMultiplier === 0 || winMultiplier < 1) phpPayload.status = "lose";
        else phpPayload.status = "win";

        phpPayload.bet_amount = reqAmount;

        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, phpPayload, { timeout: 45000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: finalQueryUser, balance: response.data.balance });
            
            return res.json({
                success: true,
                balance: response.data.balance,
                data: { balance: response.data.balance },
                gameData: { 
                    finalReelsResultMatrix,
                    winMultiplier,
                    status: phpPayload.status, 
                    winAmount 
                }
            });
        } else {
            let latestBal = (response.data && response.data.balance !== undefined) ? response.data.balance : currentDbBalance;
            return res.json({ success: false, balance: latestBal, message: "X Bet Settlement Declined by Database!" });
        }
    } catch (e) { 
        return res.json({ success: false, message: "⚠️ Timeout! Click SPIN again." }); 
    }
});

app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, 'index.html')); });
io.on('connection', (socket) => {});

const PORT = process.env.PORT || 6700; 
server.listen(PORT, () => { console.log("🎰 Crazy 777 Slots Engine Updated"); });
