const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			characters: [], // Lista de personajes
			vehicles: [], // Lista de vehiculos
			planets: [], // Lista de planetas
			favorites: [],// Lista de favoritos


		},
		actions: {
			addFav: (fav) => {
				const store = getStore();
				if(!store.favorites.some(f=> f.uid === fav.uid)){
					setStore({
						favorites:[...store.favorites, fav]
					});
				}
			},
			removeFavByUid: (uid) => {
				const store = getStore();
					const updatedFavorites = store.favorites.filter(fav => fav.uid !== uid);
					setStore({favorites: updatedFavorites });
					
		    },
						

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
	setStore({ demo: demo });
			},
			 
			getPeople: () => {
				fetch("https://www.swapi.tech/api/people")
					.then(response => {
						if (!response.ok) {
							console.error(`Error ${response.status}:La solicitud no fue exitos.`);
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						return response.json();
					})

					.then(data => {
						console.log("Datos obtenidos:", data.results);
						setStore({ characters: data.results });
					})
					.catch(error => {
						console.error(" Hubo un error al obtener los personajes:", error);
					});
			},
			getVehicles: () => {
				fetch("https://www.swapi.tech/api/vehicles")
					.then(response => {
						if (!response.ok) {
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						return response.json();
					})

					.then(data => {
						console.log("Datos obtenidos:", data.results);
						setStore({ vehicles: data.results });
					})
					.catch(error => {
						console.error(" Hubo un error al obtener los vehículos:", error);
					});
			},
			getPlanets: () => {
				fetch("https://www.swapi.tech/api/planets")
					.then(response => {
						if (!response.ok) {
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						return response.json();
					})

					.then(data => {
						console.log("Datos obtenidos:", data.results);
						setStore({ planets: data.results });
					})
					.catch(error => {
						console.error(" Hubo un error al obtener los planetas:", error);
					});
			},
		}
	};

};

export default getState;
