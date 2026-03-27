import type { ResumeData, AuthUser } from "@/types/resume";

const RESUME_DATA_KEY = "resumeBuilderData";
const AUTH_USER_KEY = "resumeBuilderUser";
const DRAFT_KEY = "resumeBuilderDraft";

// Resume data storage
export const saveResumeData = (data: ResumeData) => {
  try {
    localStorage.setItem(RESUME_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save resume data:", error);
  }
};

export const getResumeData = (): ResumeData | null => {
  try {
    const data = localStorage.getItem(RESUME_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to retrieve resume data:", error);
    return null;
  }
};

export const clearResumeData = () => {
  try {
    localStorage.removeItem(RESUME_DATA_KEY);
  } catch (error) {
    console.error("Failed to clear resume data:", error);
  }
};

// Auth user storage
export const saveAuthUser = (user: AuthUser) => {
  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save auth user:", error);
  }
};

export const getAuthUser = (): AuthUser | null => {
  try {
    const user = localStorage.getItem(AUTH_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to retrieve auth user:", error);
    return null;
  }
};

export const clearAuthUser = () => {
  try {
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.error("Failed to clear auth user:", error);
  }
};

// Draft auto-save
export const saveDraft = (data: ResumeData) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save draft:", error);
  }
};

export const getDraft = (): ResumeData | null => {
  try {
    const data = localStorage.getItem(DRAFT_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to retrieve draft:", error);
    return null;
  }
};

export const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (error) {
    console.error("Failed to clear draft:", error);
  }
};
