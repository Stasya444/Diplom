
export default defineEventHandler(async (event) => {
    try {
        setCookie(event, "token", "", {
            httpOnly: true,
            path: "/",
            maxAge: 0,
            expires: new Date(Date.now())
        })

        return {
            success: true,
        }
    } catch (error) {
        console.error("Logout error:", error);
        return { success: false, message: "Виникла помилка" };
    }
});
