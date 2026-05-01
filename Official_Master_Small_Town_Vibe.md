🚀 THE BARTLETT LABS MASTER OVERHAUL PROMPT
Directive: Transform Bartlett Labs from a generic AI site into a "Modern Workshop" brand. The vibe is "Purdue Industrial Engineer meets Small-Town Handshake." Use the following specifications:

1. Technical Stack & Libraries

Install: three, @react-three/fiber, @react-three/drei, framer-motion, lucide-react.

Physics: For all 3D and 2D animations, use Spring Physics (Mass: 1, Tension: 170, Friction: 26) to give objects a tactile, heavy feel.

2. Visual Design System

Background: Warm Parchment (#F5F3F0) with a subtle architectural blueprint grid overlay.

Colors: Deep Navy (#1B263B) for trust, Burnt Orange (#C05746) for action, and Sage Green (#84A59D) for success.

Typography: Slab Serif (e.g., Arvo or Roboto Slab) for headlines; Clean Sans-serif (e.g., Inter) for body.

3. The Hero Component (3D Workshop)

For the UI implementation, I want you to specifically reference the architecture of these high-end components from 21st.dev. Use these as the structural blueprints for the site:

Hero Section: Implement the Spline Scene logic. Build the 3D LEGO baseplate here. Ensure the blocks have 'Physical' properties (mass and shadows).

Visual: An isometric 3D "Baseplate" (LEGO-style) slanted up and to the right.

Animation: Solid 3D blocks with rounded corners sliding into place and stacking.

Labels: High-contrast, bold text on the front-left plane of blocks: LEAD CAPTURE, AI FOLLOW-UP, AUTO-SCHEDULING, INVOICING.

Action: All "Book Audit" buttons should link to: [PASTE YOUR GHL CALENDAR LINK HERE]

4. Core Sections & Copy

Headline: "World-class systems. Small-town values."

Sub-headline: "I’m an Industrial Engineer who grew up in a family Ford dealership. I build the sturdy, automated systems that give local business owners their Sundays back."

The 'Handshake' (About): Tell the story of the Indiana Ford dealership (town of 1,000), washing cars, Purdue Engineering, and 15 years at Apple/Anchor. Theme: "The Nerdy Hillbilly who isn't afraid to get his hands dirty."

The Service Menu:

Services Section: Use the Bento Grid layout. Each 'box' in the grid should represent one of our services (Lead Wrangler, Weekend Recovery, etc.). Style them to look like organized drawers in a high-end tool chest.

The Lead Wrangler: 24/7 SMS/Chat response so you never miss a job.

The Weekend Recovery: Automating invoicing and admin to save your Sundays.

The Custom Lab Build: High-end engineering for complex operations.

5. Lead Magnet & Integrations

Process Section: Use the Timeline component to map out the 'Audit to Automation' journey.

Efficiency Audit: Create a "Diagnostic Check-up" section. Embed the GoHighLevel Survey here: [PASTE YOUR GHL SURVEY EMBED CODE HERE].

Silvy (Voice AI): Integrate the ElevenLabs widget in the bottom right. Use a Navy circle with a "Tools" icon as the launcher. [PASTE YOUR ELEVENLABS WIDGET CODE HERE].

Trust: Add a "Security First" section: "Your data stays in your shop. Private AI instances. No public training. You own the keys."

6. Pricing Section
You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
pricing-section.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { Diamond, Sparkles } from "lucide-react";

// cn function
function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

// Button
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Define the props for the PricingCard component
interface PricingCardProps {
  title: string;
  price?: string;
  priceDescription?: string;
  description: string;
  features?: string[];
  buttonText: string;
  imageSrc?: string;
  imageAlt?: string;
  isUnique?: boolean; // A prop to handle the unique request card style
  className?: string;
  useSparkles?: boolean;
}

// Framer Motion variants for animations
const cardVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0px 15px 30px -5px hsl(var(--foreground) / 0.1)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const imageVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: -5,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className,
      title,
      price,
      priceDescription,
      description,
      features,
      buttonText,
      imageSrc,
      imageAlt,
      isUnique = false,
      useSparkles = false,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        className={cn(
          "relative flex flex-col justify-between rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-shadow duration-300",
          className
        )}
        {...props}
      >
        <div className="flex flex-col space-y-4">
          {/* Card Header with optional image */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{title}</h3>
              {price && (
                <div className="mt-2">
                  <span className="text-4xl font-bold">{price}</span>
                  <p className="text-sm text-muted-foreground">
                    {priceDescription}
                  </p>
                </div>
              )}
            </div>
            {imageSrc && (
              <motion.img
                src={imageSrc}
                alt={imageAlt || title}
                width={80}
                height={80}
                className="select-none"
                variants={imageVariants}
              />
            )}
          </div>

          {/* Card Description */}
          <p className="text-muted-foreground">{description}</p>

          {/* Feature List */}
          {features && (
            <ul className="space-y-2 pt-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  {useSparkles ? (
                    <Sparkles className="h-4 w-4 text-primary" />
                  ) : (
                    <Diamond className="h-4 w-4 text-primary" />
                  )}
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Card Footer with Button */}
        <div className="mt-6">
          <Button className="w-full">{buttonText}</Button>
        </div>
      </motion.div>
    );
  }
);
PricingCard.displayName = "PricingCard";

