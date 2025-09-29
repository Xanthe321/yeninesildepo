import { getAvailableWarehouses } from './actions';
import WarehouseClient from './warehouse-client';

export default async function Depolar() {
  const warehouses = await getAvailableWarehouses();

  return <WarehouseClient warehouses={warehouses} />;
}