import { Component } from 'react';
import Card from '../Card/Card.tsx';
import type { Starship } from '../../common/types.ts';

interface Props {
  starships: Starship[];
}

class ResultsList extends Component<Props> {
  render() {
    const { starships } = this.props;

    if (!starships || starships.length === 0) {
      return <p className="text-gray-500">No results found</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {starships.map((starship, index) => (
          <Card key={index} starship={starship} />
        ))}
      </div>
    );
  }
}

export default ResultsList;
