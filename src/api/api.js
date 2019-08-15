import * as axios from "axios";

const instance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/'
});


export const GoogleAPI = {
  getCoordinates(str) {
    return instance.get(`/json?address=${str}&key=AIzaSyDFIeLcSXFoj1sjauT3e9I3V2p0P_hHAgk`)
      .then(response => {
        return response.data;
      });
  }
}


