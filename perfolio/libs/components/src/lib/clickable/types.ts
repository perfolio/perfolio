import { ButtonControllerProps } from './buttonController';
import { DefaultButtonStyleProps } from './defaultButtonStyle';
import { DefaultLinkStyleProps } from './defaultLinkStyle';
import { LinkControllerProps } from './linkController';

// Buttons or Links always consist of a dumb ui component wrapped by a controller
export type ButtonProps = DefaultButtonStyleProps & ButtonControllerProps;
export type LinkProps = DefaultLinkStyleProps & LinkControllerProps;
