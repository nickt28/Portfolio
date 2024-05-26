import { Platform } from '$lib/types';
import { getSkills } from './skills';

export const title = 'Home';

export const name = 'Nicholas';

export const lastName = 'Tomkins';

export const description =
	'Driven by a passion for the journey of learning, creating, and improving, I dedicate myself to creating projects that are unique and solve unexpected challenges. Each job is a step towards achieving the best version of myself and the work I present.';

export const links: Array<{ platform: Platform; link: string; color: string; }> = [
	{ platform: Platform.GitHub,
		link: 'https://github.com/nickt28',
		color: '#c1c1c1'
	},
	{
		platform: Platform.Azure,
		link: 'https://learn.microsoft.com/en-us/users/nickt0',
		color: '#c1c1c1'
	},
	{
		platform: Platform.Linkedin,
		link: '/',
		color: '#2e2e2e'
	},
	{
		platform: Platform.Twitter,
		link: '/',
		color: '#2e2e2e'
	},
	{
		platform: Platform.StackOverflow,
		link: '/',
		color: '#2e2e2e'
	},
	{
		platform: Platform.Email,
		link: '/',
		color: '#2e2e2e'
	},
	{
		platform: Platform.Youtube,
		link: '/',
		color: '#2e2e2e'
	},
	{
		platform: Platform.Facebook,
		link: '/',
		color: '#2e2e2e'
	}
];

export const skills = getSkills('js', 'css', 'html', 'reactjs', 'sass', 'svelte', 'ts');
