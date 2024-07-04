// types.ts

export interface Lawyer {
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
    yearsAdmitted: string;
    disciplinaryHistory: string[];
    licenseImage: string;
    rating?: number; // Optional properties
    reviews?: number; // Optional properties
    imageSrc?: string; // Optional properties
    practiceAreas?: string[]; // Optional properties
  }
  
  export interface IPracticeAreasData {
    [key: string]: string[];
  }
  