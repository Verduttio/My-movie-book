export const formatGenresToEdit = (genres) => {
    return genres.map(function(genre){
        return {value : genre.name, label : genre.name};
    })
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