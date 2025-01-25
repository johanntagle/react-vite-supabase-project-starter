import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type UserWithRole = {
  id: string;
  email: string;
  full_name: string | null;
  role: "admin" | "user";
};

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Check if current user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: hasAdminRole, error } = await supabase.rpc('has_role', {
        user_id: session.user.id,
        role: 'admin'
      });

      if (error || !hasAdminRole) {
        navigate("/");
        toast.error("You don't have permission to access this page");
        return;
      }

      setIsAdmin(true);
    };

    checkAdminStatus();
  }, [navigate]);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name");

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) throw rolesError;

      const usersWithRoles: UserWithRole[] = profiles.map((profile) => ({
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: roles.find((r) => r.user_id === profile.id)?.role || "user",
      }));

      return usersWithRoles;
    },
  });

  const updateUserRole = async (userId: string, newRole: "admin" | "user") => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .update({ role: newRole })
        .eq("user_id", userId);

      if (error) throw error;
      toast.success("User role updated successfully");
    } catch (error) {
      toast.error("Failed to update user role");
      console.error("Error updating user role:", error);
    }
  };

  if (isAdmin === null || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">User Management</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.full_name || "N/A"}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <select
                    className="rounded-md border p-2"
                    value={user.role}
                    onChange={(e) =>
                      updateUserRole(user.id, e.target.value as "admin" | "user")
                    }
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;