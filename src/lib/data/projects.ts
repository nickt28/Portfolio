import Assets from './assets';
import { getSkills } from './skills';
import type { Project } from '../types';

export const items: Array<Project> = [
	{
    slug: "SB-Calendar",
    name: "SB Calendar",
    type: "Planing Tool",
    shortDescription: "Detailed Event Tracker for Hypixel SkyBlock",
    description: "Keep track of all in-game events, updates, and special occurrences to optimise your gaming strategy and never miss an important event.",
    skills: getSkills('svelte', "reactjs", "vite", "Hypixel API", "SkyCrypt API", "js", "html", "css", "tailwind", "bootstrap"),
		links: [
			{ to: 'https://github.com/nickt28/sb-calendar', label: 'GitHub' },
			{ to: 'https://sb-calendar.com/', label: 'Demo' }
		],
		logo: Assets.ReactJs,
    color: '#5e95e3',
    period: {
			from: new Date()
		},
		screenshots: [
			{
				label: 'Laptop',
				src: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
			},
		]
  },
  {
    slug: "privazer",
    name: "PrivaZer",
    shortDescription: "Modernised UI for Enhanced User Experience",
    description: "Completed a comprehensive site redesign for PrivaZer, the free PC cleaner and privacy tool. The redesign focuses on user-friendly navigation, modern aesthetics, and improved functionality to elevate user engagement and satisfaction.",
    skills: getSkills("html", "css", "js", "UX/UI Design"),
    links: [
			{ to: 'https://github.com/nickt28/PrivaZer', label: 'GitHub' },
			{ to: 'https://privazer.pages.dev/', label: 'Demo' }
		],
		logo: Assets.Svelte,
    color: '#5e95e3',
    period: {
			from: new Date()
		},
    type: "Website Redesign",
  },
  {
    slug: "de-carbo",
    name: "DeCarbo",
    shortDescription: "Environmental Footprint Analysis Tool",
    description: "Honourable mention in the VIC GOV sponsored 48-hour hackathon project. Our team analysed extensive government datasets, and I developed a web tool that enables companies to visualise and evaluate their environmental impact through an innovative climate rating system.",
    skills: getSkills("reactjs", "Python", "js", "D3.js", "Google Maps API", "html", "css", "Data Analysis"),
    links: [
			{ to: 'https://github.com/nickt28/Hackathon-8-23', label: 'GitHub' },
			{ to: 'https://decarbo.pages.dev/', label: 'Demo' }
		],
		logo: Assets.ReactJs,
    color: '#5e95e3',
    period: {
			from: new Date()
		},
    type: "Hackathon Project",
  },
  {
    slug: "tic-tac-toe",
    name: "TicTacToe",
    shortDescription: "Classic Game with a Neon Twist",
    description: "Revamped the classic TicTacToe game with a vibrant neon aesthetic. Utilising preloaded sprites for seamless and instantaneous game loading, this project brings a fresh and visually appealing twist to a timeless favourite.",
    skills: getSkills("html", "css", "js"),
    links: [
			{ to: 'https://github.com/nickt28/Portfolio', label: 'GitHub' }
		],
		logo: Assets.HTML,
    color: '#5e95e3',
    period: {
			from: new Date()
		},
    type: "Game Development",
  },
  {
		slug: "to-do-list",
    name: "To Do List",
    shortDescription: "Efficient Task Management with Local Storage",
    description: "Demonstrated the use of local storage to save and load user entries in a task manager application. The tool offers a seamless and persistent user experience, ensuring that task data remains intact across sessions.",
    skills: getSkills("html", "css", "js"),
    links: [
			{ to: 'https://github.com/nickt28/Portfolio', label: 'GitHub' }
		],
		logo: Assets.HTML,
    color: '#5e95e3',
    period: {
			from: new Date()
		},
    type: "Planing Tool",
  }
];

export const title = 'Projects';
