import { AppRegistry } from 'react-native'

import { App } from 'components/src/App'

AppRegistry.registerComponent('equationSolver', () => App)
AppRegistry.runApplication('equationSolver', {
  rootTag: document.getElementById('root'),
})
