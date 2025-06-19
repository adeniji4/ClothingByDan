import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectDB.js'
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoute.js'
import adminRouter from './routes/adminRoute.js'
import orderRouter from './routes/orderRoute.js';


//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

//middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Api Working!!')
})

//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/product', productRouter)
app.use(orderRouter);


app.listen(port, () => console.log(`server started on port ${port}`))