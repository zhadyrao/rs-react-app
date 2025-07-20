import { Component } from 'react';
import type { Starship } from '../../common/types.ts';

interface Props {
  starship: Starship;
}

class Card extends Component<Props> {
  render() {
    const starship = this.props.starship;
    return (
      <div className="border rounded p-4 shadow">
        <h2 className="font-semibold text-lg">{starship.properties.name}</h2>
        <p>{`${starship.description} was created ${starship.properties.created}. It costs ${starship.properties.cost_in_credits} and made by ${starship.properties.manufacturer}`}</p>
      </div>
    );
  }
}

export default Card;
