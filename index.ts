import express from 'express'

export const app = express();

app.listen(8001, () => {
    console.log('Server started again on port 8001 - http://localhost:8001');
});