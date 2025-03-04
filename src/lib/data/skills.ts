import Assets from './assets';
import type { Skill, SkillCategory } from '../types';
import svelte from '../md/svelte.md?raw';
import { omit, type StringWithAutoComplete } from '$lib/utils/obj';

const defineSkillCategory = <S extends string>(data: SkillCategory<S>): SkillCategory<S> => data;

const categories = [
	defineSkillCategory({ name: 'Programming Languages', slug: 'pro-lang' }),
	defineSkillCategory({ name: 'Frameworks', slug: 'framework' }),
	defineSkillCategory({ name: 'Libraries', slug: 'library' }),
	defineSkillCategory({ name: 'Langauges', slug: 'lang' }),
	defineSkillCategory({ name: 'Databases', slug: 'db' }),
	defineSkillCategory({ name: 'ORMs', slug: 'orm' }),
	defineSkillCategory({ name: 'DevOps', slug: 'devops' }),
	defineSkillCategory({ name: 'Testing', slug: 'test' }),
	defineSkillCategory({ name: 'Dev Tools', slug: 'devtools' }),
	defineSkillCategory({ name: 'Markup & Style', slug: 'markup-style' }),
	defineSkillCategory({ name: 'Design', slug: 'design' }),
	defineSkillCategory({ name: 'Soft Skills', slug: 'soft' })
] as const;

const defineSkill = <S extends string>(
	skill: Omit<Skill<S>, 'category'> & {
		category?: StringWithAutoComplete<(typeof categories)[number]['slug']>;
	}
): Skill<S> => {
	const out: Skill<S> = omit(skill, 'category');

	if (skill.category) {
		out.category = categories.find((it) => it.slug === skill.category);
	}

	return out;
};

export const items = [
	defineSkill({
		slug: 'bootstrap',
		color: 'yellow',
		description:
			'A popular CSS framework that provides pre-built components and responsive grid system for rapid web development.',
		logo: Assets.Bootstrap,
		name: 'Bootstrap',
		category: 'devtools'
	}),
	defineSkill({
		slug: 'vite',
		color: 'yellow',
		description:
			'A modern frontend build tool that offers lightning-fast HMR and optimized build performance for JavaScript projects.',
		logo: Assets.Vite,
		name: 'Vite',
		category: 'devtools'
	}),
	defineSkill({
		slug: 'js',
		color: 'yellow',
		description:
			'A versatile programming language that enables interactive web development, running both in browsers and servers.',
		logo: Assets.JavaScript,
		name: 'Javascript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'Python',
		color: 'yellow',
		description:
			'A high-level programming language known for its simplicity and readability, widely used in web development, data science, and automation.',
		logo: Assets.Python,
		name: 'Python',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'ts',
		color: 'blue',
		description:
			'A strongly typed superset of JavaScript that adds optional static typing and other features to enhance code quality and maintainability.',
		logo: Assets.TypeScript,
		name: 'Typescript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'css',
		color: 'blue',
		description:
			'A styling language used to control the visual presentation of HTML documents, including layout, colors, and animations.',
		logo: Assets.CSS,
		name: 'CSS',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'html',
		color: 'orange',
		description:
			'The standard markup language for creating web pages, providing the structure and semantic meaning to web content.',
		logo: Assets.HTML,
		name: 'HTML',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'sass',
		color: 'pink',
		description:
			'A CSS preprocessor that extends CSS with additional features like variables, nested rules, and mixins for more maintainable stylesheets.',
		logo: Assets.Sass,
		name: 'Sass',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'tailwind',
		color: 'blue',
		description:
			'A utility-first CSS framework that enables rapid UI development through composable classes, offering high customization and minimal output.',
		logo: Assets.Tailwind2,
		name: 'Tailwind',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'reactjs',
		color: 'cyan',
		description:
			'A JavaScript library for building user interfaces with a component-based architecture and virtual DOM for efficient rendering.',
		logo: Assets.ReactJs,
		name: 'React Js',
		category: 'library'
	}),
	defineSkill({
		slug: 'angular',
		color: 'red',
		description:
			'A comprehensive TypeScript-based web application framework providing powerful features for building large-scale applications.',
		logo: Assets.Angular,
		name: 'Angular',
		category: 'library'
	}),
	defineSkill({
		slug: 'svelte',
		color: 'orange',
		description: svelte,
		logo: Assets.Svelte,
		name: 'Svelte',
		category: 'library'
	}),
	defineSkill({
		slug: 'photoshop',
		color: 'blue',
		description:
			'Industry-standard image editing software used for digital art, photo manipulation, and graphic design.',
		logo: Assets.Photoshop,
		name: 'Photoshop',
		category: 'design'
	})
] as const;

export const title = 'Skills';

export const getSkills = (
	...slugs: Array<StringWithAutoComplete<(typeof items)[number]['slug']>>
): Array<Skill> => items.filter((it) => slugs.includes(it.slug));

export const groupByCategory = (
	query: string
): Array<{ category: SkillCategory; items: Array<Skill> }> => {
	const out: ReturnType<typeof groupByCategory> = [];

	const others: Array<Skill> = [];

	items.forEach((item) => {
		if (query.trim() && !item.name.toLowerCase().includes(query.trim().toLowerCase())) return;

		// push to others if item does not have a category
		if (!item.category) {
			console.log(item.category);
			others.push(item);
			return;
		}

		// check if category exists
		let category = out.find((it) => it.category.slug === item.category?.slug);

		if (!category) {
			category = { items: [], category: item.category };

			out.push(category);
		}

		category.items.push(item);
	});

	if (others.length !== 0) {
		out.push({ category: { name: 'Others', slug: 'others' }, items: others });
	}

	return out;
};
