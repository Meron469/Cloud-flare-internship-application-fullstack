//Meron Solomon
//Site:https://snowy-cake-a351.meron469.workers.dev
addEventListener('fetch', event => {
		event.respondWith(handleRequest(event.request));
});
//random number generator for the 50/50 chane of the site
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//this class changes the paramaters of the site elements
class Change_values {
	element(Change_variable) {
		if (Change_variable.tagName === 'title'){
			Change_variable.setInnerContent('Variant ' + (Place + 1));
		} else if (Change_variable.tagName === 'h1') {
			Change_variable.setInnerContent('Variant ' + (Place + 1));
		} else if (Change_variable.tagName === 'p') {
			Change_variable.setAttribute('style', 'font-family:Times New Roman;');
		} else if (Change_variable.tagName === 'a') {
			Change_variable.setAttribute('href', 'https://github.com/Meron469?tab=projects');
      Change_variable.setInnerContent('Meron-Github');
      Change_variable.setAttribute('style', 'background-color:#32CD32;');
		 } 
	}


}

/**
 * Respond with hello worker text
 * @param {Request} request
 */
 var Place = null;
 async function handleRequest(request) {
  //setting the cookie function and variable to choose the site
 	const Hold_cookie= 'Place';

 	const Get_cookie = Cookie_parse(request, Hold_cookie);
//this if statment is where the url well be choosen 
 	if(Get_cookie){
 		Place = parseInt(Get_cookie);
   } 
   else 
   {
      Place=randomIntFromInterval(0, 1)
 	}
  //setting up the url and fetching the header from the link gicen
	const url = 'https://cfw-takehome.developers.workers.dev/api/variants';
  //fetching the url and parseing it in the object
	let Respond_2 = await fetch(url);
	let Information = await Respond_2.json();
   //appedning the headers from the json object
	let Top_page = new Headers();
	Top_page.append('Set-Cookie', Hold_cookie+ '=' + (String)(Place));

	const Start = {
		method: 'GET',
		headers: Top_page,
		credentials: 'same-origin'
	};
  //fetching in the information into fetc and returning it in a response at the end of the function
	let Take_in = await new Request(Information['variants'][Place]);
	let Fetc = await fetch(Take_in);

	Fetc = new HTMLRewriter().on('title', new Change_values()).transform(Fetc);
	Fetc = new HTMLRewriter().on('h1#title', new Change_values()).transform(Fetc);
	Fetc = new HTMLRewriter().on('p#description', new Change_values()).transform(Fetc);
	Fetc = new HTMLRewriter().on('a#url', new Change_values()).transform(Fetc);
	let Response_return = new Response(Fetc.body, Start);

	return Response_return;
}

//this function will take in the index and request and choose the url from the cookies 
//I am also parseing the information I need
function Cookie_parse(request, Cookie) {
	let Test = null;
	let Url_C = request.headers.get('Cookie');
	if (Url_C) {
		let cookies = Url_C.split(';');
		cookies.forEach(Get_cookie => {
		let cookieName = Get_cookie.split('=')[0].trim();
		if (cookieName === Cookie) {
			let cookieVal = Get_cookie.split('=')[1];
			Test = cookieVal;
		}
		});
	}
	return Test;
}

