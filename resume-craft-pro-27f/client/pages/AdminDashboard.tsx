import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clearAdminSession, getVisitorHistory, trackVisitorEvent } from "@/lib/storage";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const visitorHistory = getVisitorHistory();

  const today = new Date().toISOString().split("T")[0];

  const filteredHistory = useMemo(() => {
    return visitorHistory.filter((entry) => {
      const matchesName = searchName
        ? (entry.visitorName || "").toLowerCase().includes(searchName.toLowerCase())
        : true;
      const matchesEmail = searchEmail
        ? (entry.email || "").toLowerCase().includes(searchEmail.toLowerCase())
        : true;
      const matchesDate = searchDate ? entry.visitDate === searchDate : true;

      return matchesName && matchesEmail && matchesDate;
    });
  }, [searchDate, searchEmail, searchName, visitorHistory]);

  const totalVisitors = new Set(visitorHistory.map((entry) => entry.visitorId)).size;
  const todayVisitors = new Set(
    visitorHistory.filter((entry) => entry.visitDate === today).map((entry) => entry.visitorId),
  ).size;
  const recentVisitors = visitorHistory.slice(0, 10);

  const handleLogout = () => {
    trackVisitorEvent({
      pageVisited: "/admin/dashboard",
      action: "Admin logout",
      authStatus: "guest",
      loginSignupStatus: "none",
      orderOrHistory: "Admin session cleared",
    });
    clearAdminSession();
    navigate("/auth");
  };

  useEffect(() => {
    trackVisitorEvent({
      pageVisited: "/admin/dashboard",
      action: "Admin dashboard visit",
      authStatus: "guest",
      loginSignupStatus: "none",
      orderOrHistory: "Viewed visitor analytics",
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Visitor history and activity insights</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Total Visitors</CardDescription>
              <CardTitle className="text-3xl">{totalVisitors}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Today's Visitors</CardDescription>
              <CardTitle className="text-3xl">{todayVisitors}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Recent Visitor Events</CardDescription>
              <CardTitle className="text-3xl">{recentVisitors.length}</CardTitle>
            </CardHeader>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Search & Filters</CardTitle>
            <CardDescription>Filter by visitor name, email, and visit date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search by name"
              />
              <Input
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="Search by email"
              />
              <Input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Full Visit History</CardTitle>
            <CardDescription>
              Includes page views, auth activity, and resume actions tracked in this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Visitor ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Auth Status</TableHead>
                  <TableHead>Login/Signup</TableHead>
                  <TableHead>Activity Count</TableHead>
                  <TableHead>Order/History</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center text-muted-foreground">
                      No visitor history found for current filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-mono text-xs">{entry.visitorId}</TableCell>
                      <TableCell>{entry.visitorName || "-"}</TableCell>
                      <TableCell>{entry.email || "-"}</TableCell>
                      <TableCell>{entry.phone || "-"}</TableCell>
                      <TableCell>{entry.visitDate}</TableCell>
                      <TableCell>{entry.visitTime}</TableCell>
                      <TableCell>{entry.pageVisited}</TableCell>
                      <TableCell>{entry.action}</TableCell>
                      <TableCell>{entry.authStatus}</TableCell>
                      <TableCell>{entry.loginSignupStatus || "-"}</TableCell>
                      <TableCell>{entry.activityCount ?? "-"}</TableCell>
                      <TableCell>{entry.orderOrHistory || "-"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
