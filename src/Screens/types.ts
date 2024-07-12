export interface Lawyer {
  profileImage: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  licenseNumber: string;
  address: string;
  city: string;
  zip: string;
  phoneNum: string;
  practiceArea: string;
  morePracticeArea: string[]; // Field added for more practice areas
  yearsAdmitted: string;
  disciplinaryHistory: string[];
  licenseImage: string;
  bio: string;
  fee: number;
  court: string[];
  specialization: string[];
  education: string[];
  languages: string[];
  rating?: number; // Optional properties
  reviews?: number; // Optional properties
  status?: string; // Optional properties
}
  
export interface IPracticeAreasData {
  [key: string]: string[];
}
