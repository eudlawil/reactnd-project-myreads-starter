import React from 'react';
import PropTypes from 'prop-types';

const ShelfSelect = props => {
  const { shelves, shelf } = props;

  return (
    <div className="book-shelf-changer">
        <select>
            <option value="move" disabled>Move to...</option>
           {shelves.map((s, index) => (
                <option value={s.id} key={index} >{s.name}</option>
           ))}
            <option value="none">None</option>
        </select>
    </div>
  );
};

ShelfSelect.propTypes = {
  shelves: PropTypes.array.isRequired,
  shelf:   PropTypes.object.isRequired,
};

export default ShelfSelect;