import { connect } from "mongoose";

async function connectToDatabse() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw new Error("Cannot Connect ot MONGODB")
        
        
    }
    
}

async function disconnectToDatabse() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Could not Connect to MONGODB")
        
        
    }
    
}

export {connectToDatabse,disconnectToDatabse}