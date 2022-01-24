import React from 'react';
import { withSnackbar } from 'notistack';

import { redirectingAuthorizedFetch } from '../authentication';

export const extractEventValue = (event) => {
  switch (event.target.type) {
    case "number":
      return event.target.valueAsNumber;
    case "checkbox":
      return event.target.checked;
    default:
      return event.target.value
  }
}

export function restController(endpointUrl, RestController) {
  return withSnackbar(
    class extends React.Component{

      state = {
        data: undefined,
        loading: false,
        errorMessage: undefined
      };

      setData = (data, callback) => {
        this.setState({
          data,
          loading: false,
          errorMessage: undefined
        }, callback);
      }

      loadData = () => {
        this.setState({
          data: undefined,
          loading: true,
          errorMessage: undefined
        });
        redirectingAuthorizedFetch(endpointUrl).then(response => {
          if (response.status === 200) {
            return response.json();
          }
          throw Error("Invalid status code: " + response.status);
        }).then(json => {
          this.setState({ data: json, loading: false })
        }).catch(error => {
          const errorMessage = error.message || "Unknown error";
          this.props.enqueueSnackbar("Problem fetching: " + errorMessage, { variant: 'error' });
          this.setState({ data: undefined, loading: false, errorMessage });
        });
      }

      saveData = () => {
        this.setState({ loading: true });
        redirectingAuthorizedFetch(endpointUrl, {
          method: 'POST',
          body: JSON.stringify(this.state.data),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if (response.status === 200) {
            return response.json();
          }
          throw Error("Invalid status code: " + response.status);
        }).then(json => {
          this.props.enqueueSnackbar("Update successful.", { variant: 'success' });
          this.setState({ data: json, loading: false });
        }).catch(error => {
          const errorMessage = error.message || "Unknown error";
          this.props.enqueueSnackbar("Problem updating: " + errorMessage, { variant: 'error' });
          this.setState({ data: undefined, loading: false, errorMessage });
        });
      }

      handleValueChange = (name) => (event) => {
        const data = { ...this.state.data, [name]: extractEventValue(event) };
        this.setState({ data });
      }

      render() {
        return <RestController
          {...this.state}
          {...this.props}
          handleValueChange={this.handleValueChange}
          setData={this.setData}
          saveData={this.saveData}
          loadData={this.loadData}
        />;
      }

    });
}
