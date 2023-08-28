import Person from "../types/Person";

export const STORAGE_KEY = "contacts";

export interface ResponseApi {
    page: number
    per_page: number
    total: number
    total_pages: number
    results: Person[]
}

export function updateContact(contact: Person): Promise<boolean> {

    return new Promise((resolve, reject) => {

        deleteContact(contact._id).then(result => {

            if (!result) {
                resolve(false);
                return;
            };

            getContacts().then(all_contacts => {

                setContacts([contact, ...all_contacts]);

                resolve(true);

            });

        });

    });
}

export function deleteContact(_id: string): Promise<boolean> {

    return new Promise((resolve, reject) => {

        getContacts().then(contacts => {

            const filtered_contacts = contacts.filter(c => c._id !== _id);

            setContacts(filtered_contacts);

            resolve(true);

        });

    });

}

export function addContact(contact: Omit<Person, '_id' | 'id' | 'image'>): Promise<Person> {

    return new Promise((resolve, reject) => {

        globalThis.fetch("https://peticiones.online/api/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        }).then(response => {

            if (!response.ok) {
                console.error("No se pudo guardar el contacto");
                reject("No se pudo crear el contacto");
                return;
            }

            response.json().then((data: {
                id: number,
                first_name: string,
                last_name: string,
                email: string,
                username: string,
                image: string
            }) => {

                resolve({
                    ...data,
                    password: contact.password,
                    _id: Math.random().toString(30).substring(2)
                });

            });

        });
    });
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