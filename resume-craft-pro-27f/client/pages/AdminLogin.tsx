import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { setAdminSession, trackVisitorEvent } from "@/lib/storage";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    trackVisitorEvent({
      pageVisited: "/admin/login",
      action: "Admin login page visit",
      authStatus: "guest",
      loginSignupStatus: "none",
    });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAdminSession(true);
      trackVisitorEvent({
        pageVisited: "/admin/login",
        action: "Admin login success",
        authStatus: "guest",
        loginSignupStatus: "none",
        orderOrHistory: "Admin access granted",
      });
      navigate("/admin/dashboard");
      return;
    }

    setError("Invalid admin credentials.");
    trackVisitorEvent({
      pageVisited: "/admin/login",
      action: "Admin login failed",
      authStatus: "guest",
      loginSignupStatus: "none",
      orderOrHistory: "Invalid admin credentials attempt",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Portal Login</CardTitle>
          <CardDescription>Use admin credentials to access visitor analytics.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-username">Username</Label>
              <Input
                id="admin-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Login to Admin Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
