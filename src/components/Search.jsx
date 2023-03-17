import Fuse from 'fuse.js';
import { useState } from 'react';

const options = {
	keys: ['frontmatter.title', 'frontmatter.description'],
	includeMatches: true,
	minMatchCharLength: 2,
	threshold: 0.1,
};

function Search({ searchList }) {
	const [query, setQuery] = useState('');

	const fuse = new Fuse(searchList, options);

	const posts = fuse
	.search(query)
	.map((result) => result.item)

	function handleOnSearch({ target = {} }) {
		const { value } = target;
		setQuery(value);
	}

	return (
		<>
			<form>   
				<label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
				<div class="relative">
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
					</div>
					<input value={query} onChange={handleOnSearch} type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Beef Stew" required />
					<button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
				</div>
			</form>
			{query.length > 1 && (
				<p>
					Found {posts.length} {posts.length === 1 ? 'result' : 'results'} for '{query}'
				</p>
			)}
			<div class="grid sm:grid-cols-3 grid-cols-1">
				{posts &&
					posts.map((post) => (
						<div class="max-w-sm rounded overflow-hidden shadow-lg m-3">
							<a href={`${post.url}`}>
							<img class="w-full" src={post.frontmatter.image_url} alt={post.frontmatter.title} />
							<div class="px-6 py-4">
								<div class="font-bold text-xl mb-2">{post.frontmatter.title}</div>
								<p class="text-gray-700 text-base">
								{post.frontmatter.description}
								</p>
							</div>
							</a>
							<div class="px-6 pt-4 pb-2">
							{post.frontmatter.tags == null ? "" : post.frontmatter.tags.map((tag) => <a href={`/tags/${tag}`}><span class="inline-block bg-gray-200 hover:bg-indigo-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:text-white mr-2 mb-2">#{tag}</span></a>)}
							</div>
						</div>
					))}
			</div>
		</>
	);
}

export default Search;