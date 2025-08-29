import { NavigationState, Route, SceneRendererProps, TabDescriptor } from 'react-native-tab-view';

export interface TabBarProps<T extends Route> extends SceneRendererProps {
  navigationState: NavigationState<T>;
  options: Record<string, TabDescriptor<T>> | undefined;
}
