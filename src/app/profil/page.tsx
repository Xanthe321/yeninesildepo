import ProfileForm from './profile-form';

export default function Profil() {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans leading-relaxed antialiased min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profil Ayarları</h1>
            <p className="text-gray-600">Hesap bilgilerinizi ve tercihlerinizi yönetin</p>
          </div>
          <ProfileForm />
        </div>
      </main>
    </div>
  );
}