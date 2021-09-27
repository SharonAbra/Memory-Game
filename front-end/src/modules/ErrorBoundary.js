import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      errorInfo: null
    }
  }

  componentDidCatch(error, errorInfo){
    this.setState({
      error:error,
      errorInfo:errorInfo
    })
  }

  handleTryAgain() {
    window.location.reload(false);
  }

  render(){
    if(this.state.errorInfo){
      return (
        <div>
          <img alt="oops" src="https://i.ibb.co/jTnz9P1/oops.png"></img>
          <h2>That was not supposed to happen...</h2>
          <button onClick ={this.handleTryAgain} className="startButton">Let's try again</button>
        </div>
      )
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
