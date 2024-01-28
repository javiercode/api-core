import express, { application } from 'express';
import {ScheduledJob} from "./config/Scheduled";

const app = express();


app.get('/test',async(req,res):Promise<void>=>{
    new ScheduledJob();
    res.send();
});

export default app;