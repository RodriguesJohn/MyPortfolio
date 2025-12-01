import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  IconCalendar,
  IconPackage,
  IconUsers,
} from "@tabler/icons-react";

export function KPICardsWithHoverEffects() {
  const kpis = [
    {
      value: 10,
      suffix: "+",
      label: "Years of experience",
      icon: <IconCalendar className="w-6 h-6" />,
    },
    {
      value: 20,
      suffix: "+",
      label: "Number of products worked on",
      icon: <IconPackage className="w-6 h-6" />,
    },
    {
      value: 100,
      suffix: "M+",
      label: "Number of users impacted",
      icon: <IconUsers className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 py-10 w-full">
      {kpis.map((kpi, index) => (
        <KPICard key={kpi.label} {...kpi} index={index} />
      ))}
    </div>
  );
}

const KPICard = ({
  value,
  suffix,
  label,
  icon,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 3000; // 3 seconds for smoother counting
    const steps = 120; // More steps for smoother animation
    const increment = value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextValue = Math.min(Math.floor(increment * currentStep), value);
      setDisplayValue(nextValue);

      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <Card
        className={cn(
          "flex flex-col py-10 relative group/kpi transition-shadow duration-300 border-[0.5px] border-border/30 dark:border-border/20 bg-card",
          "shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
          "dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        )}
      >
        <div className="opacity-0 group-hover/kpi:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none rounded-lg" />

        <div className="mb-4 relative z-10 px-6 md:px-10 text-neutral-600 dark:text-neutral-400 opacity-60">
          {icon}
        </div>
        
        <div className="text-4xl font-semibold mb-2 relative z-10 px-6 md:px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/kpi:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/kpi:bg-blue-500 transition-all duration-200 origin-center" />
          <span className="group-hover/kpi:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100 opacity-100">
            {displayValue}{suffix}
          </span>
        </div>
        
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-6 md:px-10 opacity-60">
          {label}
        </p>
      </Card>
    </div>
  );
};

