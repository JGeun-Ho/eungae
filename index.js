const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); // 세션 미들웨어 추가
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = path.resolve(__dirname, './');
app.use('/', express.static(dataDir));
app.use(express.static(dataDir));

app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));

// 세션 미들웨어 설정
app.use(session({
    secret: 'secret', // 세션 암호화에 사용될 비밀키
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './register.html'));
});

// 미리 어드민 계정 생성
const adminUser = { username: 'hans', password: 'hello125', admin: true };
const adminUser2 = { username: 'sex', password: 'withzenon', admin: true };

// 회원가입 요청 처리
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = getUsersFromJson();
    // 이미 존재하는 사용자인지 확인
    if (users.find(user => user.username === username)) {
        res.status(409).sendFile(path.join(__dirname, './errorregister.html'));
        return;
    }
    users.push({ username, password });
    saveUsersToJson(users);
    res.redirect('/login');
});

// 로그인 요청 처리
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsersFromJson();
    // 어드민 계정 확인
    if (username === adminUser.username && password === adminUser.password) {
        req.session.admin = true; // 어드민 세션 설정
        return res.redirect('/my/admin');
    }
    if (username === adminUser2.username && password === adminUser2.password) {
        req.session.admin = true; // 어드민 세션 설정
        return res.redirect('/my/admin');
    }
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).sendFile(path.join(__dirname, './errorlogin.html'));
    }
    // 일반 사용자 세션 설정
    req.session.username = user.username;
    res.redirect('/my');
});

app.get('/my', (req, res) => {
    // 클라이언트로부터 받은 요청을 다룰 때 user를 정의해야 합니다.
    const user = req.session.username;
    if (!user) {
        return res.status(401).sendFile(path.join(__dirname, 'login.html'));
    }
    res.sendFile(path.join(__dirname, './account.html'));
});

// 클라이언트 측에서 사용자 이름을 가져오는 API 엔드포인트
app.get('/username', (req, res) => {
    const username = req.session.username;
    if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json({ username });
});

// 어드민 페이지 라우트
app.get('/my/admin', (req, res) => {
    if (!req.session.admin) { // 어드민 로그인 여부 확인
        return res.status(403).send('Forbidden');
    }
    res.sendFile(path.join(__dirname, './admin.html'));
});

function getUsersFromJson() {
    const data = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8');
    return JSON.parse(data);
}

function saveUsersToJson(users) {
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), 'utf8');
}

app.listen(PORT, () => {
    console.log(`[PORT] 서버가 ${PORT}포트에서 실행중입니다.`);
});
// ---------------------------------------------------------------------------------------------------- //
const rpc = require('./js/rpc/rpc.js');
rpc();

const adminnnnnn = require('./js/admin bot/admin-bot.js');
adminnnnnn();

const nittttttttttttrrrrrrrrrrrrroooooooooooo = require('./js/nitro gen bot/nitrobot.js');
nittttttttttttrrrrrrrrrrrrroooooooooooo();

const tickettttttttttttttt = require('./src/index.js');
tickettttttttttttttt();

const bannner = require('./banner bot/index.js');
bannner();

const revvview = require('./bot.js');
revvview();