import React, { useState, useCallback } from 'react';
import { DefaultButtonStyle } from './defaultButtonStyle';
import { ButtonProps } from './types';
import { ButtonController } from './buttonController';
import { Spinner } from '../spinner/spinner';
/**
 * A button to perform async actions.
 *
 * A loading animation is displayed while the promise resolves.
 *
 */
export const AsyncButton: React.FC<ButtonProps> = ({
  type,
  onClick,
  label,
  kind,
  size,
  prefix,
  disabled,
}): JSX.Element => {
  const [isLoading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setLoading(true);
    if (onClick) {
      await onClick();
    }
    setLoading(false);
  }, [onClick]);

  return (
    <ButtonController
      onClick={(e) => {
        e!.preventDefault();
        if (disabled) {
          return;
        }
        handleClick();
      }}
    >
      <DefaultButtonStyle
        disabled={disabled}
        label={isLoading ? <Spinner /> : label}
        kind={kind}
        size={size}
        prefix={prefix}
      />
    </ButtonController>
  );
};
