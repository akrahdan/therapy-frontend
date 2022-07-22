import React from 'react';
import _ from 'lodash';
import shortid from 'shortid';
import withGracefulUnmount from 'react-graceful-unmount';
import store from 'store';

import Panels from './panels';

import { DEFAULT_CONFIG } from './utils';
import ErrorBoundary from './components/errorBoundary';

class Pepper extends React.Component {
  constructor(props) {
    super(props);
    const providedConfig =
      props.configuration || store.get('pepper_config') || {};

    // Empty object is required or the merge function mutates default config
    this.state = {
      configuration: _.merge({}, DEFAULT_CONFIG, providedConfig),
    };
    this.updateVizOptions = this.updateVizOptions.bind(this);
    this.updateRosEndpoint = this.updateRosEndpoint.bind(this);
    this.updateGlobalOptions = this.updateGlobalOptions.bind(this);
    this.addVisualization = this.addVisualization.bind(this);
    this.removeVisualization = this.removeVisualization.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.updateConfiguration = this.updateConfiguration.bind(this);
    this.resetReload = this.resetReload.bind(this);
  }

  updateConfiguration(configuration, replaceOnExisting) {
    const { configuration: oldConfiguration } = this.state;
    let newConfiguration;
    if (replaceOnExisting) {
      newConfiguration = {
        ...oldConfiguration,
        ...configuration,
      };
    } else {
      newConfiguration = {
        ..._.merge(oldConfiguration, configuration),
      };
    }
    this.setState({ configuration: newConfiguration });
  }

  updateVizOptions(key, options) {
    const {
      configuration: { visualizations },
    } = this.state;
    this.updateConfiguration(
      {
        visualizations: _.map(visualizations, v =>
          v.key === key ? { ...v, ...options } : v,
        ),
      },
      true,
    );
  }

  updateRosEndpoint(endpoint) {
    const {
      configuration: { ros },
    } = this.state;
    this.updateConfiguration({
      ros: {
        ...ros,
        endpoint,
      },
    });
  }

  componentWillUnmount() {
    const { configuration } = this.state;
    store.set('pepper_config', configuration);
  }

  updateGlobalOptions(path, option) {
    const {
      configuration: { globalOptions },
    } = this.state;
    const clonedGlobalOptions = _.cloneDeep(globalOptions);
    _.set(clonedGlobalOptions, path, option);
    this.updateConfiguration(
      {
        globalOptions: clonedGlobalOptions,
      },
      true,
    );
  }

  removeVisualization(e) {
    const {
      dataset: { id: vizId },
    } = e.target;
    const {
      configuration: { visualizations },
    } = this.state;
    this.updateConfiguration(
      {
        visualizations: _.filter(visualizations, v => v.key !== vizId),
      },
      true,
    );
  }

  toggleVisibility(e) {
    const {
      dataset: { id: vizId },
    } = e.target;
    const {
      configuration: { visualizations },
    } = this.state;
    this.updateConfiguration(
      {
        visualizations: _.map(visualizations, v =>
          v.key === vizId
            ? {
                ...v,
                visible: !!(_.isBoolean(v.visible) && !v.visible),
              }
            : v,
        ),
      },
      true,
    );
  }

  resetReload() {
    this.setState(
      {
        configuration: DEFAULT_CONFIG,
      },
      () => {
        window.location.reload();
      },
    );
  }

  addVisualization(vizOptions) {
    const {
      configuration: { visualizations },
    } = this.state;
    this.updateConfiguration({
      visualizations: [
        ...visualizations,
        {
          ...vizOptions,
          key: shortid.generate(),
        },
      ],
    });
  }

  render() {
    const { configuration } = this.state;
    return (
      <ErrorBoundary
        configuration={configuration}
        resetReload={this.resetReload}
      >
        <Panels
          configuration={configuration}
          addVisualization={this.addVisualization}
          removeVisualization={this.removeVisualization}
          toggleVisibility={this.toggleVisibility}
          updateConfiguration={this.updateConfiguration}
          updateVizOptions={this.updateVizOptions}
          updateRosEndpoint={this.updateRosEndpoint}
          updateGlobalOptions={this.updateGlobalOptions}
        />
      </ErrorBoundary>
    );
  }
}

export default withGracefulUnmount(Pepper);
