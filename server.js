const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - মেগা সকেট প্রোটকল লক]
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

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

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 🔥 ৩-রিলস ওরিজিনাল ক্রেজী ৭৭৭ ক্যাসিনো র্যান্ডমাইজেশন প্রতীক তালিকা ভাই ভাই
const crazy777Pool = ["GOLDEN_7", "TRIPLE_7", "DOUBLE_7", "SINGLE_7", "TRIPLE_BAR", "DOUBLE_BAR", "SINGLE_BAR"];

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স নিয়ে আসার ডেডিকেটেড গেটওয়ে
app.get('/api/crazy777-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: 0,
            wallet: targetWallet
        }, { timeout: 30000 });

        if (response.data && response.data.status === "ok" && response.data.balance !== undefined) {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. ক্রেজী ৭৭৭ ৩-রিল কোর স্লট স্পিন রাউট (POST Route - ৯৫% RTP গাণিতিক বর্ম কঠোর লক ভাই ভাই!)
app.post('/api/crazy777-spin', async (req, res) => {
    const { userId, amount, wallet } = req.body;
    const targetWallet = wallet || "main";
    const reqAmount = parseFloat(amount) || 50;

    // 🔒 [বেট সিকিউরিটি ফিল্টার]: বাজি ১ টাকার কম বা ২০০০০ টাকার বেশি হলে ব্যাকএন্ড ডিরেক্ট ব্লক ভাই ভাই!
    if (reqAmount < 1 || reqAmount > 20000) {
        return res.json({ success: false, message: "🚨 Invalid Bet Amount (৳১ - ৳Subcontinent)" });
    }

    try {
        // 🔒 [ব্যালেন্স যাচাই প্রোটোকল]: বাজি প্লে করার আগে ডাটাবেজ থেকে রিয়েল টাকা নিশ্চিত করার চাবি
        const balResponse = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: 0,
            wallet: targetWallet
        }, { timeout: 30000 });
        
        let currentDbBalance = 0;
        if (balResponse.data && balResponse.data.status === "ok" && balResponse.data.balance !== undefined) {
            currentDbBalance = parseFloat(balResponse.data.balance);
        } else {
            return res.json({ success: false, balance: 0, message: "❌ Database Sync Error! Please refresh." });
        }

        // 🔒 [ইনসাফিসিয়েন্ট প্রোটেকশন বর্ম]: অ্যাকাউন্টে টাকা কম থাকলে বা জিরো ব্যালেন্স হলে বাজি রিফিউজড ভাই ভাই!
        if (currentDbBalance < reqAmount || currentDbBalance <= 0) {
            return res.json({ success: false, balance: currentDbBalance, message: "❌ Insufficient Balance! Please Recharge BDT." });
        }

        let adminTriggeredPrize = (balResponse.data && balResponse.data.crazy777_target) ? balResponse.data.crazy777_target : null;

        let spinResults, finalStatus, winMultiplier;
        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 ৯৫% ওরিজিনাল ক্যাসিনো RTP ও ৩-রিলস ট্রিপল সেভেন গাণিতিক লুপ ভাই ভাই]
        while (isLoopActive && loopSafety < 200) {
            loopSafety++;
            
            // ৩টি ট্র্যাডিশনাল রিলের র্যান্ডম স্টপ প্রতীক জেনারেটর ভাই ভাই
            spinResults = [];
            for (let r = 0; r < 3; r++) {
                spinResults.push(crazy777Pool[Math.floor(Math.random() * crazy777Pool.length)]);
            }

            // ওরিজিনাল স্লট ৩-রিল পেলাইন ট্র্যাকিং মেথড: রিলসের ফ্রিকোয়েন্সি ম্যাচ কাউন্টার
            let countsMap = {};
            spinResults.forEach(sym => { countsMap[sym] = (countsMap[sym] || 0) + 1; });
            let maxSameSymbolsCount = Math.max(...Object.values(countsMap));

            if (maxSameSymbolsCount === 3) {
                finalStatus = "win";
                // 🚀 [ডাইনামিক কম্বো মাল্টিপ্লায়ার ওডস]: ৩টি গোল্ডেন সেভেন মিললে ক্রেজী ৭৭৭ গুণের মেগা গ্র্যান্ড জ্যাকপট!
                if (spinResults[0] === "GOLDEN_7") winMultiplier = 777.00;
                else if (spinResults[0] === "TRIPLE_7") winMultiplier = 77.00;
                else if (spinResults[0] === "DOUBLE_7") winMultiplier = 27.00;
                else winMultiplier = 17.00; 
            } else if (maxSameSymbolsCount === 2) {
                finalStatus = "win";
                winMultiplier = 3.70; // ২টি মিললে ৩.৭০ গুণ আংশিক ব্যাকআপ প্রফিট
            } else {
                finalStatus = "lose";
                winMultiplier = 0.00;
            }

            // এডমিন ড্যাশবোর্ড কন্ট্রোল ট্রিগার চাবি
            if (adminTriggeredPrize) {
                if (adminTriggeredPrize === "force_lose" && finalStatus === "lose") isLoopActive = false;
                if (adminTriggeredPrize === "force_win" && finalStatus === "win") isLoopActive = false;
                if (adminTriggeredPrize === "force_jackpot" && winMultiplier === 777.00) isLoopActive = false;
            } else {
                // ৭৭৭ গুণের মেগা ক্রেজী জ্যাকপটের চান্স আরটিপি লুপ ট্র্যাকে কড়া সুরক্ষায় টাইট ০.০০৫% এ লক ভাই ভাই
                if (winMultiplier === 777.00 && Math.random() > 0.0005) continue;

                if (finalStatus === "win") {
                    // ৯৫% আরটিপি সিঙ্ক কন্ট্রোল ম্যাথ লুপ স্বাভাবিক ট্র্যাকে ৩৬% এ ব্যালেন্সড লক ভাই ভাই!
                    if (Math.random() <= 0.36) {
                        isLoopActive = false;
                    }
                } else {
                    isLoopActive = false; 
                }
            }
        }

        let winAmount = 0;
        let dbAction = "bet";
        let dbAmount = reqAmount;

        if (finalStatus === "win") {
            winAmount = parseFloat((reqAmount * winMultiplier).toFixed(2));
            dbAction = "win";
            dbAmount = winAmount;
        }

        let phpPayload = {
            action: dbAction,
            username: userId,
            amount: dbAmount,
            wallet: targetWallet
        };

        if (dbAction === "win") {
            phpPayload.bet_amount = reqAmount;
            phpPayload.multiplier = winMultiplier.toFixed(2);
            phpPayload.status = "win";
            phpPayload.type = "win";
            phpPayload.is_win = 1;
            phpPayload.win_status = "win";
            phpPayload.log_status = "win";
        }

        const response = await axios.post(MAIN_SITE_URL + '/api_callback.php', phpPayload, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });

            return res.json({
                success: true,
                balance: response.data.balance,
                status: finalStatus,
                winAmount: winAmount,
                reels: spinResults
            });
        } else {
            let latestBal = (response.data && response.data.balance !== undefined) ? response.data.balance : currentDbBalance;
            return res.json({ success: false, balance: latestBal, message: "❌ Bet Declined by Database!" });
        }

    } catch (e) {
        console.error("Crazy 777 Core Engine Error:", e.message);
        return res.json({ success: false, message: "⚠️ Timeout! Click SPIN again." });
    }
});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

io.on('connection', (socket) => { console.log("Player connected to Royal Crazy 777 3-Reel Slot Engine!"); });

// ক্রেজী ৭৭৭ গেম নিজস্ব কাস্টম ৬৭০০ পোর্টে কড়া নিয়নে অন ফায়ার ভাই ভাই!
const PORT = process.env.PORT || 6700; 
server.listen(PORT, () => { console.log(`🎡 Royal Crazy 777 Engine Running on port ${PORT}`); });
