import { useState, useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '../features/counter/counterSlice';
import { testQuery } from '../app/testQuery';

import { initCosmos } from '../app/cosmos';
import {store}from '../app/store'
const IndexPage:React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState<number>(0);
  const [stateSet, setStateSet ] = useState(false)
  useEffect(() => {
    console.log(window)

    if (window && !stateSet) {
      window.getState = store.getState
      setStateSet(true)
      // initCosmos()
      testQuery()
    }
  }, [store])

  return (
    <>
      <h1>Test App</h1>
      <h2>
        The current number is: 
        {" " + count}
      </h2>
      <div>
        <input
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
          type="number"
        />
        <button
          onClick={() =>        dispatch(incrementByAmount(Number(incrementAmount)))}
        >
          Increment by amount
        </button>
      </div>
      <div>
        <button onClick={() => dispatch(decrement())}>Decrement by 1</button>
        <button onClick={() => dispatch(increment())}>Increment by 1</button>
      </div>
    </>
  );
};

export default IndexPage;