import type { Starship } from '../../common/types.ts';

interface Props {
  starship: Starship;
}

const Card: React.FC<Props> = ({ starship }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="font-semibold text-lg">{starship.properties.name}</h2>
      <p>{`${starship.description} was created ${starship.properties.created}. It costs ${starship.properties.cost_in_credits} and made by ${starship.properties.manufacturer}`}</p>
    </div>
  );
};

export default Card;
