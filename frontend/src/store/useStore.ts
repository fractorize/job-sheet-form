import { create } from "zustand";

import axios, { AxiosError } from "axios";
import type { JobSheetFormData, FormErrors } from "../types";
import { inspectionReportSchema } from "../validations/inspectionReportSchema";
import { ZodError } from "zod";

type FormStore = {
  formData: JobSheetFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  successMessage: string;
  expandedSections: Set<string>;
  updateFormData: <K extends keyof JobSheetFormData>(
    section: K,
    data: Partial<JobSheetFormData[K]>
  ) => void;
  toggleSection: (sectionId: string) => void;
  setErrors: (errors: FormErrors) => void;
  setSuccessMessage: (message: string) => void;
  resetForm: () => void;
  validateWithZod: (
    data: JobSheetFormData
  ) => { ok: true } | { ok: false; errors: FormErrors };
  createReport: () => Promise<void>;
};

const initialFormData: JobSheetFormData = {
  orderDetails: {
    customer: "",
    flxTagNo: "",
    customerTagNo: "",
    deliveryDueDate: "",
    reference: "",
  },
  jobDetails: {
    hoseType: "",
    hoseId: "",
    lengthCut: {
      value: 0,
      unit: "mm",
    },
    quantity: 0,
    fittingType: {
      endA: "",
      endB: "",
    },
    moc: [],
    traceability: {
      hoseBatchNumber: "",
      flexifloBatchNo: "",
    },
  },
  inProcessDetails: {
    hoseCutDetails: {
      date: "",
      operatorSign: "",
      machineNumber: "",
      measurements: {
        value: 0,
        unit: "mm",
      },
    },
    skivingDetails: {
      internal: {
        date: "",
        operatorSign: "",
        machineNumber: "",
        measurements: {
          value: 0,
          unit: "mm",
        },
      },
      external: {
        date: "",
        operatorSign: "",
        machineNumber: "",
        measurements: {
          value: 0,
          unit: "mm",
        },
      },
    },
    assemblyDetails: {
      date: "",
      operatorSign: "",
      machineNumber: "",
    },
    mandralsDetails: {
      date: "",
      operatorSign: "",
      machineNumber: "",
    },
    crimpingDetails: {
      date: "",
      operatorSign: "",
      machineNumber: "",
      measurements: {
        value: 0,
        unit: "mm",
      },
    },
    weldingDetails: {
      date: "",
      operatorSign: "",
      machineNumber: "",
    },
    punchingTaggingDetails: {
      date: "",
      operatorSign: "",
      machineNumber: "",
    },
  },
  remarks: {
    text: "",
    weldingRodNumber: "",
    weldingRodSize: "",
    piggingOptions: [],
  },
  footer: {
    supervisorSignature: "",
    date: "",
  },
};

const mapPathToFlatKey = (path: string[]): string => {
  const joined = path.join(".");
  const map: Record<string, string> = {
    "orderDetails.customer": "customer",
    "orderDetails.flxTagNo": "flxTagNo",
    "orderDetails.deliveryDueDate": "deliveryDueDate",
    "orderDetails.customerTagNo": "customerTagNo",
    "orderDetails.reference": "reference",
    "jobDetails.hoseType": "hoseType",
    "jobDetails.hoseId": "hoseId",
    "jobDetails.quantity": "quantity",
    "jobDetails.moc": "moc",
    "jobDetails.lengthCut.value": "lengthCutValue",
    "jobDetails.lengthCut.unit": "lengthCutUnit",
    "jobDetails.traceability.hoseBatchNumber": "hoseBatchNumber",
    "jobDetails.traceability.flexifloBatchNo": "flexifloBatchNo",
    "footer.supervisorSignature": "supervisorSignature",
    "footer.date": "date",
  };
  return map[joined] ?? joined;
};

type ApiErrorResponse = {
  success?: boolean;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
};

export const useFormStore = create<FormStore>((set, get) => ({
  formData: initialFormData,
  errors: {},
  isSubmitting: false,
  successMessage: "",
  expandedSections: new Set<string>(["orderDetails"]),

  updateFormData: (section, data) => {
    set((state) => {
      const updatedSection = {
        ...(state.formData[section] as object),
        ...(data as object),
      } as JobSheetFormData[typeof section];
      return {
        formData: {
          ...state.formData,
          [section]: updatedSection,
        } as JobSheetFormData,
      };
    });
  },

  toggleSection: (sectionId) => {
    set((state) => {
      const newExpanded = new Set(state.expandedSections);
      if (newExpanded.has(sectionId)) newExpanded.delete(sectionId);
      else newExpanded.add(sectionId);
      return { expandedSections: newExpanded };
    });
  },

  setErrors: (errors) => set({ errors }),
  setSuccessMessage: (message) => set({ successMessage: message }),

  resetForm: () =>
    set({ formData: initialFormData, errors: {}, successMessage: "" }),

  validateWithZod: (data) => {
    try {
      inspectionReportSchema.parse(data);
      return { ok: true } as const;
    } catch (err) {
      const newErrors: FormErrors = {};
      if (err instanceof ZodError) {
        err.issues.forEach((issue) => {
          const key = mapPathToFlatKey(issue.path as string[]);
          if (!newErrors[key]) newErrors[key] = issue.message;
        });
      }
      return { ok: false, errors: newErrors } as const;
    }
  },

  createReport: async () => {
    const { formData, validateWithZod } = get();
    set({ successMessage: "", errors: {} });
    const validation = validateWithZod(formData);
    if (validation.ok === false) {
      set({ errors: validation.errors });
      return;
    }

    try {
      set({ isSubmitting: true });
      const response = await axios.post("/api/inspection-report", formData);
      if (response.data?.success) {
        set({
          formData: initialFormData,
          successMessage: "Report saved successfully.",
        });
      }
    } catch (error: unknown) {
      const err = error as AxiosError<ApiErrorResponse>;
      if (
        err?.response?.status === 400 &&
        Array.isArray(err.response.data?.errors)
      ) {
        const backendErrors = err.response.data.errors as Array<{
          field: string;
          message: string;
        }>;
        const newErrors: FormErrors = {};
        backendErrors.forEach((e) => {
          const key = mapPathToFlatKey(e.field.split("."));
          if (!newErrors[key]) newErrors[key] = e.message;
        });
        set({ errors: newErrors });
      } else if (err?.response?.data?.message) {
        set({ successMessage: "" });
        // Keep alert to preserve simple feedback without UI changes
        alert(err.response.data.message);
      } else {
        set({ successMessage: "" });
        alert("Failed to save report. Please try again.");
      }
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
