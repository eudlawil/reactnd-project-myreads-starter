import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ShelfSelect extends Component {
  handleChange = (e) => {
    e.preventDefault();
    this.props.updateShelf(this.props.bookId, {shelf: e.target.value} );
  }

  render() {
    const { shelves, shelfId } = this.props;
    return (
      <div className="book-shelf-changer">
          <select value={shelfId} onChange={this.handleChange} >
              <option value="move" disabled>Move to...</option>
              {shelves.map((s, index) => {
                return (
                  <option value={s.id} key={index} >{s.name}</option>
                )
              })}
              <option value="none">None</option>
          </select>
      </div>
    )
  }
}

ShelfSelect.propTypes = {
  shelves: PropTypes.array.isRequired,
  shelfId: PropTypes.string.isRequired,
  updateShelf: PropTypes.func.isRequired,
  bookId: PropTypes.string.isRequired
};

export default ShelfSelect;