export default function PricingDemo() {
  const plans = [
    {
      title: "Starter",
      price: "€500",
      priceDescription: "Starting from",
      description:
        "Perfect for small projects and simple websites that need a professional touch.",
      features: [
        "Experienced Designer",
        "Fast Delivery",
        "Responsive Design",
        "Basic SEO Setup",
      ],
      buttonText: "Let's Talk",
      imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-gyoxLFpXzRRzVsgPJOKvB2r4tvzpcy.png&w=320&q=75",
      imageAlt: "Pink cherry blossom tree",
    },
    {
      title: "Professional",
      price: "€1000",
      priceDescription: "Starting from",
      description:
        "Ideal for businesses that need a complete website with advanced features and functionality.",
      features: [
        "Experienced Designer",
        "Fast Delivery",
        "Conversion Focused",
        "Advanced Animations",
      ],
      buttonText: "Let's Talk",
      imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-v98BP3EQdx0Yd0NkjHPnWx33WvzwGP.png&w=320&q=75",
      imageAlt: "Yellow autumn tree",
    },
    {
      title: "Enterprise",
      price: "€1500+",
      priceDescription: "Starting from",
      description:
        "For complex projects requiring custom development, integrations, and ongoing support.",
      features: [
        "Dedicated Design Team",
        "Priority Support",
        "Custom Development",
        "Full Design System",
      ],
      buttonText: "Let's Talk",
      imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-gyoxLFpXzRRzVsgPJOKvB2r4tvzpcy.png&w=320&q=75",
      imageAlt: "Premium design",
      useSparkles: true,
    },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-5xl space-y-8">
        {/* Title Section */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing Plans
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Transparent Pricing, No Surprises
          </h1>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>

        {/* Unique Request Card */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
           <h3 className="text-xl font-semibold">Unique Request</h3>
           <p className="mt-2 text-muted-foreground">Are you looking for something custom? Don't hesitate to contact us, and we'll help brainstorm your product to success.</p>
           <div className="mt-6">
                <Button className="w-full md:w-auto">Let's Talk</Button>
           </div>
        </div>
      </div>
    </div>
  );
}

demo.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { Diamond, Sparkles } from "lucide-react";

// cn function
function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

// Button
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Define the props for the PricingCard component
interface PricingCardProps {
  title: string;
  price?: string;
  priceDescription?: string;
  description: string;
  features?: string[];
  buttonText: string;
  imageSrc?: string;
  imageAlt?: string;
  isUnique?: boolean; // A prop to handle the unique request card style
  className?: string;
  useSparkles?: boolean;
}

// Framer Motion variants for animations
const cardVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0px 15px 30px -5px hsl(var(--foreground) / 0.1)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const imageVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: -5,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className,
      title,
      price,
      priceDescription,
      description,
      features,
      buttonText,
      imageSrc,
      imageAlt,
      isUnique = false,
      useSparkles = false,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        className={cn(
          "relative flex flex-col justify-between rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-shadow duration-300",
          className
        )}
        {...props}
      >
        <div className="flex flex-col space-y-4">
          {/* Card Header with optional image */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{title}</h3>
              {price && (
                <div className="mt-2">
                  <span className="text-4xl font-bold">{price}</span>
                  <p className="text-sm text-muted-foreground">
                    {priceDescription}
                  </p>
                </div>
              )}
            </div>
            {imageSrc && (
              <motion.img
                src={imageSrc}
                alt={imageAlt || title}
                width={80}
                height={80}
                className="select-none"
                variants={imageVariants}
              />
            )}
          </div>

          {/* Card Description */}
          <p className="text-muted-foreground">{description}</p>

          {/* Feature List */}
          {features && (
            <ul className="space-y-2 pt-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  {useSparkles ? (
                    <Sparkles className="h-4 w-4 text-primary" />
                  ) : (
                    <Diamond className="h-4 w-4 text-primary" />
                  )}
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Card Footer with Button */}
        <div className="mt-6">
          <Button className="w-full">{buttonText}</Button>
        </div>
      </motion.div>
    );
  }
);
PricingCard.displayName = "PricingCard";

