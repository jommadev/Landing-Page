// pages/maintenance.js

import Head from 'next/head';

const Maintenance = () => {
  return (
    <div>
      <Head>
        <title>Under Maintenance</title>
        <meta name="description" content="Under Maintenance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
       <center> <h1>Under Maintenance</h1>
        <p>Sorry, we&apos;re currently undergoing maintenance. Please check back later.</p>
        </center>
      </main>

      <footer>
        {/* You can add a footer if needed */}
      </footer>

      {/* You can add global styles or scripts here */}
    </div>
  );
};

export default Maintenance;
