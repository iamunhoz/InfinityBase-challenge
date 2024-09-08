import { Request, Response } from "express"

type THandleRequestResponseCallback<T> = (
  req: Request,
  res: Response
) => Promise<T>
export async function handleRequestResponse<T>(
  req: Request,
  res: Response,
  callBack: THandleRequestResponseCallback<T>,
  statusCode?: number
) {
  try {
    const response = await callBack(req, res)

    return res
      .status(statusCode || 200)
      .json({ success: true, result: response })
  } catch (error: any) {
    console.error("request Error:", {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack available",
      name: error.name || "Error",
    })
    return res
      .status(500)
      .json({ success: false, message: JSON.stringify(error), result: null })
  }
}
