"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, FileText, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadZoneProps {
  file: File | null
  onFileChange: (file: File | null) => void
  error?: string
}

export function FileUploadZone({ file, onFileChange, error }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const validateFile = (file: File): string | null => {
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      return "El archivo debe ser PDF o DOCX"
    }
    if (file.size > maxSize) {
      return "El archivo excede el límite de 5MB"
    }
    return null
  }

  const processFile = (file: File) => {
    const error = validateFile(file)
    if (error) {
      alert(error)
      return
    }

    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 100)

    onFileChange(file)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) {
        processFile(droppedFile)
      }
    },
    [onFileChange],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      processFile(selectedFile)
    }
  }

  const handleRemove = () => {
    onFileChange(null)
    setUploadProgress(0)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="space-y-4 w-full">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-12 transition-all cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5",
          )}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
          />
          <div className="flex flex-col items-center text-center">
            <div className={cn("mb-4 p-4 rounded-full transition-colors", isDragging ? "bg-primary/10" : "bg-muted")}>
              <Upload className={cn("h-12 w-12", isDragging ? "text-primary" : "text-muted-foreground")} />
            </div>
            <p className="text-lg font-medium mb-2">
              {isDragging ? "Suelta tu archivo aquí" : "Arrastra tu CV aquí o haz clic para seleccionar"}
            </p>
            <p className="text-sm text-muted-foreground mb-4">Formatos soportados: PDF, DOCX (Máx. 5MB)</p>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Examinar archivos
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-border rounded-xl p-6 bg-card">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleRemove} className="flex-shrink-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {uploadProgress < 100 ? (
                <div className="space-y-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Subiendo... {uploadProgress}%</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-success">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Archivo cargado exitosamente</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
