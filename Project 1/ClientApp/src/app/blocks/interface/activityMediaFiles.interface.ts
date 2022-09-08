export interface ActivityMediaFilesQueryArgs {
    patientId: string;
  
    speciality?: string | null;
  
    conditionId?: string | null;
  
    activitType?: string | null;
  
    activityId?: string | null;
  
    filter?: string | null;
  
    page?: number | null;
  
    size?: number | null;
  }