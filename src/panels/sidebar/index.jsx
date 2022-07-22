import React from "react";
import _ from "lodash";

import { ROS_SOCKET_STATUSES } from "../../utils";
import { vizOptions } from "../../utils/vizOptions";
import GlobalOptions from "./globalOptions";
import {
  ButtonPrimary,
  Container,
  Flex,
  FlexSpace,
  Input,
  InputLabel,
  Separator,
  SidebarCollapse,
  SidebarWrapper,
  StyledSidebar,
} from "../../components/styled";
import ConnectionDot from "../../components/connectionDot";
import RosReconnectHandler from "./rosReconnectHandler";
import VizOptions from "./vizOptions";
import { RosStatus, SidebarVizContainer } from "../../components/styled/viz";
import { Teleop } from "../teleop";
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rosInput: props.rosEndpoint,
    };
    this.updateRosInput = this.updateRosInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleSidebarOpen = this.toggleSidebarOpen.bind(this);
  }

  updateRosInput(e) {
    this.setState({
      rosInput: e.target.value,
    });
  }

  toggleSidebarOpen() {
    const { togglePanelCollapse } = this.props;
    togglePanelCollapse("sidebar");
  }

  onSubmit(e) {
    const {
      connectRos,
      disconnectRos,
      rosEndpoint,
      rosStatus,
      handleMove,
      handleStop,
      updateRosEndpoint,
    } = this.props;
    const { rosInput } = this.state;
    e.preventDefault();
    if (rosInput !== rosEndpoint) {
      updateRosEndpoint(rosInput);
    } else if (
      _.includes(
        [ROS_SOCKET_STATUSES.CONNECTED, ROS_SOCKET_STATUSES.CONNECTING],
        rosStatus
      )
    ) {
      disconnectRos();
    } else {
      connectRos();
    }
  }

  render() {
    const {
      collapsedSidebar,
      connectRos,
      framesList,
      handleMove,
      handleStop,
      globalOptions,
      removeVisualization,
      rosInstance,
      rosStatus,
      rosTopics,
      toggleAddModal,
      toggleConfigurationModal,
      toggleVisibility,
      updateGlobalOptions,
      updateVizOptions,
      viewer,
      visualizations,
      activeTeleo,
      vizInstances: vizInstancesSet,
    } = this.props;

    const vizInstances = [...vizInstancesSet];

    const { rosInput } = this.state;
    return (
      <SidebarWrapper>
        <StyledSidebar collapsedSidebar={collapsedSidebar}>
          <Container>
            <RosStatus>
              <ConnectionDot status={rosStatus} />
              <span>
                {rosStatus}.{" "}
                <RosReconnectHandler
                  connectRos={connectRos}
                  rosStatus={rosStatus}
                />
              </span>
            </RosStatus>
            <form onSubmit={this.onSubmit}>
              <InputLabel>Map Endpoint</InputLabel>
              <Flex>
                <Input
                  type="text"
                  value={rosInput}
                  onChange={this.updateRosInput}
                />
                <FlexSpace />
                <ButtonPrimary type="submit">
                  {_.includes(
                    [
                      ROS_SOCKET_STATUSES.CONNECTED,
                      ROS_SOCKET_STATUSES.CONNECTING,
                    ],
                    rosStatus
                  )
                    ? "Disconnect"
                    : "Connect"}
                </ButtonPrimary>
              </Flex>
            </form>
          </Container>
          <Separator />
          {rosStatus === ROS_SOCKET_STATUSES.CONNECTED && (
            <>
              <GlobalOptions
                framesList={framesList}
                globalOptions={globalOptions}
                updateGlobalOptions={updateGlobalOptions}
                toggleConfigurationModal={toggleConfigurationModal}
              />
              <Separator />
              <SidebarVizContainer>
                { activeTeleo && (<Flex>
                  
                  <Teleop handleMove={handleMove} handleStop={handleStop} />
                  <FlexSpace />
                  <ButtonPrimary  type="submit">Stop</ButtonPrimary>
                </Flex>)}
                 <Separator />
                <ButtonPrimary type="button" onClick={toggleAddModal}>
                  Add Visualization
                </ButtonPrimary>

                {_.size(visualizations) === 0 && (
                  <p>No visualizations added to the scene</p>
                )}
                {_.map(visualizations, (vizItem) => {
                  const vizObject = _.find(
                    vizOptions,
                    (v) => v.type === vizItem.vizType
                  );
                  if (!vizObject) {
                    return null;
                  }
                  const topics = _.filter(rosTopics, (t) =>
                    _.includes(vizObject.messageTypes, t.messageType)
                  );
                  const relatedTopics = _.filter(rosTopics, (t) =>
                    _.includes(vizObject.additionalMessageTypes, t.messageType)
                  );
                  const vizInstance = _.filter(
                    vizInstances,
                    (v) => v.key === vizItem.key
                  );
                  return (
                    <VizOptions
                      options={vizItem}
                      key={vizItem.key}
                      viewer={viewer}
                      topics={topics}
                      relatedTopics={relatedTopics}
                      vizObject={vizObject}
                      vizInstance={vizInstance}
                      rosInstance={rosInstance}
                      updateVizOptions={updateVizOptions}
                      removeVisualization={removeVisualization}
                      toggleVisibility={toggleVisibility}
                    />
                  );
                })}
              </SidebarVizContainer>
            </>
          )}
        </StyledSidebar>
        <SidebarCollapse onClick={this.toggleSidebarOpen}>
          {collapsedSidebar ? "▸" : "◂"}
        </SidebarCollapse>
      </SidebarWrapper>
    );
  }
}

export default Sidebar;
