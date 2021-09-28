import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }


  handleTryAgain() {
    window.location.reload(false);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style = {{display:'flex', flexDirection: 'column', alignItems:'center'}}>
          <img alt="oops" src="https://i.ibb.co/jTnz9P1/oops.png" width="100px"></img>
          <h2>That was not supposed to happen...</h2>
          <button onClick ={this.handleTryAgain} className="start startButton">Let's try again</button>
        </div>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
