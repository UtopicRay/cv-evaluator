import { DashboardLayout } from "@/components/dashboard-layout";
import NotificationSetting from "@/components/settings/notification-setting";
import SecurityCard from "@/components/settings/security-card";
import SettingSection from "@/components/settings/setting-section";
import SubscribeDetails from "@/components/settings/subscribe-details";
import UserInfo from "@/components/settings/user-info";

export default function ConfigPage() {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        <div className="sticky top-0 z-10 -mx-6 px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border lg:-mx-8 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Configuracion de Cuenta
          </h1>
        </div>
        <SettingSection
          title="Informacion Personal"
          description="Actualiza tu nombre, cargo profesional y ubicacion para personalizar tu perfil."
        >
          <UserInfo />
        </SettingSection>
        <SettingSection
          title="Datos de la Cuenta"
          description="Gestiona tu nivel de acceso y detalles de facturacion."
        >
          <SubscribeDetails />
        </SettingSection>
        <SettingSection
          title="Seguridad"
          description="Protege tu cuenta actualizando tu contrasena y correo electronico regularmente."
        >
          <SecurityCard />
        </SettingSection>
        <SettingSection
          title="Preferencias de Notificaciones"
          description="Personaliza como y cuando quieres recibir actualizaciones de CVScore."
        >
         <NotificationSetting />
        </SettingSection>
      </div>
    </DashboardLayout>
  );
}
