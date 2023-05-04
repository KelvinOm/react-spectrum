/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ContextValue, StyleRenderProps, useContextProps, useRenderProps} from './utils';
import {mergeProps, useFocusRing, useHover} from 'react-aria';
import React, {createContext, ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';

export interface InputRenderProps {
  /**
   * Whether the input is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean,
  /**
   * Whether the input is focused, either via a mouse or keyboard.
   * @selector :focus
   */
  isFocused: boolean,
  /**
   * Whether the input is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean,
  /**
   * Whether the input is disabled.
   * @selector :disabled
   */
  isDisabled: boolean
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'>, StyleRenderProps<InputRenderProps> {}

export const InputContext = createContext<ContextValue<InputProps, HTMLInputElement>>({});

function Input(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  [props, ref] = useContextProps(props, ref, InputContext);

  let {hoverProps, isHovered} = useHover({});
  let {isFocused, isFocusVisible, focusProps} = useFocusRing({
    isTextInput: true,
    autoFocus: props.autoFocus
  });

  let renderProps = useRenderProps({
    ...props,
    values: {isHovered, isFocused, isFocusVisible, isDisabled: props.disabled || false},
    defaultClassName: 'react-aria-Input'
  });

  return (
    <input
      {...mergeProps(props, focusProps, hoverProps)}
      {...renderProps}
      ref={ref}
      data-hovered={isHovered || undefined}
      data-focus-visible={isFocusVisible || undefined} />
  );
}

/**
 * An input allows a user to input text.
 */
const _Input = forwardRef(Input);
export {_Input as Input};