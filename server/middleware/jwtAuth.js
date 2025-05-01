import jwt from "jsonwebtoken";

export const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers?.cookie;
    console.log(token, "✅✅✅✅✅");
    if (!token) {
      throw new Error("Please login first..🔐");
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        throw new Error("auth error🔐");
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message || error,
      data: [],
      success: false,
      error: true,
    });
  }
};
