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


import Image from 'next/image'; 
import Layout from '../components/Layout';

import { testQuery } from '../app/testQuery';
import index from '../app/index';
import { initCosmos } from '../app/cosmos';
import { GetStaticProps } from 'next'
import sqlQuery from '../app/sqlQuery'
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
    //  index.main()

      // sqlQuery.clientDataPull()
      // testQuery()
    }
  
  }, [store])


  return (
    <Layout title="welcome to the main page">
      <h1>Test App</h1>
      
      <h2>

        <img src={"/images/plancode.png"} alt="test"/>
      <Image
    src="/images/plancode.png" // Route of the image file
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
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
    </Layout>
  );
};

export default IndexPage;