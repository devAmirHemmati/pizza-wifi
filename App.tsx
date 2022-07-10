import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootTabContainer } from './src/routes';

const App = () => {
	return (
		<NavigationContainer>
			<RootTabContainer />
		</NavigationContainer>
	);
};

export default App;
