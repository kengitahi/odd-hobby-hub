import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { PostData } from '@/utils/postsUtil';

/**
 * Our PostCard is a reusable UI component used to display a post as a card format.
 *
 * @property featured image, category name, a heading, author image, author name, and publication date.
 *
 * @returns React component that can be easily integrated into any web application.
 */

const PostCard = ({ post }: { post: PostData }) => {
	const formatDate = (date: string) => {
		const dateObj = new Date(date);
		const monthAndYear = dateObj.toLocaleDateString('en-GB', {
			month: 'long',
			year: 'numeric',
		});

		const day = dateObj.toLocaleDateString('en-GB', {
			day: 'numeric',
		});

		return `${day} ${monthAndYear.replace(' ', ', ')}`;
	};

	return (
		<div className='p-4 rounded-xl border card w-fit border-base-content/10 font-work'>
			<figure>
				<Link href={`/posts/${post.slug}`}>
					<Image
						src={post.featured_img}
						alt={post.title}
						className={`rounded-xl`}
						width={360}
						height={240}
					/>
				</Link>
			</figure>
			<div className='px-2 py-6 card-body'>
				<span className='px-3 py-2 text-sm font-medium capitalize rounded-md border-0 btn no-animation hover:bg-primary hover:text-primary-content bg-primary/5 text-primary min-h-fit h-fit w-fit'>
					{post.category ?? 'History'}
				</span>
				<h3>
					<Link
						href={`/posts/${post.slug}`}
						className='mt-2 text-lg font-semibold transition-all duration-300 ease-in-out text-base-content hover:text-primary md:text-xl lg:text-2xl'
					>
						{post.title}
					</Link>
				</h3>
				<div className='flex gap-5 items-center mt-5 text-base-content/60'>
					<div className='flex gap-3 items-center'>
						<div className='avatar'>
							<div className='w-9 rounded-full'>
								<Image
									src='/avatar.png'
									alt='avatar'
									width={100}
									height={100}
								/>
							</div>
						</div>
						<h5>
							<Link
								href='/author'
								className='text-base font-medium transition hover:text-primary hover:duration-300'
							>
								{post.author ?? 'Hobbies Hub'}
							</Link>
						</h5>
					</div>
					<p className='text-base'>{formatDate(post.date)}</p>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
