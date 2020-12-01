import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './style';

interface InputPropps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputPropps> = ({
  name,
  containerStyle,
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null); // guarda a referencia do input
  const { defaultValue, fieldName, registerField, error } = useField(name);
  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isFilled={isFilled}
      isFocused={isFocus}
      isErrored={!!error}
    >
      {Icon && <Icon size={20} />}
      <input
        ref={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
