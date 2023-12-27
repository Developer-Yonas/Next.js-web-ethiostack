
import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
   <h1 className='head_text text-center' style={{ color: 'green' }}>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Developers-Powered መልእክቶች(cues)</span>
    </h1>
    <p className='desc text-center'>
      EthioStack is an open-source Developers-Powered tool for modern world to
      discover, create and share creative cues.
    </p>

    <Feed />
  </section>
);

export default Home;