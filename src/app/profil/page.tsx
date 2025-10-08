import ProfileForm from './profile-form';
import { createClient } from '../../../utils/supabase/server';
import { redirect } from 'next/navigation';

async function getUser() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      redirect('/giris-yap');
    }

    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    return {
      id: user.id,
      email: user.email || '',
      role: userRole?.role || 'user'
    };
  } catch (error) {
    redirect('/giris-yap');
  }
}

export default async function Profil() {
  const user = await getUser();

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 text-gray-900 font-sans leading-relaxed antialiased min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profil Ayarları</h1>
            <p className="text-gray-600">Hesap bilgilerinizi ve tercihlerinizi yönetin</p>
          </div>
          <ProfileForm user={user} />
        </div>
      </main>
    </div>
  );
}