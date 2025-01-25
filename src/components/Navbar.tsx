import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center">
        <div className="mr-8">
          <a href="/" className="text-xl font-semibold">
            Brand
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-2">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-sm"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};