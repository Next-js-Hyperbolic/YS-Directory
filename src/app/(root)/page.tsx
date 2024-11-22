import Image from 'next/image';
import SearchForm from '@/components/SearchForm';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams)?.query;
  return (
    <>
      <section className='pink_container'>
        <h1 className='heading'>
          pitch your your 💡 <br /> Connect with 💰
        </h1>
        <p className='sub-heading'>
          Submit Ideas, Vote On Pitches, & Connect With Investors.
        </p>
        <SearchForm query={query} />
      </section>
    </>
  );
}
