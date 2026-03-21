"use client"

import { useState } from "react"
import { CVCard } from "@/components/cv-card"
import { CVItem } from "@/type"

type CvListProps = {
  cvs: CVItem[]
}

export function CvList({ cvs }: CvListProps) {
  const [items, setItems] = useState<CVItem[]>(cvs)

  const handleDeleted = (id: string) => {
    setItems((prev) => prev.filter((cv) => cv.id !== id))
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((cv) => (
        <CVCard
          key={cv.id}
          {...cv}
          onDeleted={handleDeleted}
        />
      ))}
    </div>
  )
}
