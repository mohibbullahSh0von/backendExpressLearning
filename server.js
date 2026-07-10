import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import userRouter from "./src/user/user.router.js";

// Connect to the DB & Start the server
connectDB()
  .then(() => {
    // Start the server
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log("Server is listening at port: ", PORT);
    });
  })
  .catch((error) => {
    console.log("Server failed to start!!!", error);
    process.exit(1);
  });

//   Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Bank api",
  });
});
app.use("/api/user", userRouter);
