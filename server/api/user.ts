import jwt from "jsonwebtoken";
import { getCookie } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const {token} = parseCookies(event)

    if (!token) return { role: "guest" };

    const decoded = jwt.verify(token, "secret_key");
    return decoded; // { id, role }
  } catch (error) {
    return { role: "guest" };
  }
});