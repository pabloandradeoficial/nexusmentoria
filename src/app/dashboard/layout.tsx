import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Tenta buscar o perfil
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single();

  const displayName =
    profile?.full_name || user.email?.split('@')[0] || 'Mentorado';

  return (
    <div className="min-h-screen bg-warm-50">
      <DashboardSidebar userName={displayName} />
      <div className="lg:pl-72 pt-16 lg:pt-0">
        {children}
      </div>
    </div>
  );
}
