import { Plus, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

function HeaderDashboard({title,user,description}:{title:string,user:{name:string} | null,description:string}) {
  return (
    <header className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                {title}
              </p>

              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
                  Hola, {user?.name || ""}
                </h1>
                <p className="max-w-2xl text-sm text-muted-foreground lg:text-base">
                  {description}
                </p>
              </div>
            </div>

            <Link href="/dashboard/upload">
              <Button size="lg" className="font-bold">
                <Plus className="mr-2 h-5 w-5" />
                Nuevo Analisis
              </Button>
            </Link>
          </div>
        </header>
  )
}

export default HeaderDashboard