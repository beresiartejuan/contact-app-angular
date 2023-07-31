import Person from "../types/Person";

export const STORAGE_KEY = "contacts";

export interface ResponseApi {
    page: number
    per_page: number
    total: number
    total_pages: number
    results: Person[]
}

export function setContacts(contacts: Person[]) {

    try {

        if (!globalThis.hasOwnProperty("sessionStorage")) throw new Error("En este contexto no se pueden guardar datos en sessión");

        globalThis.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));

    } catch (error) {

        console.error(
            `No se pudieron guardar los siguientes contactos: \n${JSON.stringify(contacts, null, "\t")}`
        );

    }

}

export function getContacts(): Promise<Person[]> {

    return new Promise((resolve, reject) => {

        try {

            if (!globalThis.hasOwnProperty("sessionStorage")) throw new Error("En este contexto no se pueden guardar datos en sessión");

            const saved_contacts = globalThis.sessionStorage.getItem(STORAGE_KEY);

            if (!saved_contacts) throw new Error("No hay contactos guardados");

            const parsed_contacts: Person[] = JSON.parse(saved_contacts);

            console.log("Se cargaron los contactos desde el sessionStorage");

            resolve(parsed_contacts);

        } catch (error) {

            if (!globalThis.hasOwnProperty("fetch")) console.error("No se pueden hacer consultas http, la app va a fallar");

            const request = globalThis.fetch("https://peticiones.online/api/users");

            const json_data = request.then(res => res.json());

            console.log("Se cargaron los contactos desde una consulta http");

            json_data.then((data: ResponseApi) => resolve(data.results));

        }

    });

}

export function getContact(id: string): Promise<Person | undefined> {

    return new Promise((resolve, reject) => {

        getContacts().then((contacts: Person[]) => {

            const found_contact = contacts.find(contact => contact._id === id);

            if (found_contact) {
                console.log("Se ha obtenido el dato desde el sessionStorage");
                resolve(found_contact);
                return;
            }

            const request = fetch(`https://peticiones.online/api/users/${id}`);

            request.then(response => {

                if (!response.ok) {
                    resolve(undefined);
                    return;
                }

                response.json().then((data: Person) => {

                    if ("error" in data) {

                        resolve(undefined);
                        return;

                    }

                    console.log("Se ha obtenido el dato desde una consulta http");

                    contacts.push(data);

                    setContacts(contacts);

                    resolve(data);

                })

            });

        });

    });

}