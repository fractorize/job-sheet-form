export interface OrderDetails {
  customer: string;
  flxTagNo: string;
  customerTagNo: string;
  deliveryDueDate: string;
  reference: string;
}

export interface JobDetails {
  hoseType: string;
  hoseId: string;
  lengthCut: {
    value: number;
    unit: string;
  };
  quantity: number;
  fittingType: {
    endA: string;
    endB: string;
  };
  moc: string[]; // CS, SS, AL, BR
  traceability: {
    hoseBatchNumber: string;
    flexifloBatchNo: string;
  };
}

export interface ProcessDetail {
  date?: string;
  operatorSign?: string;
  machineNumber?: string;
  measurements?: {
    value?: number;
    unit?: string;
  };
  additionalNotes?: string;
}

export interface InProcessDetails {
  hoseCutDetails?: ProcessDetail;
  skivingDetails?: {
    internal?: ProcessDetail;
    external?: ProcessDetail;
  };
  assemblyDetails?: ProcessDetail;
  mandralsDetails?: ProcessDetail;
  crimpingDetails?: ProcessDetail;
  weldingDetails?: ProcessDetail;
  punchingTaggingDetails?: ProcessDetail;
}

export interface Remarks {
  text?: string;
  weldingRodNumber?: string;
  weldingRodSize?: string;
  piggingOptions?: string[];
}

export interface Footer {
  supervisorSignature: string;
  date: string;
}

export interface JobSheetFormData {
  orderDetails: OrderDetails;
  jobDetails: JobDetails;
  inProcessDetails: InProcessDetails;
  remarks: Remarks;
  footer: Footer;
}

export interface FormErrors {
  [key: string]: string | undefined;
}
