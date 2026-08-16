export type RequestStatus =
  | 'draft' | 'submitted' | 'under_review' | 'published'
  | 'applications_open' | 'volunteer_selected' | 'scheduled'
  | 'in_progress' | 'completed' | 'awaiting_verification'
  | 'verified' | 'closed' | 'cancelled' | 'rejected' | 'expired';

export type Urgency = 'low' | 'normal' | 'high' | 'urgent';
export type TrustLevel = 'new' | 'bronze' | 'silver' | 'gold' | 'champion';
export type UserRole = 'community_member' | 'volunteer' | 'organization' | 'admin';

export type VolunteerRecognition =
  | 'Certificate of Appreciation'
  | 'Appreciation Letter'
  | 'Volunteer Certificate'
  | 'Recognition/Award'
  | 'Recommendation Letter'
  | 'Other';

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  location: string;
  isOnline: boolean;
  preferredDate: string;
  estimatedDuration: string;
  requiredSkills: string[];
  volunteersRequired: number;
  applicantsCount: number;
  urgency: Urgency;
  status: RequestStatus;
  beneficiaries: number;
  targetGroup: string;
  sdgs: number[];
  requesterId: string;
  requesterName: string;
  requesterType: 'individual' | 'organization';
  orgEmail: string;
  orgWhatsapp: string;
  orgPhone?: string;
  recognitionType: VolunteerRecognition;
  recognitionDetails?: string;
  createdAt: string;
  image?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  location: string;
  skills: string[];
  bio: string;
  verifiedServices: number;
  volunteerHours: number;
  peopleHelped: number;
  rating: number;
  completionRate: number;
  trustLevel: TrustLevel;
  points: number;
  badges: string[];
  avatar?: string;
  email?: string;
  whatsapp?: string;
  joinedAt: string;
  languages: string[];
  availability: string;
  causes: string[];
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  location: string;
  description: string;
  verified: boolean;
  email: string;
  whatsapp: string;
  phone?: string;
  activeRequests: number;
  completedProjects: number;
  totalVolunteers: number;
  totalBeneficiaries: number;
  logo?: string;
  causes: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  organizationName: string;
  status: 'planning' | 'active' | 'completed';
  requestsCount: number;
  volunteersCount: number;
  beneficiaries: number;
  volunteerHours: number;
  sdgs: number[];
  location: string;
  startDate: string;
  endDate?: string;
  category: string;
  image?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'starter' | 'skill' | 'milestone' | 'special';
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinedAt: string;
}

export interface Application {
  id: string;
  requestId: string;
  requestTitle: string;
  volunteerId: string;
  volunteerName: string;
  volunteerEmail: string;
  volunteerWhatsapp: string;
  volunteerSkills?: string[];
  message: string;
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
  appliedAt: string;
  matchScore: number;
}

export interface ImpactStats {
  needsSubmitted: number;
  needsSolved: number;
  verifiedServices: number;
  volunteers: number;
  volunteerHours: number;
  peopleHelped: number;
  organizations: number;
  projectsCompleted: number;
  citiesReached: number;
}

export interface Notification {
  id: string;
  type: 'application' | 'accepted' | 'rejected' | 'verified' | 'badge' | 'message' | 'reminder';
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export const SDG_LIST = [
  { id: 1, name: 'No Poverty', color: '#E5243B' },
  { id: 2, name: 'Zero Hunger', color: '#DDA63A' },
  { id: 3, name: 'Good Health & Well-being', color: '#4C9F38' },
  { id: 4, name: 'Quality Education', color: '#C5192D' },
  { id: 5, name: 'Gender Equality', color: '#FF3A21' },
  { id: 6, name: 'Clean Water & Sanitation', color: '#26BDE2' },
  { id: 7, name: 'Clean Energy', color: '#FCC30B' },
  { id: 8, name: 'Decent Work & Growth', color: '#A21942' },
  { id: 9, name: 'Industry & Innovation', color: '#FD6925' },
  { id: 10, name: 'Reduced Inequalities', color: '#DD1367' },
  { id: 11, name: 'Sustainable Cities', color: '#FD9D24' },
  { id: 12, name: 'Responsible Consumption', color: '#BF8B2E' },
  { id: 13, name: 'Climate Action', color: '#3F7E44' },
  { id: 14, name: 'Life Below Water', color: '#0A97D9' },
  { id: 15, name: 'Life on Land', color: '#56C02B' },
  { id: 16, name: 'Peace & Justice', color: '#00689D' },
  { id: 17, name: 'Partnerships', color: '#19486A' },
];

export const CATEGORIES = [
  'Education & Tutoring',
  'Digital Skills & Technology',
  'Health & Wellbeing',
  'Environment & Climate',
  'Career & Entrepreneurship',
  'Arts & Culture',
  'Sports & Recreation',
  'Community & Social Work',
  'Legal & Advisory',
  'Translation & Language',
  'Design & Creative',
  'Research & Writing',
];

export const SKILLS = [
  'Teaching', 'Mathematics', 'English', 'Computer Skills', 'Web Development',
  'Graphic Design', 'UI/UX Design', 'Photography', 'Video Editing', 'Public Speaking',
  'Translation', 'Event Management', 'Social Media', 'Career Guidance', 'Entrepreneurship',
  'Environmental Activities', 'Sports Coaching', 'Research', 'First Aid', 'Counseling',
  'Legal Advice', 'Accounting', 'Data Analysis', 'Content Writing',
];
