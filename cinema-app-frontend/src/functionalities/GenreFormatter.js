export const formatGenresToEdit = (genres) => {
    return genreFormatter(genres, ",");
}

export const formatGenresToDisplay = (genres) => {
    return genreFormatter(genres, " / ");
}

const genreFormatter = (genres, formatter) => {
    let genresString = "";
    if(genres === undefined) return genresString;
    genres.map(genre => {genresString += (genre.name+ formatter)});
    genresString = genresString.substring(0, genresString.length - formatter.length);
    return genresString;
}