import 'dotenv/config';
import {ScheduledJob} from "./config/Scheduled";
import app from "./app";

async function main(){
    try {
        if(process.env.NODE_ENV==="development"){
        }
    
        console.info('Database conected');
        app.listen(process.env.PORT || 4000);
        console.info('Server is listening on port', process.env.PORT);
        
        // new ScheduledJob()
    } catch (error) {
        console.error(error);
    }
}

main()