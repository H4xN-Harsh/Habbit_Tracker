import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import authRoutes from "..."

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}));

app.use('/api/auth',authRoutes);
app.get("/api/health",(req,res)=>res.json({ok:true}));

export default app;