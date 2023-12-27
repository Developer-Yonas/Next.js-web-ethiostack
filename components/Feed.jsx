
  import { useState, useEffect } from "react";
  import PromptCard from "./PromptCard";
  import Footer from "./Footer";
  import Ably from "ably/promises";

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };

  const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch('/api/prompt');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setPosts(data);
          console.log(data); // Log the retrieved data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchPosts();

      const ably = new Ably.Realtime('DxnTXw.66i3Jg:nSFPE1ZkIPMRTxJeEAtaX1TSVeh_8EDi_8J7rw3_XwI');
      const channel = ably.channels.get('prompt-updates');

      channel.subscribe('update', (message) => {
        setPosts(message.data);
      });

      return () => {
        channel.unsubscribe();
        ably.close();
      };
    }, []);

    const filterPrompts = (searchtext) => {
      const regex = new RegExp(searchtext, "i");
      return posts.filter(
        (item) =>
          regex.test(item.creator.username) ||
          regex.test(item.tag) ||
          regex.test(item.prompt)
      );
    };

    const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);

      setSearchTimeout(
        setTimeout(() => {
          const searchResult = filterPrompts(e.target.value);
          setSearchedResults(searchResult);
        }, 500)
      );
    };

    const handleTagClick = (tagName) => {
      setSearchText(tagName);
      const searchResult = filterPrompts(tagName);
      setSearchedResults(searchResult);
    };

    return (
      <section className='feed'>
        <form className='relative w-full flex-center'>
          <input
            type='text'
            placeholder='Search for a tag or a username'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
          />
        </form>

        {searchText ? (
          <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
        ) : (
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        )}

        <Footer/>
      </section>
    );
  };

  export default Feed;
