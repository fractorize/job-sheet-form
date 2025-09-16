import { create } from "zustand";

import axios, { AxiosError } from "axios";
import type { JobSheetFormData, FormErrors } from "../types";
import { jobSchema } from "../validations/jobSchema";
import { ZodError } from "zod";

type JobListItem = {
  _id: string;
  orderDetails: {
    customer: string;
    flxTagNo: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

type FormStore = {
  formData: JobSheetFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  successMessage: string;
  expandedSections: Set<string>;
  jobs: JobListItem[];
  jobsLoading: boolean;
  jobsError: string;
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
  createJob: () => Promise<void>;
  fetchJobs: () => Promise<void>;
  // Added single job fetch and state
  jobDetail?: JobSheetFormData & {
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  jobDetailLoading: boolean;
  jobDetailError: string;
  fetchJobById: (id: string) => Promise<void>;
  updateJob: (id: string, data: JobSheetFormData) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
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
  inProcessDetails: {},
  remarks: {},
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
  jobs: [],
  jobsLoading: false,
  jobsError: "",
  // Added initial state for job detail
  jobDetail: undefined,
  jobDetailLoading: false,
  jobDetailError: "",

  updateFormData: <K extends keyof JobSheetFormData>(
    section: K,
    data: Partial<JobSheetFormData[K]>
  ) => {
    set((state) => {
      const updatedSection = {
        ...(state.formData[section] as object),
        ...(data as object),
      } as JobSheetFormData[K];
      return {
        formData: {
          ...state.formData,
          [section]: updatedSection,
        } as JobSheetFormData,
      };
    });
  },

  toggleSection: (sectionId: string) => {
    set((state) => {
      const newExpanded = new Set(state.expandedSections);
      if (newExpanded.has(sectionId)) newExpanded.delete(sectionId);
      else newExpanded.add(sectionId);
      return { expandedSections: newExpanded };
    });
  },

  setErrors: (errors: FormErrors) => set({ errors }),
  setSuccessMessage: (message: string) => set({ successMessage: message }),

  resetForm: () =>
    set({ formData: initialFormData, errors: {}, successMessage: "" }),

  validateWithZod: (data: JobSheetFormData) => {
    try {
      jobSchema.parse(data);
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

  createJob: async () => {
    const { formData, validateWithZod } = get();
    set({ successMessage: "", errors: {} });
    const validation = validateWithZod(formData);
    if (validation.ok === false) {
      set({ errors: validation.errors });
      return;
    }

    try {
      set({ isSubmitting: true });
      const response = await axios.post("/api/job", formData);
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

  fetchJobs: async () => {
    try {
      set({ jobsLoading: true, jobsError: "" });
      const response = await axios.get("/api/job");
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data ?? [];
      set({ jobs: data });
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      set({
        jobsError: err.response?.data?.message || "Failed to fetch jobs.",
      });
    } finally {
      set({ jobsLoading: false });
    }
  },

  // Implement single job fetch
  fetchJobById: async (id: string) => {
    try {
      set({ jobDetailLoading: true, jobDetailError: "" });
      const response = await axios.get(`/api/job/${id}`);
      const data = response.data?.data ?? response.data;

      // Ensure optional fields are properly initialized
      const normalizedData = {
        ...data,
        inProcessDetails: data.inProcessDetails || {},
        remarks: data.remarks || {},
      };

      set({ jobDetail: normalizedData });
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      set({
        jobDetailError:
          err.response?.data?.message || "Failed to fetch report.",
      });
    } finally {
      set({ jobDetailLoading: false });
    }
  },

  // Implement job update
  updateJob: async (id: string, data: JobSheetFormData) => {
    const { validateWithZod } = get();
    set({ successMessage: "", errors: {} });

    // Clean up the data before validation and sending
    const cleanedData = {
      ...data,
      inProcessDetails: data.inProcessDetails || {},
      remarks: data.remarks || {},
    };

    const validation = validateWithZod(cleanedData);
    if (validation.ok === false) {
      set({ errors: validation.errors });
      return;
    }

    try {
      set({ isSubmitting: true });
      const response = await axios.put(`/api/job/${id}`, cleanedData);
      if (response.data?.success) {
        set({
          successMessage: "Report updated successfully.",
          jobDetail: response.data.data,
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
        alert(err.response.data.message);
      } else {
        set({ successMessage: "" });
        alert("Failed to update report. Please try again.");
      }
    } finally {
      set({ isSubmitting: false });
    }
  },

  deleteJob: async (id: string) => {
    try {
      set({ isSubmitting: true, successMessage: "", errors: {} });
      const response = await axios.delete(`/api/job/${id}`);
      if (response.data?.success) {
        set((state) => ({
          successMessage: "Report deleted successfully.",
          jobs: state.jobs.filter((job) => job._id !== id),
          jobDetail: undefined,
        }));
      }
    } catch (error: unknown) {
      const err = error as AxiosError<ApiErrorResponse>;
      if (err?.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to delete report. Please try again.");
      }
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
