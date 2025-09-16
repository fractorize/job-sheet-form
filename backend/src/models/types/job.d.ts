import { Document } from "mongoose";

// Define the Mongoose document interface
export interface IJob extends Document {
  orderDetails: {
    customer: string;
    flxTagNo: string;
    customerTagNo?: string;
    deliveryDueDate: string;
    reference?: string;
  };
  jobDetails: {
    hoseType: string;
    hoseId: string;
    lengthCut?: {
      value?: number;
      unit?: "mm" | "cm" | "m" | "ft" | "in";
    };
    quantity: number;
    fittingType: {
      endA?: "" | "Adaptor A" | "Custom";
      endB?: "" | "Adaptor B" | "Custom";
    };
    moc: ("CS" | "SS" | "AL" | "BR")[];
    traceability: {
      hoseBatchNumber: string;
      flexifloBatchNo?: string;
    };
  };
  inProcessDetails?: {
    hoseCutDetails?: {
      date?: string;
      operatorSign?: string;
      machineNumber?: string;
      measurements?: {
        value?: number;
        unit?: "mm" | "cm" | "m" | "ft" | "in";
      };
      additionalNotes?: string;
    };
    skivingDetails?: {
      internal?: {
        date?: string;
        operatorSign?: string;
        machineNumber?: string;
        measurements?: {
          value?: number;
          unit?: "mm" | "cm" | "m" | "ft" | "in";
        };
        additionalNotes?: string;
      };
      external?: {
        date?: string;
        operatorSign?: string;
        machineNumber?: string;
        measurements?: {
          value?: number;
          unit?: "mm" | "cm" | "m" | "ft" | "in";
        };
        additionalNotes?: string;
      };
    };
    assemblyDetails?: {
      date?: string;
      operatorSign?: string;
      machineNumber?: string;
      measurements?: {
        value?: number;
        unit?: "mm" | "cm" | "m" | "ft" | "in";
      };
      additionalNotes?: string;
    };
    mandralsDetails?: {
      date?: string;
      operatorSign?: string;
      machineNumber?: string;
      measurements?: {
        value?: number;
        unit?: "mm" | "cm" | "m" | "ft" | "in";
      };
      additionalNotes?: string;
    };
    crimpingDetails?: {
      date?: string;
      operatorSign?: string;
      machineNumber?: string;
      measurements?: {
        value?: number;
        unit?: "mm" | "cm" | "m" | "ft" | "in";
      };
      additionalNotes?: string;
    };
    weldingDetails?: {
      date?: string;
      operatorSign?: string;
      machineNumber?: string;
      measurements?: {
        value?: number;
        unit?: "mm" | "cm" | "m" | "ft" | "in";
      };
      additionalNotes?: string;
    };
    punchingTaggingDetails?: {
      date?: string;
      operatorSign?: string;
      machineNumber?: string;
      measurements?: {
        value?: number;
        unit?: "mm" | "cm" | "m" | "ft" | "in";
      };
      additionalNotes?: string;
    };
  };
  remarks?: {
    text?: string;
    weldingRodNumber?: string;
    weldingRodSize?: string;
    piggingOptions?: (
      | "Before Assembly"
      | "After Assembly"
      | "Before Testing"
      | "After Testing"
      | "Final Inspection"
      | "Packaging"
    )[];
  };
  footer: {
    supervisorSignature: string;
    date: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
