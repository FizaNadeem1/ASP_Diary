
export interface CreateCaseLawyerInput {
  lStartDate: string
  lEndDate: string
  lNotes: string;
  caseLawyerStatus: boolean;
  branchId: number;
  caseMainId: number;
  lawyerId: number;
}
