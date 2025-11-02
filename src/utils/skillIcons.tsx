import { ComponentType } from 'react';

// Import all skill icons
import JavaScriptIcon from '../assets/javascript.svg?react';
import TypeScriptIcon from '../assets/typescript.svg?react';
import PythonIcon from '../assets/python.svg?react';
import JavaIcon from '../assets/java.svg?react';
import HTML5Icon from '../assets/html5.svg?react';
import CSS3Icon from '../assets/css3.svg?react';
import GraphQLIcon from '../assets/graphql.svg?react';
import ReactIcon from '../assets/react.svg?react';
import ReduxIcon from '../assets/redux.svg?react';
import ReactRouterIcon from '../assets/react_router.svg?react';
import ReactQueryIcon from '../assets/react_query.svg?react';
import AxiosIcon from '../assets/axios.svg?react';
import StyledComponentsIcon from '../assets/styled_components.svg?react';
import JestIcon from '../assets/jest.svg?react';
import ReactTestingIcon from '../assets/react_testing.svg?react';
import ReactNativeIcon from '../assets/react_native.svg?react';
import ElectronIcon from '../assets/electron.svg?react';
import GitIcon from '../assets/git.svg?react';
import WebpackIcon from '../assets/webpack.svg?react';
import PostmanIcon from '../assets/postman.svg?react';
import OracleIcon from '../assets/oracle.svg?react';
import PostgreSQLIcon from '../assets/postgresql.svg?react';
import MongoDBIcon from '../assets/mongodb.svg?react';

// Skill icon mapping
export const skillIconMap = {
  'javascript.svg': JavaScriptIcon,
  'typescript.svg': TypeScriptIcon,
  'python.svg': PythonIcon,
  'java.svg': JavaIcon,
  'html5.svg': HTML5Icon,
  'css3.svg': CSS3Icon,
  'graphql.svg': GraphQLIcon,
  'react.svg': ReactIcon,
  'redux.svg': ReduxIcon,
  'react_router.svg': ReactRouterIcon,
  'react_query.svg': ReactQueryIcon,
  'axios.svg': AxiosIcon,
  'styled_components.svg': StyledComponentsIcon,
  'jest.svg': JestIcon,
  'react_testing.svg': ReactTestingIcon,
  'react_native.svg': ReactNativeIcon,
  'electron.svg': ElectronIcon,
  'git.svg': GitIcon,
  'webpack.svg': WebpackIcon,
  'postman.svg': PostmanIcon,
  'oracle.svg': OracleIcon,
  'postgresql.svg': PostgreSQLIcon,
  'mongodb.svg': MongoDBIcon,
} as const;

/**
 * Get skill icon component by icon name
 * @param iconName - Name of the icon file
 * @returns React component or null if not found
 */
export const getSkillIcon = (iconName: string | null): ComponentType<{ style?: React.CSSProperties }> | null => {
  if (!iconName) return null;
  return skillIconMap[iconName as keyof typeof skillIconMap] || null;
};
