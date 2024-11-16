import express, { Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"
import { StatusCodes } from "http-status-codes"
import { swap } from './swap.ts';
import { } from './tocken.ts';
import { getTokensPrice } from "./token.js";

const PORT = 3000

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(helmet())

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});

app.post("/swap", async (req: Request, res: Response) => {
  try {
    await swap(
      req.body.srcNetwork,
      req.body.srcToken,
      req.body.dstNetwork,
      req.body.dstToken,
      req.body.amount).then(function () {

      }).catch(function (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ e })
      });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
});

app.get("/price", async (req: Request, res: Response) => {
  try {
    await getTokensPrice(req.body.network).then(function (data) {
      return res.status(StatusCodes.OK).json({success: true})
    }).catch(function (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ e })
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
});
