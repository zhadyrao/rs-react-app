import React from 'react';

interface ItemDetailProps {
  id: string;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ id }) => {
  // Component logic here

  return (
    <div>
      details goes here
      <p>{id}</p>
    </div>
  );
};

export default ItemDetail;
