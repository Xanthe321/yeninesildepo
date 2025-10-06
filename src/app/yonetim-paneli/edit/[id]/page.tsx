import { getWarehouseById } from '../../actions';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import WarehouseEditForm from './warehouse-edit-form';

interface EditWarehousePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditWarehousePage({ params }: EditWarehousePageProps) {
  // Server-side authentication check
  const user = await getCurrentUser();

  if (!user) {
    redirect('/giris-yap');
  }

  if (user.role !== 'admin') {
    redirect('/depolar');
  }

  const { id } = await params;
  const warehouse = await getWarehouseById(id);

  if (!warehouse) {
    redirect('/yonetim-paneli');
  }

  return (
    <div className="bg-gray-50 text-gray-900 font-sans leading-relaxed antialiased min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Depo Düzenle</h1>
            <p className="text-gray-600 mt-2">"{warehouse.title}" deposunu düzenleyin</p>
          </div>
          <WarehouseEditForm warehouse={warehouse} />
        </div>
      </main>
    </div>
  );
}