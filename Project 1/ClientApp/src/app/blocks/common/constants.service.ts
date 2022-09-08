import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConstantsService {

    public readonly GeneralSpecialityLookups = [
        { value: "allergies", text: "Allergies" },
        { value: "family_history", text: "Family History" },
        { value: "medical_issues", text: "Medical Issues" },
        { value: "physical_exam", text: "Physical Exam" },
        { value: "other_treatments", text: "Treatments" },
        { value: "diagnosis", text: "Diagnosis" },
        { value: "radio", text: "Radio" },
        { value: "laboratory", text: "Laboratory" },
        { value: "consultation", text: "Consultation" },
        { value: "note", text: "Note" },
        { value: "cheif_complaint", text: "Cheif complaint" },
        { value: "present_history", text: "Present History" },
    ];

    public readonly CardiologySpecialityLookups = [
        { value: "allergies", text: "Allergies" },
        { value: "family_history", text: "Family History" },
        { value: "medical_issues", text: "Medical Issues" },
        { value: "physical_exam", text: "Physical Exam" },
        { value: "risk_factors", text: "Risk Factors" },
        { value: "other_treatments", text: "Treatments" },
        { value: "diagnosis", text: "Diagnosis" },
        { value: "radio", text: "Radio" },
        { value: "laboratory", text: "Laboratory" },
        { value: "consultation", text: "Consultation" },
        { value: "note", text: "Note" },
        { value: "cheif_complaint", text: "Cheif complaint" },
        { value: "present_history", text: "Present History" },

        { value: "cardiovascular", text: "Cardiovascular" },
        { value: "gi", text: "GI" },
        { value: "endocrinology", text: "Endocrinology" },
        { value: "lung_diseases", text: "Lung Diseases" },
        { value: "neurology", text: "Neurology" },
        { value: "physiomatic_disorder", text: "Physiomatic Disorder" },
        { value: "op_type", text: "Operation Type" },

    ];


    public readonly drugForms: string[] = ["Tablets", "Capsules", "Chewable tablets",
        "Powders", "Solutions", "Emulsions", "Suspensions",
        "Lotions", "Creams", "Ointments", "Effervescent granules",
        "Aerosols", "Gasses", "Suppositories", "Injections"];

        public readonly drugRoutes: string[] = ["Oral", "Injection",
        "Sublingual and buccal","Rectal", "Vaginal", "Ocular", "Otic",
        "Nasal", "Inhalation", "Nebulization","Cutaneous","Transdermal"];



    public readonly grantors = ['daman', 'ministry', 'med gulf', 'insurance'];


    constructor() { }

}
