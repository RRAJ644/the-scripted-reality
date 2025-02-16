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

export interface Screenplay {
  id: string
  title: string
  description: string
  imageUrl: string
  hoverGif: string
  genre: string
}

export const SCREEN_PLAYS: Screenplay[] = [
  {
    id: '1',
    title: 'The Mystery Manor',
    description: 'A thrilling suspense screenplay.',
    imageUrl:
      'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif:
      'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif',
    genre: 'Thriller',
  },
  {
    id: '2',
    title: 'Love in Paris',
    description: 'A romantic tale in the City of Love.',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
    genre: 'Romance',
  },
  {
    id: '3',
    title: 'Space Odyssey',
    description: 'A journey through the stars and beyond.',
    imageUrl:
      'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/xT4uQulxzV39haRFjG/giphy.gif',
    genre: 'Sci-Fi',
  },
  {
    id: '4',
    title: 'Haunted Forest',
    description: 'A spine-chilling horror screenplay.',
    imageUrl:
      'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif',
    genre: 'Horror',
  },
  {
    id: '5',
    title: 'The Detective Chronicles',
    description: 'A captivating mystery series.',
    imageUrl:
      'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/26BRQZnZO5C5HoZTa/giphy.gif',
    genre: 'Mystery',
  },
  {
    id: '6',
    title: 'Fantasy Kingdom',
    description: 'A magical adventure in a mythical land.',
    imageUrl:
      'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/2A75RyXVzzSI2bx4Gj/giphy.gif',
    genre: 'Fantasy',
  },
  {
    id: '7',
    title: 'Historical Legends',
    description: 'Stories from the past brought to life.',
    imageUrl:
      'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/5xtDarqCp0eomZaFJW4/giphy.gif',
    genre: 'History',
  },
  {
    id: '8',
    title: 'Comedy Club',
    description: 'A hilarious script for laughter lovers.',
    imageUrl:
      'https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/3o6ZsYm5UCXcc4RlLa/giphy.gif',
    genre: 'Comedy',
  },
  {
    id: '9',
    title: 'The Spy Files',
    description: 'An action-packed espionage thriller.',
    imageUrl:
      'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif',
    genre: 'Crime',
  },
  {
    id: '10',
    title: 'Tech Titans',
    description: 'A futuristic drama in a tech-driven world.',
    imageUrl:
      'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    hoverGif: 'https://media.giphy.com/media/1BXa2alBjrCXC/giphy.gif',
    genre: 'Crime',
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
