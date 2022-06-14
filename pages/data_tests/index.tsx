import { GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";

import { DB } from "../../interfaces";

// here we can have
// import { sampleUserData } from '../../../utils/sample-data'
import { DBs } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import List from "../../components/List";

type Props = {
  items: DB[];
};


const UsersIndex = ({ items }: Props) => {
  const [currentData, setCurrentData] = useState([]);
  const apiAction = (api) => {
    console.log("api");
    console.log(api);
  
    if (api === "otb_sample_histories") {

      fetch("api/otb_sample_histories").then(res => res.json()).then((data) => {

        console.log(data)
        setCurrentData(data)
        console.log(currentData)
      })
        
        
      //   {
      //   console.log(res.jsoin())
      //   setCurrentData(res)
      //   console.log("currentData")
      //   console.log(currentData)
      // })

      // setCurrentData()

    } else  if (api === "") {
      
    } else if (api === "") {

    }
  };
  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>DATA</h1>
      <p>Examples of fetching data.</p>{" "}
      {items.map((el) => {
        return <button onClick={() => apiAction(el.api)}>{el.name}</button>;
      })}
      {/* <List items={itemsl} /> */}
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  const items: DB[] = DBs;
  return { props: { items } };
};

export default UsersIndex;
