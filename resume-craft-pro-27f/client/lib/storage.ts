import type { ResumeData, AuthUser, VisitorHistoryEntry } from "@/types/resume";

const RESUME_DATA_KEY = "resumeBuilderData";
const AUTH_USER_KEY = "resumeBuilderUser";
const DRAFT_KEY = "resumeBuilderDraft";
const VISITOR_HISTORY_KEY = "resumeBuilderVisitorHistory";
const VISITOR_ID_KEY = "resumeBuilderVisitorId";
const ADMIN_SESSION_KEY = "resumeBuilderAdminSession";
const IS_ADMIN_KEY = "isAdmin";

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

// Visitor tracking storage
export const getOrCreateVisitorId = (): string => {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;

    const visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
    return visitorId;
  } catch (error) {
    console.error("Failed to get/create visitor id:", error);
    return `fallback-${Date.now()}`;
  }
};

export const getVisitorHistory = (): VisitorHistoryEntry[] => {
  try {
    const entries = localStorage.getItem(VISITOR_HISTORY_KEY);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error("Failed to fetch visitor history:", error);
    return [];
  }
};

export const saveVisitorHistory = (entries: VisitorHistoryEntry[]) => {
  try {
    localStorage.setItem(VISITOR_HISTORY_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Failed to save visitor history:", error);
  }
};

export const trackVisitorEvent = (event: {
  pageVisited: string;
  action: string;
  authStatus: "guest" | "logged_in" | "signed_up";
  loginSignupStatus?: "login" | "signup" | "none";
  orderOrHistory?: string;
}) => {
  try {
    const now = new Date();
    const user = getAuthUser();
    const currentHistory = getVisitorHistory();
    const visitorId = getOrCreateVisitorId();
    const activityCount = currentHistory.filter((entry) => entry.visitorId === visitorId).length + 1;

    const newEntry: VisitorHistoryEntry = {
      id: crypto.randomUUID(),
      visitorId,
      visitorName: user?.name,
      email: user?.email,
      phone: user?.phone,
      pageVisited: event.pageVisited,
      action: event.action,
      authStatus: event.authStatus,
      loginSignupStatus: event.loginSignupStatus ?? "none",
      activityCount,
      orderOrHistory: event.orderOrHistory ?? "",
      visitDate: now.toISOString().split("T")[0],
      visitTime: now.toLocaleTimeString(),
      createdAt: now.toISOString(),
    };

    saveVisitorHistory([newEntry, ...currentHistory]);
  } catch (error) {
    console.error("Failed to track visitor event:", error);
  }
};

// Admin session storage
export const setAdminSession = (isLoggedIn: boolean) => {
  try {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ isLoggedIn }));
    localStorage.setItem(IS_ADMIN_KEY, isLoggedIn ? "true" : "false");
  } catch (error) {
    console.error("Failed to set admin session:", error);
  }
};

export const getAdminSession = (): boolean => {
  try {
    const simpleFlag = localStorage.getItem(IS_ADMIN_KEY);
    if (simpleFlag === "true") return true;

    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.isLoggedIn);
  } catch (error) {
    console.error("Failed to get admin session:", error);
    return false;
  }
};

export const clearAdminSession = () => {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(IS_ADMIN_KEY);
  } catch (error) {
    console.error("Failed to clear admin session:", error);
  }
};
