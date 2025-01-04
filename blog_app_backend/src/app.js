import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

// For data from URL forms/body, when we accept data, we do some restrictions!
app.use(express.json({limit: "16kb"}));

// 13:39 L9) Some more settings.
// For data from URL:
app.use(express.urlencoded({extended: true, limit: "16kb"}));

// For maybe a public folder or public assets
app.use(express.static("public"));

// To access the user's browser cookies and set them too.
app.use(cookieParser());
// 19:18 L9) Uptil the above line.

export default app

