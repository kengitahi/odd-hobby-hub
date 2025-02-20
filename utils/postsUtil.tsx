import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
// import { PostData } from './types'; // Import your type

// example if using typescript: this is based on the post schema we created in the config.yml

export interface PostData {
	title: string;
	slug: string;
	author: string;
	date: string; // Use Date type if you want to work with Date objects
	category: string;
	is_featured: boolean;
	featured_img: string; // Optional
	body: string; // The actual content of the post
}

const postsDirectory = path.join(process.cwd(), '/public/content/posts');

export function getLatestFeaturedPost(): PostData {
	// Get files from the posts directory
	const fileNames = fs.readdirSync(postsDirectory);

	// Get all posts data and filter for featured posts
	const allPosts = fileNames
		.map((fileName) => {
			// Remove ".md" from file name to get slug
			const slug = fileName.replace(/\.md$/, '');

			// Read markdown file as string
			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, 'utf8');

			// Use gray-matter to parse the post metadata
			const { data } = matter(fileContents);

			return {
				...(data as Omit<PostData, 'slug'>),
				slug,
			};
		})
		.filter((post) => post.is_featured);

	// Sort posts by date in descending order
	const sortedPosts = allPosts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	// Return the first (latest) featured post or null if none exists
	return sortedPosts[0] || null;
}

export function getSortedPostsData(): PostData[] {
	const fileNames = fs.readdirSync(postsDirectory);

	const allPostsData: PostData[] = fileNames.map((fileName) => {
		const slug = fileName.replace(/\.md$/, '');
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data } = matter(fileContents);

		return {
			slug,
			...data,
			date:
				data.date instanceof Date ? data.date.toISOString() : data.date,
		} as PostData;
	});

	return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);
	return fileNames.map((fileName) => ({
		params: {
			slug: fileName.replace(/\.md$/, ''), // Removing .md extension
		},
	}));
}

export function getPostData(slug: string): PostData {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const matterResult = matter(fileContents);

	return {
		slug,
		...matterResult.data,
		date:
			matterResult.data.date instanceof Date
				? new Date(matterResult.data.date).toISOString()
				: matterResult.data.date,
		body: matterResult.content,
	} as PostData;
}
