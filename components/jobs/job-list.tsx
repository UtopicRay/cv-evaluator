"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { Job } from "@/type";
import { cn } from "@/lib/utils";
import JobCard from "./job-card";

type SortOption = "recent" | "topScore" | "lowScore";

function JobList({ jobs }: { jobs: Job[] }) {
  const [shortedJobs, setShortedJobs] = useState<Job[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("recent");

  useEffect(() => {
    const sorted = sortJobs(jobs, sortOption);
    setShortedJobs(sorted);
  }, [jobs, sortOption]);

  function sortJobs(items: Job[], option: SortOption) {
    const sortedJobs = [...items];

    if (option === "recent") {
      return sortedJobs.sort((a: Job, b: Job) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    }

    if (option === "topScore") {
      return sortedJobs.sort((a: Job, b: Job) => {
        return (b.analyses?.[0]?.matchScore ?? 0) - (a.analyses?.[0]?.matchScore ?? 0);
      });
    }

    return sortedJobs.sort((a: Job, b: Job) => {
      return (a.analyses?.[0]?.matchScore ?? 0) - (b.analyses?.[0]?.matchScore ?? 0);
    });
  }

  const activeClasses =
    "bg-sky-600 text-white hover:bg-sky-700 border-transparent shadow-sm";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          className={cn(
            "rounded-full font-semibold",
            sortOption === "recent" && activeClasses,
          )}
          onClick={() => setSortOption("recent")}
        >
          <Filter className="mr-2 h-4 w-4" />
          Mas recientes
        </Button>

        <Button
          variant="outline"
          className={cn(
            "rounded-full font-semibold",
            sortOption === "topScore" && activeClasses,
          )}
          onClick={() => setSortOption("topScore")}
        >
          Mayor Score
        </Button>

        <Button
          variant="outline"
          className={cn(
            "rounded-full font-semibold",
            sortOption === "lowScore" && activeClasses,
          )}
          onClick={() => setSortOption("lowScore")}
        >
          Menor Score
        </Button>
      </div>
      <section className="space-y-3 mt-8">
        {shortedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={(id: string) =>
              setShortedJobs((prev) => prev.filter((j) => j.id !== id))
            }
          />
        ))}
      </section>
    </div>
  );
}

export default JobList;
