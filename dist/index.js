"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationRouter_1 = __importDefault(require("./routers/authenticationRouter"));
const app = (0, express_1.default)();
app.use("/api/v1", authenticationRouter_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(8001, () => {
    console.log('Server started again on port 8001 - http://localhost:8001');
});
//# sourceMappingURL=index.js.map