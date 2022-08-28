import React from 'react';
import ReactToPrint from 'react-to-print';

class PrintPDF extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            return <a href="#">Print this out</a>;
          }}
          content={() => this.componentRef}
        />
      </div>
    );
  }
}

export default PrintPDF;
