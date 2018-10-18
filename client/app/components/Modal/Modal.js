import React from 'react';
import PropTypes from 'prop-types';
import "./style.css";

class Modal extends React.Component {
 
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = cssInJS({
      backdropStyle: {
      position: 'fixed',
      width: 100,
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      zIndex: 50
    },
      modalStyle:{
      position: "fixed",
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30,
      margin: "auto",
      width: "50%",
      height: "50%",
      left: "20%",
  }
    });

    // // The modal "window"
    // const modalStyle = cssInJS({
    //   modalStyle: {
    //   position: "fixed",
    //   backgroundColor: '#fff',
    //   borderRadius: 5,
    //   maxWidth: 500,
    //   minHeight: 300,
    //   margin: '0 auto',
    //   padding: 30,
    //   margin: "auto",
    //   width: "50%",
    //   height: "50%",
    //   left: "20%",
    // }
    // });
    
    return (
      <div className="backdrop">
        <div className={backdropStyle.modalStyle}>
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