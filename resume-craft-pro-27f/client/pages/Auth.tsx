import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveAuthUser, setAdminSession, trackVisitorEvent } from "@/lib/storage";
import {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidName,
  passwordsMatch,
} from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

type AuthView = "user" | "admin";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authView, setAuthView] = useState<AuthView>("user");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    trackVisitorEvent({
      pageVisited: "/auth",
      action: "Auth page visit",
      authStatus: "guest",
      loginSignupStatus: "none",
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateLoginForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!isValidPassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!isValidName(formData.fullName)) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid mobile number (10+ digits)";
    }

    if (!isValidPassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!passwordsMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (authView === "admin") {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const isValidAdmin =
          adminCredentials.username === "admin" && adminCredentials.password === "admin";

        if (!isValidAdmin) {
          setErrors({ admin: "Invalid admin credentials" });
          trackVisitorEvent({
            pageVisited: "/auth",
            action: "Admin login failed",
            authStatus: "guest",
            loginSignupStatus: "none",
            orderOrHistory: "Invalid admin credentials",
          });
          setLoading(false);
          return;
        }

        setAdminSession(true);
        trackVisitorEvent({
          pageVisited: "/auth",
          action: "Admin login success",
          authStatus: "guest",
          loginSignupStatus: "none",
          orderOrHistory: "Admin session started",
        });
        toast({
          title: "Success",
          description: "Admin logged in successfully!",
        });
        navigate("/admin/dashboard");
        return;
      }

      // Validate form
      const isValid = isLogin
        ? validateLoginForm()
        : validateRegisterForm();

      if (!isValid) {
        setLoading(false);
        return;
      }

      // Simulate auth delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save user info
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: isLogin ? "User" : formData.fullName,
        email: formData.email,
        phone: formData.phone,
      };

      saveAuthUser(user);
      trackVisitorEvent({
        pageVisited: "/auth",
        action: isLogin ? "User login success" : "User signup success",
        authStatus: isLogin ? "logged_in" : "signed_up",
        loginSignupStatus: isLogin ? "login" : "signup",
        orderOrHistory: isLogin ? "User logged in" : "User account created",
      });

      toast({
        title: "Success",
        description: isLogin
          ? "Logged in successfully!"
          : "Account created successfully!",
      });

      // Navigate to resume builder
      navigate("/resume");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const switchAuthView = (nextView: AuthView) => {
    setAuthView(nextView);
    setErrors({});
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-primary text-primary-foreground rounded-lg p-3 mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Resume Builder
          </h1>
          <p className="text-muted-foreground">
            Create your professional resume in minutes
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-border">
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-secondary p-1">
            <button
              type="button"
              onClick={() => switchAuthView("user")}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                authView === "user"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              User Login
            </button>
            <button
              type="button"
              onClick={() => switchAuthView("admin")}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                authView === "admin"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Admin Login
            </button>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {authView === "admin" ? "Admin Portal Access" : isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authView === "admin" ? (
              <>
                <div>
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter admin username"
                    value={adminCredentials.username}
                    onChange={handleAdminInputChange}
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="adminPassword" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="adminPassword"
                    name="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={adminCredentials.password}
                    onChange={handleAdminInputChange}
                    disabled={loading}
                  />
                </div>
                {errors.admin && (
                  <p className="text-xs text-destructive mt-1">{errors.admin}</p>
                )}
              </>
            ) : (
              <>
            {/* Full Name (Register only) */}
            {!isLogin && (
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone (Register only) */}
            {!isLogin && (
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Mobile Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
            )}

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password (min 8 characters)"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-xs text-destructive mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={errors.confirmPassword ? "border-destructive" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6 h-10 text-base font-semibold"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"></span>
                  {authView === "admin"
                    ? "Signing in as admin..."
                    : isLogin
                    ? "Signing in..."
                    : "Creating account..."}
                </span>
              ) : authView === "admin" ? (
                "Admin Sign In"
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Toggle Auth Mode */}
          {authView === "user" && (
            <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                disabled={loading}
                className="text-primary font-semibold hover:underline disabled:opacity-50"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>No credit card required • Free to use • Your data is private</p>
        </div>
      </div>
    </div>
  );
}
