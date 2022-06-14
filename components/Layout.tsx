import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css';
const name = "Adrian Test"
import planCode from '../public/images/plancode.png'
import Image from 'next/image'
type Props = {
  children?: ReactNode
  title?: string
  home?: ReactNode
}


// const Layout = ({ children, title = 'This is the default title' }: Props) => (
//   <div className={styles.container}>
//     {console.log(children)}
//     <Head>
//       <title>{title}</title>
//       <meta charSet="utf-8" />
//       <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//     </Head>
//     <header>
//       <nav>
//         <Link href="/">
//           <a>Home</a>
//         </Link>{' '}
//         |{' '}
//         <Link href="/about">
//           <a>About</a>
//         </Link>{' '}
//         |{' '}
//         <Link href="/users">
//           <a>Users List</a>
//         </Link>{' '}
//         | <a href="/api/users">Users API</a>
//       </nav>
//     </header>
//     {children}
//     <footer>
//       <hr />
//       <span>I'm here to stay (Footer)</span>
//     </footer>
//   </div>
// )

// export default Layout


export const siteTitle = 'Next.js Sample Website';
// need to understand exactly what is oging on with these props
export default function Layout({ children, title = 'This is the default title', home }: Props) {
  return (
    <div className={styles.container}>

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div>{title}</div>
      <header className={styles.header}>
        
        {home ? (
          <>
            <Image
              priority
              src={planCode}
              
              className={utilStyles.borderCircle}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/plancode.png"
                  className={utilStyles.borderCircle}
                  height={100}
                  width={200}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
      }