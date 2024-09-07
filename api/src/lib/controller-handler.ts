import { Request, Response } from "express"

type THandleRequestResponseCallback<T> = (
  req: Request,
  res: Response
) => Promise<T>
export async function handleRequestResponse<T>(
  req: Request,
  res: Response,
  callBack: THandleRequestResponseCallback<T>
) {
  try {
    const response = await callBack(req, res)

    return res.status(201).json({ success: true, result: response })
  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}
