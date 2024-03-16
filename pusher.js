const Pusher = require("pusher");

 const pusher = new Pusher({
  appId: "1673755",
  key: "dedc8a3114e1b6170f36",
  secret: "ca862a86423c59bccd66",
  cluster: "eu",
  useTLS: true,
});
module.exports = pusher;