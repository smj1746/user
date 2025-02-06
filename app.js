const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

console.log("✅ 서버 실행 준비...");

const app = express();
const port = 3000;

console.log("🚀 Express 로드 완료!");

app.use(express.json()); // JSON 파싱 미들웨어

console.log("📄 Swagger 설정 시작...");
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Express API with Swagger documentation",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log("🌍 기본 라우트 설정 중...");
app.get("/", (req, res) => {
  console.log("📢 '/' 경로 요청 도착!");
  res.send("Hello, API!");
});

app.listen(port, () => {
  console.log(`✅ 서버 실행 완료: http://localhost:${port}`);
  console.log(`📄 Swagger 문서: http://localhost:${port}/api-docs`);
});

