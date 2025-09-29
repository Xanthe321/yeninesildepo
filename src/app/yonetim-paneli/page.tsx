import { getWareHouses } from './actions';
import WarehouseList from './warehouse-list';
import WarehouseModal from './warehouse-modal';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  // Server-side authentication check
  const user = await getCurrentUser();

  if (!user) {
    redirect('/giris-yap');
  }

  if (user.role !== 'admin') {
    redirect('/depolar');
  }

  const warehouses = await getWareHouses();

  return (
    <div className="bg-gray-50 text-gray-900 font-sans leading-relaxed antialiased min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Depo Yönetimi</h1>
          <WarehouseModal />
        </div>
        <WarehouseList warehouses={warehouses} />
      </main>
    </div>
  );
}