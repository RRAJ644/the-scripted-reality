export type Path = {
  path: string
}
export const ROUTING_PATHS: Path[] = [
  {
    path: '/blogs',
  },
  {
    path: '/',
  },
]



export const slugify = (title: string): string => {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove non-alphanumeric characters (except hyphen)
    .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, '') // Remove leading hyphen if any
    .replace(/-+$/, '') // Remove trailing hyphen if any
}
