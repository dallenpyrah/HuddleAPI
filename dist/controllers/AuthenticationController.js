"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/auth/adduser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        user.fullName = user.fullName.toLowerCase();
        user.email = user.email.toLowerCase();
        if (user.email.length < 1 || user.password.length < 1 || user.fullName.length < 1) {
            throw new Error("All fields are required");
        }
        if (user.password !== user.confirmPassword) {
            throw new Error("Passwords do not match");
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
}));
router.get("/auth/getuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello World");
}));
exports.default = router;
//# sourceMappingURL=AuthenticationController.js.map