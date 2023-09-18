export const API = "http://localhost:3307";

//user api
export const API_SIGNIN_USER = `${API}/users/login`;

export const API_REGISTER_USER = `${API}/users/register`;

export const API_UPDATE_USER = `${API}/users/update/`;

export const API_DELETE_USER = `${API}/users/delete/`;

//photos api
export const API_GETALL_PHOTOS = `${API}/photos/view-all`;

export const API_VIEWBY_ATHLETE_PHOTOS = `${API}/photos/view/`;

export const API_VIEWBY_RACE_PHOTOS = `${API}/photos/search/`;

//races api
export const API_VIEWALL_RACES = `${API}/races/view-all`;

export const API_VIEW_RACES_BY_NAME = `${API}/races/view/`;

export const API_ADD_RACE = `${API}/races/new`;

export const API_DELETE_RACE = `${API}/races/delete/`;

export const API_UPDATE_RACE = `${API}/races/update/`;

export const API_REGISTER_RACE = `${API}/races/register/`;

export const API_VIEW_REGISTERED_RACERS = `${API}/races/view-registered-athletes/`;

export const API_VIEW_REGISTERED_RACES = `${API}/races/view-registered-races/`;

export const API_DELETE_REGISTERED_RACER = `${API}/races/delete-athlete/`;

export const API_UPDATE_REGISTERED_RACER = `${API}/races/update-racers/`;

//results api
export const API_ADD_RESULTS = `${API}/results/new`;

export const API_VIEW_ALL_RESULTS = `${API}/race-results/view-all`;

export const API_VIEW_RESULTS_BY_RACENAME = `${API}/race-results/view-by-name/`;

export const API_VIEW_RESULTS_BY_YEAR = `${API}/race-results/view-by-year/`;

export const API_VIEW_RESULTS_BY_CATEGORY = `${API}/race-results/view-by-category/`;

export const API_VIEW_RESULTS_BY_ATHLETE = `${API}/race-results/view-by-athlete/`;

export const API_ADD_RACE_RESULTS = `${API}/race-results/new`;

export const API_HALL_OF_CHAMPIONS = `${API}/race-results/hall-of-champions/`;
