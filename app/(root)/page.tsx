import SearchForm from '../../components/SearchForm';
import StartupCard, { StartupCardType } from '../../components/StartupCard';
import { HomeText } from '../../text';
import { STARTUPS_QUERY } from '../../sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams)?.query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

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
      <SanityLive />
    </>
  );
}