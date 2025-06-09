// // import express from "express";
// // import send_reservation from "../controller/reservation.js";

// // const router = express.Router();

// // router.post("/send", send_reservation);

// // export default router;

// import express from "express";
// import { send_reservation } from "../controller/reservation.js"; // ✅ match named export

// const router = express.Router();

// router.post("/send", send_reservation);

// export default router;


// import express from "express";
// import { send_reservation } from "../controller/reservation.js";

// const router = express.Router();

// // POST route to handle reservation form submissions
// router.post("/send", send_reservation);

// export default router;


import express from "express";
import { send_reservation } from "../controller/reservation.js"; // ✅ match named export

const router = express.Router();

// ✅ Accept POST (real data submission)
router.post("/send", send_reservation);

// ✅ Optional: Allow GET to test the route in browser
router.get("/send", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Reservation endpoint is reachable (GET)",
  });
});

export default router;

