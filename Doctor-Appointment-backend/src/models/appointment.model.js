// appointment.model.js (using Mongoose)

const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { required } = require("joi");

function generateAppointmentId(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    booker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    patientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    patientPhone: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    patientAge: {
      type: Number,
      required: true,
      min: 0,
    },
    patientGender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    patientAddress: {
      type: String,
      required: true,
      trim: true,
    },
    visitType: {
      type: String,
      enum: [
        "Old Patient Visit",
        "New Patient Visit",
        "Specific Concern",
        "other",
      ],
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    specificConditions: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: false,
    },
    bodyPart: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      maxlength: 500,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "no_show"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentDetails: {
      method: {
        type: String,
        enum: ["card", "cash", "online"],
        default: "cash",
      },
      transactionId: { type: String },
      paidAt: { type: Date },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.plugin(toJSON);
appointmentSchema.plugin(paginate);

// Pre-save hook to auto-generate unique appointmentId
appointmentSchema.pre("validate", async function (next) {
  if (!this.appointmentId) {
    let unique = false;
    while (!unique) {
      const newId = generateAppointmentId();
      const existing = await mongoose.models.Appointment.findOne({
        appointmentId: newId,
      });
      if (!existing) {
        this.appointmentId = newId;
        unique = true;
      }
    }
  }
  next();
});

module.exports = mongoose.model("Appointment", appointmentSchema);
