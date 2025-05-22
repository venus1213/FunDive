import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/main/HomeScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { SettingsScreen } from '../screens/main/SettingsScreen';
import { ProjectsScreen } from '../screens/main/ProjectsScreen';
import { ProjectDetailScreen } from '../screens/main/ProjectDetailScreen';
import { CreateProjectScreen } from '../screens/main/CreateProjectScreen';

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Projects: undefined;
  ProjectDetail: { id: string };
  CreateProject: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'FUNDIVE',
        }}
      />
      <Stack.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          title: 'プロジェクト',
        }}
      />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{
          title: 'プロジェクト詳細',
        }}
      />
      <Stack.Screen
        name="CreateProject"
        component={CreateProjectScreen}
        options={{
          title: '新規プロジェクト',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'プロフィール',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '設定',
        }}
      />
    </Stack.Navigator>
  );
}; 