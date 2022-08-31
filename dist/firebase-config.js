"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseApp = void 0;
const app_1 = require("firebase/app");
const firebaseConfig = {
    apiKey: "AIzaSyDo9w_q2OjAF5k2BUv1V_0HNw8wjbLmZYQ",
    authDomain: "huddle-68e55.firebaseapp.com",
    databaseURL: "https://huddle-68e55-default-rtdb.firebaseio.com",
    projectId: "huddle-68e55",
    storageBucket: "huddle-68e55.appspot.com",
    messagingSenderId: "145379649614",
    appId: "1:145379649614:web:7c2cfb6003d7ea2fe03b1f",
    measurementId: "G-N43LD24ZXY"
};
exports.firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
//# sourceMappingURL=firebase-config.js.map