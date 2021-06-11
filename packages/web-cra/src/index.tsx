import { AppRegistry } from 'react-native'

import { App } from 'components/src/App'

AppRegistry.registerComponent('testkit', () => App)
AppRegistry.runApplication('testkit', {
  rootTag: document.getElementById('root'),
})
