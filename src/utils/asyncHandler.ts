export const asyncHandler =
  (fn: Function) =>
  async ({ req, res, next }: any) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      res.status(error.code || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
/* 
const asyncHandler=(requestHandler:any)=>{({req,res,next}:any)=>{
Promise.resolve(requestHandler(req,res,next)).catch((error)=>next(error))}}
*/
