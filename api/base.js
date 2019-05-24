import properties  from   '../properties.json';
const hostUrl ="http://"+properties.hostname+ ":"+ properties.port; 

export default {
    login   : hostUrl+"/login",
    logout  : hostUrl+"/logout"
  } 