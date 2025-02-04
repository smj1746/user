const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// 미들웨어 설정
app.use(bodyParser.json());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',  // MySQL 호스트
  user: 'root',       // MySQL 사용자명
  password: '',       // MySQL 비밀번호
  database: 'loginDB' // 데이터베이스 이름
});

// MySQL 연결 확인
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL 연결 성공');
});

// 로그인 API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 사용자명으로 SQL 쿼리 실행
  db.execute('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: '서버 오류' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: '사용자를 찾을 수 없습니다' });
    }

    const user = results[0];

    // 비밀번호 비교 (bcrypt 사용)
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: '비밀번호 비교 오류' });
      }

      if (isMatch) {
        res.json({ message: '로그인 성공', status: 'success' });
      } else {
        res.status(401).json({ message: '비밀번호가 틀립니다', status: 'fail' });
      }
    });
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




