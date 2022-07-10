import React from 'react';
import {
	createBottomTabNavigator,
	BottomTabNavigationOptions,
	BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {
	BasketScreen,
	HomeScreen,
	LoginScreen,
	MoreScreen,
} from '../../screens';
import { colors } from '../../styles';

const Tab = createBottomTabNavigator();

enum ETabScreenName {
	Home = 'Home',
	Basket = 'Basket',
	Login = 'Login',
	More = 'More',
}

type tTabBarScreenParams = {
	[ETabScreenName.Home]: undefined;
	[ETabScreenName.Basket]: undefined;
	[ETabScreenName.Login]: undefined;
	[ETabScreenName.More]: undefined;
};

const screensData = [
	{
		title: 'بیشتر',
		name: ETabScreenName.More,
		component: MoreScreen,
	},
	{
		title: 'ورود',
		name: ETabScreenName.Login,
		component: LoginScreen,
	},
	{
		title: 'سبد خرید',
		name: ETabScreenName.Basket,
		component: BasketScreen,
	},
	{
		title: 'خانه',
		name: ETabScreenName.Home,
		component: HomeScreen,
	},
];

const tabBarStyle = (
	name: ETabScreenName,
): BottomTabNavigationOptions['tabBarStyle'] => {
	const styles: BottomTabNavigationOptions['tabBarStyle'] = {
		paddingBottom: 7,
		paddingTop: 5,
		minHeight: 65,
		justifyContent: 'center',
	};

	if (name === ETabScreenName.Home) {
		styles.backgroundColor = colors.primary;

		return styles;
	}

	styles.backgroundColor = colors.white;
	styles.borderTopColor = colors.secondary;
	styles.borderTopWidth = 1;

	return styles;
};

const handleGetColor = (
	name: ETabScreenName,
	activeRoute: ETabScreenName,
): string => {
	if (activeRoute === ETabScreenName.Home && name === ETabScreenName.Home) {
		return colors.white;
	} else if (
		activeRoute === ETabScreenName.Home &&
		name !== ETabScreenName.Home
	) {
		return colors.dangerLow;
	} else if (activeRoute !== ETabScreenName.Home && activeRoute === name) {
		return colors.primary2;
	} else {
		return colors.dark;
	}
};

const tabBarIcon = (
	name: ETabScreenName,
	activeRoute: ETabScreenName,
): BottomTabNavigationOptions['tabBarIcon'] => {
	const size: number = 24,
		color = handleGetColor(name, activeRoute);

	let Icon: React.ReactNode;

	switch (name) {
		case ETabScreenName.Home:
			Icon = <AntDesignIcon name="home" size={size} color={color} />;
			break;

		case ETabScreenName.Basket:
			Icon = <SimpleLineIcon name="basket" size={size} color={color} />;
			break;

		case ETabScreenName.Login:
			Icon = <SimpleLineIcon name="user" size={size} color={color} />;
			break;

		case ETabScreenName.More:
			Icon = <SimpleLineIcon name="settings" size={size} color={color} />;
			break;
	}

	return () => Icon;
};

const tabBarLabelStyle = (
	name: ETabScreenName,
	activeRoute: ETabScreenName,
): BottomTabNavigationOptions['tabBarLabelStyle'] => {
	const styles: BottomTabNavigationOptions['tabBarLabelStyle'] = {
		color: handleGetColor(name, activeRoute),
		fontSize: 12,
	};

	return styles;
};

const tabBarOptions = ({
	route,
	navigation,
}: BottomTabScreenProps<tTabBarScreenParams>): BottomTabNavigationOptions => {
	const activeRoute: ETabScreenName =
		navigation.getState().routeNames[navigation.getState().index];

	return {
		tabBarStyle: tabBarStyle(route.name),
		tabBarIcon: tabBarIcon(route.name, activeRoute),
		tabBarLabelStyle: tabBarLabelStyle(route.name, activeRoute),
	};
};

const RootTabRouter = () => {
	return (
		<Tab.Navigator>
			{screensData.map((item, index) => (
				<Tab.Screen
					name={item.name}
					component={item.component}
					options={props => ({
						...tabBarOptions(props as any),
						title: item.title,
					})}
					key={index}
				/>
			))}
		</Tab.Navigator>
	);
};

export default RootTabRouter;