export default function PricingDemo() {
  const plans = [
    {
      title: "Starter",
      price: "€500",
      priceDescription: "Starting from",
      description:
        "Perfect for small projects and simple websites that need a professional touch.",
      features: [
        "Experienced Designer",
        "Fast Delivery",
        "Responsive Design",
        "Basic SEO Setup",
      ],
      buttonText: "Let's Talk",
      imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-gyoxLFpXzRRzVsgPJOKvB2r4tvzpcy.png&w=320&q=75",
      imageAlt: "Pink cherry blossom tree",
    },
    {
      title: "Professional",
      price: "€1000",
      priceDescription: "Starting from",
      description:
        "Ideal for businesses that need a complete website with advanced features and functionality.",
      features: [
        "Experienced Designer",
        "Fast Delivery",
        "Conversion Focused",
        "Advanced Animations",
      ],
      buttonText: "Let's Talk",
      imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-v98BP3EQdx0Yd0NkjHPnWx33WvzwGP.png&w=320&q=75",
      imageAlt: "Yellow autumn tree",
    },
    {
      title: "Enterprise",
      price: "€1500+",
      priceDescription: "Starting from",
      description:
        "For complex projects requiring custom development, integrations, and ongoing support.",
      features: [
        "Dedicated Design Team",
        "Priority Support",
        "Custom Development",
        "Full Design System",
      ],
      buttonText: "Let's Talk",
      imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-gyoxLFpXzRRzVsgPJOKvB2r4tvzpcy.png&w=320&q=75",
      imageAlt: "Premium design",
      useSparkles: true,
    },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-5xl space-y-8">
        {/* Title Section */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing Plans
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Transparent Pricing, No Surprises
          </h1>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>

        {/* Unique Request Card */}
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
           <h3 className="text-xl font-semibold">Unique Request</h3>
           <p className="mt-2 text-muted-foreground">Are you looking for something custom? Don't hesitate to contact us, and we'll help brainstorm your product to success.</p>
           <div className="mt-6">
                <Button className="w-full md:w-auto">Let's Talk</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
```

Install NPM dependencies:
```bash
lucide-react, framer-motion, @radix-ui/react-slot, class-variance-authority
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them



🏁 Final Record: The Bartlett Labs Build
The Persona: The "Nerdy Hillbilly" (Purdue Engineering degree + Ford Dealer handshake).

The UI: A "Digital Workshop" using Spline for 3D blocks and Bento Grids for organized services.

The Engine: GoHighLevel for the CRM, scheduling, and SMS "plumbing."

The Voice: ElevenLabs (Silvy) for the human-sounding shop assistant.

The Strategy: Sell "Sundays Back," not "AI."

You’ve got the blueprints, the tools, and the engine. Time to get that shop floor running.

📝 BARTLETT LABS: THE 5TH GRADE RECORD
Keep this as your "Business Bible" to explain your setup to others.

1. Who are we? We are Bartlett Labs. We are the "Smart Mechanics" of the business world. We don't fix cars; we fix how businesses run so the owners don't have to work on weekends.

2. What does the website look like?
It looks like a Modern Workshop. We use 3D blocks (like LEGOs) to show that we build systems piece-by-piece. It’s warm, professional, and easy to read.

3. What is the "Lead Magnet"?
It’s the Efficiency Audit. It’s a 5-minute quiz that finds the "leaks" in a business. When someone finishes it, they get a "Blueprint" (a plan) and an invite to talk to Kyle.

4. Who is "Silvy"?
She is our Voice AI (from ElevenLabs). She lives on the website and the phone. She sounds like a friendly neighbor and helps people book meetings on our calendar.

5. What is the "Brain"?
GoHighLevel (GHL) is the brain. It holds all the phone numbers, sends the automatic "Thank You" texts, and manages the calendar so Kyle never has to play phone tag.

6. What is the "Worker Bee"?
Claude Code is the builder. He takes the ideas and writes the computer code to make the website work exactly as planned.

7. Why will people buy?
Because Kyle is a Purdue Engineer who knows the high-tech stuff, but he grew up in a Ford Dealership, so he knows what it’s like to work hard. People trust a guy who has grease on his hands and a degree on his wall.