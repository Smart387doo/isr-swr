import Head from 'next/head';
import Image from 'next/image';
import useSWR, { SWRConfig } from 'swr';
import { getCryptoFromAPI } from '../lib/getCryptoFromAPI';

const fetcher = (url) => fetch(url).then((res) => res.json());
function Crypto() {
  console.log('evo nas u crypto');
  // `data` will always be available as it's in `fallback`.
  const { data } = useSWR('/api/cryptoCompare', fetcher);

  return (
    <>
      {console.log('data', data)}
      {data.map((single, index) => (
        <div key={index} className='flex px-8 border-b divide-x-2'>
          <div className='w-1 mr-4'>{index == 0 ? ' ' : index}</div>
          <div className='px-4 mx-4 truncate w-44'>{single.coin}</div>
          <div className='px-4'>{single.price}</div>
        </div>
      ))}
      <h1></h1>
    </>
  );
}

export default function Home({ fallback }) {
  console.log('evo nas u Home');
  return (
    <SWRConfig value={{ fallback }}>
      <Crypto />
    </SWRConfig>
  );
}


export async function getStaticProps() {
  // `getStaticProps` is executed on the server side.
  const crypto = await getCryptoFromAPI();
  return {
    props: {
      fallback: {
        '/api/cryptoCompare': crypto
      }
    }, revalidate: 10,
  };
}
