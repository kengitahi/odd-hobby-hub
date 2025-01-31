import { PostData } from '@/utils/postsUtil';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import formatDate from '@/utils/postDate';

/**
 * Our BannerCard is a reusable UI component used to display a top section of our website
 *
 * @property featured image, a heading, author name and publication date.
 *
 * @returns React component that can be easily integrated into any web application.
 */

const BannerCard = ({ post }: { post: PostData }) => {
	return (
		<div className='relative mb-24 rounded-xl font-work'>
			<Image
				width='1216'
				height='600'
				alt={post.title}
				src={post.featured_img}
				className='rounded-xl'
				priority
			/>
			<div className='absolute -bottom-16 left-4 md:left-14 rounded-xl p-4 md:p-10 w-10/12 md:w-7/12 lg:w-6/12 shadow-2xl shadow-base-content/20 bg-white'>
				<div className='w-fit text-primary-content px-2.5 py-1 bg-primary text-xs md:text-sm rounded-md mb-4 font-medium'>
					{post.category}
				</div>
				<h3>
					<Link
						href='/'
						className='text-xl font-semibold leading-5 transition-all text-base-content md:text-2xl lg:text-4xl md:leading-10 hover:text-primary hover:duration-500'
					>
						{post.title}
					</Link>
				</h3>
				<div className='flex gap-5 items-center mt-6'>
					<div className='flex gap-3 items-center'>
						<div className='avatar'>
							<div className='w-9 rounded-full'>
								<Image
									src='/avatar.png'
									alt={post.author}
									width={100}
									height={100}
								/>
							</div>
						</div>
						<h6>
							<Link
								href='/author'
								className='text-xs font-medium transition text-base-content/60 md:text-base hover:text-primary hover:duration-300'
							>
								{post.author}
							</Link>
						</h6>
					</div>
					<p className='text-xs text-base-content/60 md:text-base'>
						{formatDate(post.date)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default BannerCard;
