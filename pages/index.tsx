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

import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'; 
import Layout from '../components/Layout';
import Link from 'next/link';
import Date from '../components/date';
import { testQuery } from '../app/testQuery';
import index from '../app/index';
import { initCosmos } from '../app/cosmos';
import { GetStaticProps } from 'next'
import sqlQuery from '../app/sqlQuery'
import {store}from '../app/store'

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
      home: "TEST HOME"
    },
  };
}


const Home:React.FC = ({ allPostsData, home }) => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState<number>(0);
  const [stateSet, setStateSet ] = useState(false)
  useEffect(() => {

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
    <Layout home>

      <h1>Test Blog App W/ Counter</h1>
      <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
           <li className={utilStyles.listItem} key={id}>
           <Link href={`/posts/${id}`}>
             <a>{title}</a>
           </Link>
           <br />
           <small className={utilStyles.lightText}>
             <Date dateString={date} />
           </small>
         </li>
          ))}
        </ul>
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
    </Layout>
  );
};

export default Home;