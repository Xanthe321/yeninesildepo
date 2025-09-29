import { getWarehouseById } from '../actions';
import WarehouseDetail from './warehouse-detail';
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function Depo({ params }: Props) {
  const { slug } = params;

  if (!slug) return notFound();

  try {
    const warehouse = await getWarehouseById(slug);
    return <WarehouseDetail warehouse={warehouse} />;
  } catch (error) {
    return notFound();
  }
}
