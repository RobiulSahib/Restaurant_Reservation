
import ErrorHandler from "../middlewares/error.js";
import Reservation from "../models/reservation.js";

// Helper function to validate email format
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return regex.test(email);
};

// Helper function to validate phone number (minimum 10 digits)
const isValidPhone = (phone) => {
  const regex = /^[0-9]{10,15}$/;
  return regex.test(phone);
};

// Helper function to validate name (only letters and spaces)
const isValidName = (name) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(name);
};

export const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;

  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please fill the entire reservation form!", 400));
  }

  if (!isValidEmail(email)) {
    return next(new ErrorHandler("Please enter a valid email address.", 400));
  }

  if (!isValidPhone(phone)) {
    return next(new ErrorHandler("Please enter a valid phone number (at least 10 digits).", 400));
  }

  if (!isValidName(firstName) || !isValidName(lastName)) {
    return next(new ErrorHandler("Name should only contain letters and spaces.", 400));
  }

  try {
    await Reservation.create({ firstName, lastName, email, date, time, phone });

    res.status(201).json({
      success: true,
      message: "Reservation sent successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }

    return next(error);
  }
};
