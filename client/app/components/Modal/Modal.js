import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
 
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
      
    const backdropStyle = {
      backgroundColor: '#f6f6f6',
      marginTop: '40px',
      position: 'fixed',
      height: '70vh',
      width: '90vw',
      border: '2px solid black'
    }

    return (
      <div className="backdrop" style={backdropStyle}>
        <div>
          {this.props.children}
          <div className="footer">
            <button type="button" className="btn btn-primary" onClick={this.props.onClose}>
                Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;