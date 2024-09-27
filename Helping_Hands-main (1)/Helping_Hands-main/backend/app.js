import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import {errorMiddleware} from "./middlewares/error.js"
import { CronJob } from 'cron';


const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: 'https://helping-hands-deployement2.netlify.app',
    methods: ["GET", "POST", "PUT", "DELETE","PATCH","OPTIONS"],
    credentials: true
  })
);
app.options('*', cors())

//authorization is done by cookie parser ,
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

app.use(errorMiddleware);

app.get('/healthcheck', (req, res) => {
  res.json({ message: 'I am healthy' });
});


 CronJob.from({
	cronTime: '*/5 * * * * *',
	onTick: function () {
		fetch('https://helping-hands-job.onrender.com/healthcheck')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
	},
	start: true,
	timeZone: 'America/Los_Angeles'
});

export default app;
