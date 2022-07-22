import Amphion from '@robostack/amphion/build'

const rosTopicSources = {};

export const getOrCreateRosTopicDataSource = options => {
    const { topicName} = options;
    const existingSource = rosTopicSources[topicName]
    if (existingSource) {
        return existingSource
    }
    rosTopicSources[topicName] = new Amphion.RosTopicDataSource(options)
    return rosTopicSources[topicName]
}