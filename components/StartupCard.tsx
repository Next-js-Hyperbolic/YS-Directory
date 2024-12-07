import React from 'react';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';
import { cn, formatDate } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

// export type StartupCardType = {
//   _createdAt: Date;
//   views: number;
//   author: {
//     _id: number;
//     name: string;
//   };
//   _id: number;
//   description: string;
//   image: string;
//   category: string;
//   title: string;
// };

export type StartupCardType = Omit<Startup, 'author'> & { author?: Author };

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _id,
    _createdAt,
    views,
    author,
    title,
    description,
    image,
    category,
  } = post;
  return (
    <li className='startup-card'>
      <div className='flex-between'>
        <p className='startup_card_date'>{formatDate(_createdAt)}</p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user/${author?._id}`}>
            <p className='text-16-medium line-clamp-1'>{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image!}
            alt={author?.name!}
            className='rounded-full'
            width={48}
            height={48}
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>{description}</p>
        <img src={image} alt='placeholder' className='startup-card_img' />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => {
        <li key={cn('skeleton', index)}>
          <Skeleton className='startup-card_skeleton' />
        </li>;
      })}
    </>
  );
};

export default StartupCard;
