import React, { Component } from "react";
import ErrorUI from "./components/ErrorUI";

export default class ErrorBoundary extends Component {
  state = { hasError: false, errorMessage: "", errorType: "" };

  // static getDerivedStateFromError(error){
  // }
  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      errorMessage: error.toString(),
      errorType: error.name.toString().toLowerCase(),
    });
  }
  render() {
    const { hasError, errorMessage, errorType } = this.state;
    if (hasError) {
      return <ErrorUI errorMessage={errorMessage} errorType={errorType} />;
    }

    return this.props.children;
  }
}
