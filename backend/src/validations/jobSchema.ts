import { length, z } from "zod";

// Reusable unit enum
const unitEnum = z.enum(["mm", "cm", "m", "ft", "in"]);

// Sub-schema: ProcessDetail
const processDetailSchema = z.object({
  date: z.string().optional(),
  operatorSign: z.string().optional(),
  machineNumber: z.string().optional(),
  measurements: z
    .object({
      value: z.number().optional(),
      unit: unitEnum.optional(),
    })
    .optional(),
  additionalNotes: z.string().optional(),
});

// Sub-schema: SkivingDetails
const skivingDetailsSchema = z.object({
  internal: processDetailSchema.optional(),
  external: processDetailSchema.optional(),
});

// Main schema
export const jobSchema = z.object({
  orderDetails: z.object({
    customer: z.string().min(1, "Customer name is required"),
    flxTagNo: z.string().min(1, "FLX Tag No is required"),
    customerTagNo: z.string().optional(),
    deliveryDueDate: z.string().min(1, "Delivery Due Date is required"),
    reference: z.string().optional(),
  }),

  jobDetails: z.object({
    hoseType: z.string().min(1, "Hose type is required"),
    hoseId: z.string().min(1, "Hose ID is required"),
    lengthCut: z
      .object({
        value: z.number().optional(),
        unit: unitEnum.default("mm"),
      })
      .optional(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    fittingType: z.object({
      endA: z.enum(["", "Adaptor A", "Custom"]).optional(),
      endB: z.enum(["", "Adaptor B", "Custom"]).optional(),
    }),
    moc: z
      .array(z.enum(["CS", "SS", "AL", "BR"]))
      .min(1, "At least one MOC is required"),
    traceability: z.object({
      hoseBatchNumber: z.string().min(1, "Hose batch number is required"),
      flexifloBatchNo: z.string().optional(),
    }),
  }),

  inProcessDetails: z
    .object({
      hoseCutDetails: processDetailSchema.optional(),
      skivingDetails: skivingDetailsSchema.optional(),
      assemblyDetails: processDetailSchema.optional(),
      mandralsDetails: processDetailSchema.optional(),
      crimpingDetails: processDetailSchema.optional(),
      weldingDetails: processDetailSchema.optional(),
      punchingTaggingDetails: processDetailSchema.optional(),
    })
    .optional(),

  remarks: z
    .object({
      text: z.string().optional(),
      weldingRodNumber: z.string().optional(),
      weldingRodSize: z.string().optional(),
      piggingOptions: z
        .array(
          z.enum([
            "Before Assembly",
            "After Assembly",
            "Before Testing",
            "After Testing",
            "Final Inspection",
            "Packaging",
          ])
        )
        .optional(),
    })
    .optional(),

  footer: z.object({
    supervisorSignature: z.string().min(1, "Supervisor signature is required"),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  }),
});

export type JobInput = z.infer<typeof jobSchema>;
