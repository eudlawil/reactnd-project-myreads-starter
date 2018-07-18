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
  shelfId:   PropTypes.string.isRequired,
};

export default ShelfSelect;

//{shelves.map((s, index) => (
//  <option value={s.id} key={index} >{s.name}</option>
//))}

//<option value={s.id} key={index} selected={s.id === shelf.id ? true: false}>{s.name}</option>
// <select value={shelf.id} onChange={(event) => this.updateShelf(bookId, { shelf: event.target.value} )} >