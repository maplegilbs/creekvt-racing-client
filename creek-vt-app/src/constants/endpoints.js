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

export const API_VIEWBY_NAME_RACES = `${API}/races/view/`;

export const API_ADD_RACE = `${API}/races/new`;

export const API_DELETE_RACE = `${API}/races/delete/`;

export const API_UPDATE_RACE = `${API}/races/update/`;
//results api
export const API_ADD_RESULTS = `${API}/results/new`;

export const API_VIEWALL_RESULTS = `${API}/race-results/view-all`;

export const API_VIEWBY_RESULTS = `${API}/race-results/view/`;
