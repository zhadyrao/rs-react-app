import type { StarshipClientSide } from '../utils/types.ts';
import { useAppDispatch, useAppSelector } from '../utils/hooks.ts';
import { toggleItem } from '../../features/starships/starshipSlice.ts';

interface Props {
  starship: StarshipClientSide;
}

const Card: React.FC<Props> = ({ starship }) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(
    (state) => state.selectedStarships.selected[starship.id]
  );
  return (
    <div className="border rounded p-4 shadow space-y-2">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="form-checkbox"
          checked={!!selected}
          onChange={() => dispatch(toggleItem(starship))}
        />
      </label>
      <h2 className="font-semibold text-lg">{starship.name}</h2>
      <p>
        {`${starship.description} was created ${starship.description}. It costsdmfd`}
      </p>
    </div>
  );
};

export default Card;
