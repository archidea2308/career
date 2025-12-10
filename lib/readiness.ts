// lib/readiness.ts
export const calculateReadiness = (data: {
  projects: number;
  certifications: number;
  internships: number;
  softskills: number;
}) => {
  const score =
    data.projects * 0.3 +
    data.certifications * 0.4 +
    data.internships * 0.2 +
    data.softskills * 0.1;
  return Math.min(100, Math.round(score));
};