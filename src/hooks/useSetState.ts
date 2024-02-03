import { useLayoutEffect, useRef, useState } from 'react';

type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A, callback?: Function) => void;

// setState之后返回最新state
const useSetState = <S>(initialState: S): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState);

  const callbackRef = useRef<Function>();

  const updateState = (newState: any) => {
    if (!newState) {
      setState(newState);

      return;
    }

    // 状态处理：对象类型 和 非对象类型
    if (typeof newState === 'object' && newState.constructor === Object) {
      setState((prevState) => ({
        ...(prevState || {}),
        ...newState,
      }));

      return;
    }

    setState(newState);
  };

  useLayoutEffect(() => {
    callbackRef.current?.(state);
  }, [state]);

  return [
    state,
    (_value: any, callback = () => null) => {
      callbackRef.current = callback;
      updateState(_value);
    },
  ];
};

export default useSetState;
