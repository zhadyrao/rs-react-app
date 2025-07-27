import React, { useEffect, useState } from 'react';
import LoadingBar from '../LoadingBar/LoadingBar.tsx';
import type { StarshipById } from '../utils/types.ts';

interface ItemDetailProps {
  id: string;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ id }) => {
  const [data, setData] = useState<StarshipById | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchStarship = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/starships/${id}`);
        if (!res.ok) throw new Error('Failed to fetch starship');
        const json = await res.json();
        setData(json.result.properties);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStarship();
  }, [id]);

  if (loading) return <LoadingBar />;
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 bg-white max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{data?.name}</h2>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
        <li>
          <strong>Model:</strong> {data?.model}
        </li>
        <li>
          <strong>Class:</strong> {data?.starship_class}
        </li>
        <li>
          <strong>Manufacturer:</strong> {data?.manufacturer}
        </li>
        <li>
          <strong>Cost:</strong> {data?.cost_in_credits} credits
        </li>
        <li>
          <strong>Crew:</strong> {data?.crew}
        </li>
        <li>
          <strong>Passengers:</strong> {data?.passengers}
        </li>
        <li>
          <strong>Cargo:</strong> {data?.cargo_capacity}
        </li>
        <li>
          <strong>Consumables:</strong> {data?.consumables}
        </li>
        <li>
          <strong>Speed:</strong> {data?.max_atmosphering_speed}
        </li>
        <li>
          <strong>Hyperdrive:</strong> {data?.hyperdrive_rating}
        </li>
        <li>
          <strong>Length:</strong> {data?.length}
        </li>
        <li>
          <strong>MGLT:</strong> {data?.MGLT}
        </li>
      </ul>
    </div>
  );
};

export default ItemDetail;
