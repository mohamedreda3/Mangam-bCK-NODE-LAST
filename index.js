require("dotenv").config();
const doQuery = require("./config/doQuery");
const express = require("express");
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const connection = require("./config/dbconfig");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// ================= Modules =============
const category = require("./routes/categoryRoute");
const product = require("./routes/productRouter");
const color = require("./routes/colorRouter");
const color_props = require("./routes/colorPropRouter");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const shipping = require("./routes/shippingRoute");
const return_itemRoute = require("./routes/return_itemRoute");
const bannerRoute = require("./routes/bannerRouter");
const infoRoute = require("./routes/infoRouter");
const reasonRoute = require("./routes/reasonRoute");
const offersRoute = require("./routes/offersRoute");
// ================= Modules =============
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1673755",
  key: "dedc8a3114e1b6170f36",
  secret: "ca862a86423c59bccd66",
  cluster: "eu",
  useTLS: true,
});
app.use("/category", category);
app.use("/product", product);
app.use("/color", color);
app.use("/color_props", color_props);
app.use("/order", order);
app.use("/user", user);
app.use("/shipping", shipping);
app.use("/return", return_itemRoute);
app.use("/banner", bannerRoute);
app.use("/site", infoRoute);
app.use("/reason", reasonRoute);
app.use("/offers", offersRoute);
app.get("/command", async (req, res) => {
  const command = await doQuery("SELECT * FROM `notifyOffer`");

  res.json(command);
});
const notifyMe = async (data) => {
  try {
    const notifies = await doQuery("SELECT * FROM `notifyOffer`");
    if (notifies && notifies?.length) {
      const scheduledDate = new Date(notifies[0]?.notifyDate);
      const cronSchedulePattern = `${scheduledDate.getMinutes()} ${scheduledDate.getHours()} ${scheduledDate.getDate()} ${
        scheduledDate.getMonth() + 1
      } * *`;
      // Schedule the job to run only once on the specified date and time.
      cron.schedule(
        cronSchedulePattern,
        async () => {
          // Your job logic here
          await doQuery(
            "INSERT INTO `notifies` ( `user_id`, `text`, `link`) VALUES (?,?,?)",
            [
              notifies[0]?.user_id,
              "The Offer Number #" +
                notifies[0]?.id +
                " Are Be Available Go To Explore This Offer..!",
              "/otherof",
            ]
          );
          pusher.trigger("my-channel", "my-event", {
            message: "hello world",
          });
        },
        {
          scheduled: true, // Start scheduling immediately
          timezone: "UTC", // Set the timezone (adjust as needed)
        }
      );
    }
  } catch (err) {}
  // console.log(sch);
};
notifyMe();
app.listen(9999);
