import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Sparkles, TrendingUp, CheckCircle2, Upload, BarChart3, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CVScore</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Características
            </Link>
            <Link href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cómo Funciona
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Precios
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Comenzar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Optimiza tu CV con IA</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
            Evalúa y mejora tu currículum en minutos
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Obtén una calificación profesional de tu CV con análisis detallado impulsado por IA. Descubre fortalezas y
            áreas de mejora para destacar en tu búsqueda laboral.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                <Upload className="mr-2 h-5 w-5" />
                Subir CV Gratis
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Ver Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo funciona</h2>
            <p className="text-lg text-muted-foreground">Tres simples pasos para mejorar tu CV</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Sube tu CV</h3>
              <p className="text-muted-foreground leading-relaxed">
                Carga tu currículum en formato PDF o DOCX. Nuestro sistema lo procesará de forma segura.
              </p>
            </Card>
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Análisis IA</h3>
              <p className="text-muted-foreground leading-relaxed">
                Nuestra IA evalúa estructura, contenido, palabras clave y formato profesional.
              </p>
            </Card>
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Recibe tu Score</h3>
              <p className="text-muted-foreground leading-relaxed">
                Obtén una calificación detallada con recomendaciones específicas para mejorar.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 md:p-12 bg-card border-border">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">95%</div>
                <p className="text-muted-foreground">Tasa de mejora</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">50K+</div>
                <p className="text-muted-foreground">CVs analizados</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-success mb-2">4.9/5</div>
                <p className="text-muted-foreground">Satisfacción usuarios</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Características principales</h2>
            <p className="text-lg text-muted-foreground">Todo lo que necesitas para un CV perfecto</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: CheckCircle2,
                title: "Análisis Completo",
                description: "Evaluación detallada de estructura, contenido y formato profesional",
              },
              {
                icon: TrendingUp,
                title: "Seguimiento de Progreso",
                description: "Visualiza la evolución de tus CVs y mejoras a lo largo del tiempo",
              },
              {
                icon: Sparkles,
                title: "IA Avanzada",
                description: "Tecnología de última generación para análisis preciso y recomendaciones",
              },
              {
                icon: Award,
                title: "Calificación Visual",
                description: "Sistema de puntuación claro con indicadores de color intuitivos",
              },
            ].map((feature, i) => (
              <Card key={i} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <feature.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">¿Listo para mejorar tu CV?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a miles de profesionales que han mejorado sus currículums con CVScore
            </p>
            <Link href="/register">
              <Button size="lg">Comenzar Ahora - Es Gratis</Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold">CVScore</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Términos
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Contacto
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 CVScore. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
