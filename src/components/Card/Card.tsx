import type { Starship } from '../utils/types.ts';

interface Props {
  starship: Starship;
}

const Card: React.FC<Props> = ({ starship }) => {
  return (
    <div className="border rounded p-4 shadow space-y-2">
      <label className="flex items-center space-x-2">
        <input type="checkbox" className="form-checkbox" />
      </label>
      <h2 className="font-semibold text-lg">{starship.properties.name}</h2>
      <p>
        {`${starship.description} was created ${starship.properties.created}. It costs ${starship.properties.cargo_capacity} and made by ${starship.properties.consumables}`}
      </p>
    </div>
  );
};

export default Card;
