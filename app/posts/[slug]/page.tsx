import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getPostData, getAllPostIds, PostData } from '@/utils/postsUtil'; // Import the utility functions
import { GetStaticPaths, GetStaticProps } from 'next';
import formatDate from '@/utils/postDate';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Single Post Page | MetaBlog',
	description: 'Generated by create next app',
};

// Generate static paths (important for dynamic routes):
export async function generateStaticParams() {
	const posts = getAllPostIds(); // Assuming this returns an array of slugs
	return posts.map((post) => ({
		slug: post.params.slug, // Adapt this based on the structure of your getAllPostIds return
	}));
}

async function fetchPostData(slug: string): Promise<PostData | null> {
	const post = getPostData(slug);
	return post || null; // Return null if post not found
}

export default async function SinglePost({
	params,
}: {
	params: { slug: string };
}) {
	const post = await fetchPostData(params?.slug as string);

	if (!post) {
		// Handle the case where the post is not found.  You can either:
		// 1. Redirect:
		redirect('/404'); // Requires 'next/navigation'
		// 2. Return a 404 component:
		//return <div>Post not found</div>; // Or a more styled 404 page
		// 3. Throw an error (less common for not found):
		// throw new Error('Post not found');
	}

	return (
		<main>
			<section>
				<div className='container px-5 mx-auto w-full md:px-0 md:w-10/12 lg:w-5/12 font-work'>
					<div className='py-5'>
						<div className='w-fit text-white px-2.5 py-1 bg-primary text-xs md:text-sm rounded-md mb-2 md:mb-4 font-medium'>
							{post.category}
						</div>
						<h3 className='text-xl font-semibold leading-5 text-base-content md:text-2xl lg:text-4xl md:leading-10'>
							{post.title}
						</h3>
						<div className='flex gap-5 items-center mt-3 md:mt-6 text-base-content/60'>
							<div className='flex gap-3 items-center'>
								<div className='avatar'>
									<div className='w-9 rounded-full'>
										<Image
											src='/avatar.png'
											width={100}
											height={100}
											alt={post.author}
										/>
									</div>
								</div>
								<Link
									href='/author'
									className='text-xs font-medium transition md:text-sm hover:text-primary hover:duration-300'
								>
									{post.author}
								</Link>
							</div>
							<p className='text-xs md:text-sm'>
								{formatDate(post.date)}
							</p>
						</div>
					</div>
					<div className='mt-8'>
						<Image
							width='800'
							height='462'
							alt={post.title}
							className={`rounded-xl`}
							src={post.featured_img}
						/>
					</div>

					{/* article section start  */}
					<div className='font-serif'>
						<div className='mt-8'>
							<Markdown remarkPlugins={[remarkGfm]}>
								{post.body}
							</Markdown>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
