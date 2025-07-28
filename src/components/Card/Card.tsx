import type { Starship } from '../utils/types.ts';

interface Props {
  starship: Starship;
}

const Card: React.FC<Props> = ({ starship }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="font-semibold text-lg">{starship.properties.name}</h2>
      <p>{`${starship.description} was created ${starship.properties.created}. It costs ${starship.properties.cargo_capacity} and made by ${starship.properties.consumables}`}</p>
    </div>
  );
};

export default Card;
