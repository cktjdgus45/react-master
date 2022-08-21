export function makeImagePath(id: string, format?: string) {
    return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
}
//image.tmdb.org/t/p/w500/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg