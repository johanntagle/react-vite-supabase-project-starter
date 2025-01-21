import { Button } from "@/components/ui/button";

export const Navbar = () => {
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
            <Button variant="ghost" className="text-sm">
              Sign in
            </Button>
            <Button className="text-sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};