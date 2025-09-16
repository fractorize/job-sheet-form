import mongoose, { Schema } from "mongoose";
import { IJob } from "./types/job.js";

// Type alias for the document (includes Mongoose Document methods)
type JobDoc = IJob;
// ProcessDetail sub-schema for in-process details
const ProcessDetailSchema = new Schema(
  {
    date: {
      type: String,
      required: false,
    },
    operatorSign: {
      type: String,
      required: false,
    },
    machineNumber: {
      type: String,
      required: false,
    },
    measurements: {
      value: {
        type: Number,
        required: false,
      },
      unit: {
        type: String,
        required: false,
        enum: ["mm", "cm", "m", "ft", "in"],
      },
    },
    additionalNotes: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

// SkivingDetails sub-schema
const SkivingDetailsSchema = new Schema(
  {
    internal: ProcessDetailSchema,
    external: ProcessDetailSchema,
  },
  { _id: false }
);

// Main Job schema
const JobSchema = new Schema<IJob>(
  {
    orderDetails: {
      customer: {
        type: String,
        required: true,
        trim: true,
      },
      flxTagNo: {
        type: String,
        required: true,
        trim: true,
      },
      customerTagNo: {
        type: String,
        required: false,
        trim: true,
      },
      deliveryDueDate: {
        type: String,
        required: true,
      },
      reference: {
        type: String,
        required: false,
        trim: true,
      },
    },
    jobDetails: {
      hoseType: {
        type: String,
        required: true,
        trim: true,
      },
      hoseId: {
        type: String,
        required: true,
        trim: true,
      },
      lengthCut: {
        value: {
          type: Number,
          required: false,
          min: 0,
        },
        unit: {
          type: String,
          required: false,
          enum: ["mm", "cm", "m", "ft", "in"],
          default: "mm",
        },
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      fittingType: {
        endA: {
          type: String,
          required: false,
          enum: ["", "Adaptor A", "Custom"],
        },
        endB: {
          type: String,
          required: false,
          enum: ["", "Adaptor B", "Custom"],
        },
      },
      moc: [
        {
          type: String,
          enum: ["CS", "SS", "AL", "BR"],
          required: true,
        },
      ],
      traceability: {
        hoseBatchNumber: {
          type: String,
          required: true,
          trim: true,
        },
        flexifloBatchNo: {
          type: String,
          required: false,
          trim: true,
        },
      },
    },
    inProcessDetails: {
      hoseCutDetails: ProcessDetailSchema,
      skivingDetails: SkivingDetailsSchema,
      assemblyDetails: ProcessDetailSchema,
      mandralsDetails: ProcessDetailSchema,
      crimpingDetails: ProcessDetailSchema,
      weldingDetails: ProcessDetailSchema,
      punchingTaggingDetails: ProcessDetailSchema,
    },
    remarks: {
      text: {
        type: String,
        required: false,
        trim: true,
      },
      weldingRodNumber: {
        type: String,
        required: false,
        trim: true,
      },
      weldingRodSize: {
        type: String,
        required: false,
        trim: true,
      },
      piggingOptions: [
        {
          type: String,
          enum: [
            "Before Assembly",
            "After Assembly",
            "Before Testing",
            "After Testing",
            "Final Inspection",
            "Packaging",
          ],
        },
      ],
    },
    footer: {
      supervisorSignature: {
        type: String,
        required: true,
        trim: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the model
const Job = mongoose.model<JobDoc>("Job", JobSchema);
export default Job;
