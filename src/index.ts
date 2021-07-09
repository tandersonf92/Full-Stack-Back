import { albumRouter } from "./routes/albumRouter";
import { userRouter } from "./routes/userRouter";
import { musicRouter } from "./routes/musicRouter";
import app from "./app";


app.use('/album',albumRouter)

app.use('/user',userRouter)

app.use('/music',musicRouter)



