import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative">
      <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Build something amazing with our platform
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Start your journey with our intuitive tools and create exceptional experiences. We provide everything you need to bring your ideas to life.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" className="text-base">
            Get started
          </Button>
          <Button size="lg" variant="outline" className="text-base">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
};