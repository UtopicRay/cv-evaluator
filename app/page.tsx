import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getUser } from "@/lib/fetching/fetch"
import {
  Sparkles,
  Upload,
  BarChart3,
  ArrowRight,
  Map,
  Verified,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function HomePage() {
  const user = await getUser()

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-header border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-primary"
            >
              CVScore
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a
                className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
                href="#funcionalidades"
              >
                Funcionalidades
              </a>
              <a
                className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
                href="#proceso"
              >
                Cómo funciona
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:block text-sm font-semibold text-secondary hover:text-primary transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href={user ? "/dashboard" : "/register"}
              className="px-6 py-2.5 bg-primary text-on-primary text-sm font-bold rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Ir al Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-16 pb-24 md:pt-32 md:pb-40 bg-gradient-to-br from-primary via-primary to-primary/80">
          {/* Decorative grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white text-[11px] font-bold uppercase tracking-widest rounded-full animate-fade-up">
                <Sparkles className="h-3.5 w-3.5" />
                Editorial Intelligence
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight text-balance animate-fade-up delay-100">
                Tu trayectoria, analizada con{" "}
                <span className="text-white">precisión quirúrgica.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed animate-fade-up delay-200">
                No somos un simple generador. Somos tu Curador Digital. CVScore
                utiliza algoritmos de vanguardia para diseccionar tu experiencia
                y alinearla milimétricamente con las demandas del mercado actual.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 animate-fade-up delay-300">
                <Link href="/register">
                  <button className="px-8 py-4 bg-white text-primary font-bold rounded-lg shadow-lg btn-hover-effect active:scale-95 hover:bg-white/90">
                    Comienza tu análisis
                  </button>
                </Link>
                <Link href={user ? "/dashboard" : "/login"}>
                  <button className="px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white/30 btn-secondary-hover transition-all hover:bg-white/10">
                    Ver Demo
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative animate-fade-up delay-400">
              <div className="relative z-10 p-4 bg-white/10 backdrop-blur-md rounded-2xl editorial-shadow border border-white/20">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_M1a_MIginhLvZVbw298JEsCi8guH9WVhtRAJArE7L9dA9-r2A6-t-E-Rwsj3TbVXwgZnZ5H-oXVD9pTANx13I-Tu9-Fxe3R_znZ7emZUys5Tn-o66GXM5HCYM4NqmlJj3Ayvu3Ocp3kC_CujOS8JCLR37ZhMhzzr1svnPr-81T3Ng6YK3CbzLxWxvuksLhrJ_uDpmSaC4QYlOM_n36DNx5yjYha_lLGCiAB4lOHaSno6HDFJ6oRV"
                  alt="CV Analysis Dashboard Preview"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                  priority
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </section>

        {/* Feature Spotlight (Bento Style) */}
        <section className="py-24 bg-surface-container-low" id="funcionalidades">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">
                Arquitectura de Éxito
              </h2>
              <p className="text-3xl md:text-4xl font-bold text-on-background">
                Diseñamos tu narrativa profesional con inteligencia.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between group feature-card-hover border border-transparent hover:border-outline-variant/10">
                <div className="max-w-md">
                  <BarChart3 className="h-10 w-10 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">
                    Análisis de Competencias Profundo
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Extraemos habilidades latentes de tu historial que otros
                    pasan por alto. Nuestra IA entiende el contexto, no solo las
                    palabras.
                  </p>
                </div>
                <div className="mt-12 flex items-center justify-between">
                  <div className="h-1.5 w-32 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-4/5 rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-primary">
                    MATCH SCORE 92%
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-primary p-8 rounded-xl text-on-primary flex flex-col justify-between feature-card-hover cursor-pointer group">
                <div>
                  <Map className="h-10 w-10 text-white mb-6" />
                  <h3 className="text-2xl font-bold mb-4">
                    Roadmap de Optimización
                  </h3>
                  <p className="text-primary-fixed leading-relaxed opacity-90">
                    Un plan de acción paso a paso para cerrar la brecha entre
                    donde estás y donde quieres estar.
                  </p>
                </div>
                <button className="mt-8 flex items-center gap-2 text-sm font-bold group-hover:translate-x-1 transition-transform">
                  Explorar Ruta
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 hover:border-primary/20 feature-card-hover cursor-default">
                <Verified className="h-10 w-10 text-tertiary mb-6" />
                <h3 className="text-xl font-bold mb-3">
                  Detección de Keywords ATS
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Asegúrate de que los algoritmos de filtrado te lean
                  correctamente. Optimizamos tu visibilidad técnica.
                </p>
              </div>

              {/* Card 4 */}
              <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl flex flex-col md:flex-row gap-8 items-center border border-outline-variant/10 feature-card-hover">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">
                    Inteligencia Editorial
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    Transformamos listas de tareas en logros de alto impacto. Tu
                    CV se leerá como una pieza de periodismo de negocios premium.
                  </p>
                </div>
                <div className="w-full md:w-48 aspect-video bg-surface-container-low rounded-lg overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3UicTXvm9PpYSV8y8clxpLxi7NF-Bv_0-nWafOJouDib-_NU1Uv55C2oZpsTwMw2TEf2EjTDpBs0Oc1i2h6oMgWvAMSm5FH2W5ZMrXnsWIBAE5oXEeNlBmbr9vf4M5vHfZa9AvpzE3PZ97HO9UvuGJooFJQPqtDi-4WAfjcJI1-Nmxrm6nbV2xvREwHg1NgRwHbPaX50RktGas48h9pWynRUfm_hEnHWAOZnrv5YpkIJ5lzaBSErk"
                    alt="Editorial Intelligence"
                    width={192}
                    height={108}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works (Step-by-step) */}
        <section className="py-24 bg-surface" id="proceso">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="sticky top-32">
                <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">
                  El Protocolo
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-on-background mb-8 leading-tight">
                  Tres pasos hacia la maestría profesional.
                </h3>
                <p className="text-lg text-secondary mb-12 max-w-md">
                  Hemos simplificado la ingeniería de carreras en un proceso
                  fluido y transparente.
                </p>
                <div className="w-full h-[300px] rounded-2xl bg-surface-container-low overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSz84mqjGKTnnDxDVkhN4W04MSVv0G2SnivqR9No3Grq-PZGHPqCm1CCiEq9NlbY1on4TeE47hdXEy4oB-4_QI1m40LP4x_pqV426xlwwML0mEHt_xnE-axGuOmvDRvrpL1W6Hp2jIRnCUJVh8YuVKSmsU6cWIj_L8z3aD24mUbYbx6fktDJ51IUm0ve32h7BLMSAEgcb0CzmXoaTeCEr0vyNNAu3IGnlOzPeDGjUHOUY7_pE9Slc5"
                    alt="Process Steps"
                    width={600}
                    height={300}
                    className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                  />
                </div>
              </div>

              <div className="space-y-12">
                {/* Step 1 */}
                <div className="flex gap-8 group scroll-reveal-item">
                  <div className="shrink-0 w-14 h-14 bg-surface-container-lowest rounded-xl flex items-center justify-center text-xl font-black text-primary editorial-shadow border border-outline-variant/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    01
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold mb-3">
                      Sube tu Trayectoria
                    </h4>
                    <p className="text-secondary leading-relaxed">
                      Carga tu CV actual en cualquier formato. Nuestra IA de
                      curación editorial comenzará a analizar tu estructura y
                      contenido base de inmediato.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-8 group scroll-reveal-item">
                  <div className="shrink-0 w-14 h-14 bg-surface-container-lowest rounded-xl flex items-center justify-center text-xl font-black text-primary editorial-shadow border border-outline-variant/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    02
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold mb-3">
                      Define el Objetivo
                    </h4>
                    <p className="text-secondary leading-relaxed">
                      Pega el enlace o el texto de la oferta de trabajo que
                      deseas conquistar. Cruzamos los datos en tiempo real para
                      encontrar puntos de fricción.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-8 group scroll-reveal-item">
                  <div className="shrink-0 w-14 h-14 bg-surface-container-lowest rounded-xl flex items-center justify-center text-xl font-black text-primary editorial-shadow border border-outline-variant/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    03
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold mb-3">
                      Ejecuta la Optimización
                    </h4>
                    <p className="text-secondary leading-relaxed">
                      Recibe tu Match Score dinámico y un roadmap personalizado.
                      Sabrás exactamente qué cambiar, qué resaltar y qué
                      palabras clave añadir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div
              className="relative rounded-3xl p-12 md:p-20 overflow-hidden text-center"
              style={{ backgroundColor: "#191c1e" }}
            >
              {/* Subtle dot pattern bg */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(#ffffff 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative z-10 space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  ¿Listo para elevar tu estándar profesional?
                </h2>
                <p
                  className="text-lg md:text-xl max-w-2xl mx-auto opacity-80"
                  style={{ color: "#adc7ff" }}
                >
                  Únete a la nueva era de la inteligencia editorial aplicada a
                  la búsqueda de empleo.
                </p>
                <div className="flex justify-center pt-4">
                  <Link href="/register">
                    <button
                      className="px-10 py-5 font-bold rounded-lg hover:scale-105 transition-transform shadow-xl btn-hover-effect"
                      style={{
                        backgroundColor: "#0059bb",
                        color: "#ffffff",
                        boxShadow: "0 10px 40px -10px rgba(0, 89, 187, 0.5)",
                      }}
                    >
                      Comenzar ahora gratis
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/20 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-2xl font-black tracking-tight text-primary mb-6 block"
              >
                CVScore
              </Link>
              <p className="text-secondary max-w-xs leading-relaxed text-sm">
                La plataforma de curación digital definitiva para profesionales
                que no se conforman con lo estándar. Editorial Intelligence
                para tu carrera.
              </p>
            </div>
            <div>
              <h5 className="text-xs font-black text-on-background uppercase tracking-widest mb-6">
                Plataforma
              </h5>
              <ul className="space-y-4 text-sm font-medium text-secondary">
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Match Score
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Precios
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-black text-on-background uppercase tracking-widest mb-6">
                Compañía
              </h5>
              <ul className="space-y-4 text-sm font-medium text-secondary">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Términos Legales
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-on-surface-variant font-medium">
              © 2024 CVScore. Todos los derechos reservados. Digital Curator
              Labs.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-secondary hover:text-primary transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-secondary hover:text-primary transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.599 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
