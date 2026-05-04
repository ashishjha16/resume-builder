import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Resume from "./pages/Resume";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { RequireAdminAuth } from "./components/admin/RequireAdminAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/admin" element={<Navigate to="/auth" replace />} />
          <Route path="/admin/login" element={<Navigate to="/auth" replace />} />
          <Route
            path="/admin/dashboard"
            element={(
              <RequireAdminAuth>
                <AdminDashboard />
              </RequireAdminAuth>
            )}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
