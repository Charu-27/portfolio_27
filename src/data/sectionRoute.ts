/** Section order for the side “route” map (scroll targets). */
export const SECTION_ROUTE_STEPS = [
  { id: 'home', title: 'Home', line: 'Hero · intro' },
  { id: 'about', title: 'About', line: 'Profile & story' },
  { id: 'experience', title: 'Experience', line: 'Work history' },
  { id: 'skills', title: 'Skills', line: 'Stack & tools' },
  { id: 'projects', title: 'Projects', line: 'Builds' },
  { id: 'contact', title: 'Contact', line: 'Get in touch' },
] as const

export type SectionRouteId = (typeof SECTION_ROUTE_STEPS)[number]['id']
