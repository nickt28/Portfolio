import { Platform } from '$lib/types';
import { getSkills } from './skills';

export const title = 'Portfolio';

export const name = 'Nicholas';

export const lastName = 'Tomkins';

export const description =
	'Full Stack Developer with hands-on experience building complete systems from the ground up. I deliver secure, scalable applications using React, Node.js, and TypeScript and a business-first mindset. I bring both the technical skills to solve though problems and the work ethic to get things done on time.';

export const links: Array<{ platform: Platform; link: string; color: string; show: boolean }> = [
	{ platform: Platform.GitHub,
		link: 'https://github.com/nickt28/Portfolio',
		color: 'var(--main-text)',
		show: true
	},
	{
		platform: Platform.Azure,
		link: 'https://learn.microsoft.com/en-us/users/nickt0',
		color: 'var(--main-text)',
		show: true
	},
	{
		platform: Platform.Linkedin,
		link: '/',
		color: '#757575',
		show: true
	},
	{
		platform: Platform.Twitter,
		link: '/',
		color: '#757575',
		show: true
	},
	{
		platform: Platform.StackOverflow,
		link: '/',
		color: '#757575',
		show: true
	},
	{
		platform: Platform.Email,
		link: '/',
		color: '#757575',
		show: true
	},
	{
		platform: Platform.Youtube,
		link: '/',
		color: '#757575',
		show: true
	},
	{
		platform: Platform.Facebook,
		link: '/',
		color: '#757575',
		show: true
	}
];

export const skills = getSkills('js', 'css', 'html', 'reactjs', 'sass', 'svelte', 'ts');
