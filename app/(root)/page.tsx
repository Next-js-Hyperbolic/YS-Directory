import Image from 'next/image';
import SearchForm from '../../components/SearchForm';
import StartupCard, { StartupCardType } from '../../components/StartupCard';
import { HomeText } from '../../text';
import { client } from '../../sanity/lib/client';
import { STARTUPS_QUERY } from '../../sanity/lib/queries';
import { Startup } from '@/sanity/types';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams)?.query;
  const posts = await client.fetch(STARTUPS_QUERY);
  console.log(JSON.stringify(posts, null, 2));
  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: {
  //       _id: 1,
  //       name: 'Darren Brown',
  //     },
  //     _id: 1,
  //     description: 'This is a description',
  //     image:
  //       'https://cdn.pixabay.com/photo/2022/08/15/12/13/robot-7387740_1280.jpg',
  //     category: 'Robots',
  //     title: 'We Robots',
  //   },
  // ];
  return (
    <>
      <section className='pink_container'>
        <h1 className='heading'>
          {HomeText.Header} <br /> {HomeText.SubHeader}
        </h1>
        <p className='sub-heading'>{HomeText.Description}</p>
        <SearchForm query={query} />
      </section>
      <section className='section_container'>
        <p className='text-30-semibold'>
          {query ? `Search results for query "${query}"` : 'All Startups'}
        </p>
        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className='no-results'>No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
