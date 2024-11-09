import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './mongodb/connect.js';
import weapons from './routes/weapons.js'
import armors from './routes/armors.js'
import sorceries from './routes/sorceries.js'
import talismans from './routes/talismans.js'
import spirits from './routes/spirits.js'
import ashes from './routes/ashes.js'
import user from './routes/user.js'
import bookmark from './routes/bookmark.js'
import comment from './routes/comment.js'
import userInfo from './routes/userInfo.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/weapons',weapons)
app.use('/api/armors',armors)
app.use('/api/sorceries',sorceries)
app.use('/api/talismans',talismans)
app.use('/api/spirits',spirits)
app.use('/api/ashes',ashes)
app.use('/api/user',user)
app.use("/api/bookmarks", bookmark);
app.use('/api/comment',comment)
app.use('/api/userinfo',userInfo)


const __dirname = path.resolve();

const startServer = async () => {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
  }
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();