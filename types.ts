export enum ViewState {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  ASSESSMENT = 'ASSESSMENT',
  MENTORSHIP = 'MENTORSHIP',
  EDUCATION = 'EDUCATION',
  SETTINGS = 'SETTINGS',
  PROFILE = 'PROFILE'
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  bloodType: string;
  cycleLength: number;
  cycleRegularity: 'Regular' | 'Irregular' | 'Absent';
  activityLevel: 'Sedentary' | 'Moderate' | 'Active';
}

export interface RiskAssessmentData {
  age: number;
  bmi: number;
  cycleLength: number;
  symptoms: string[];
  familyHistory: boolean;
  stressLevel: number; // 1-10
  sleepHours: number;
}

export interface RiskResult {
  riskScore: number; // 0-100
  riskLevel: 'Low' | 'Moderate' | 'High';
  summary: string;
  recommendations: string[];
  doctorReportSummary: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface WorkoutPlan {
  ageGroup: string;
  focus: string;
  exercises: { name: string; duration: string; intensity: string }[];
}