# Instructions

How to start the application

## Installation with Visual Studio Code and Docker

1. Download [Docker](https://www.docker.com/get-started) (On Windows, if not enabled, see the documentation [WSL2](https://docs.docker.com/desktop/windows/wsl/))
2. Download [Visual Studio Code](https://code.visualstudio.com/)
3. Add the following extensions in Visual Studio Code:

- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
- [Remote - Container](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

4. Clone locally your desired repository
```bash
git clone [REPOSITORY_URL]
```

5. Move into the folder with the terminal
```bash
mv [REPOSITORY_FOLDER_NAME]
```
6. Type on terminal:
```bash
code .
```

7. Once Visual Studio Code is open, click "reopen on container" on the bottom right
8. Open a new terminal in Visual Studio Code and type:
```bash
cd frontend

npm install
```

## Installation only with Docker

1. Download [Docker](https://www.docker.com/get-started) (On Windows, if not enabled, see the documentation [WSL2](https://docs.docker.com/desktop/windows/wsl/))
2. Clone locally your desired repository
```bash
git clone [REPOSITORY_URL]
```

3. Move into the folder with the terminal
```bash
mv [REPOSITORY_FOLDER_NAME]
```
4. Type on terminal:
```bash
docker-compose up -d
```

5.  Once the container has been created, attach the terminal to it by the means of the following instruction:
```bash
docker exec -it gtfleet_frontend
```

6. Inside the attached terminal, type:

```bash
cd /home/node/frontend

npm install
```

## Usage

Start the application with:

```bash
#if use installation only docker go on the correct folder with "cd /home/node"
cd frontend

npm start
```

Go on [localhost](http://localhost:3000)






// import { DateRange } from "@mui/icons-material";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";




interface Comune {
    nome: string;
    codice: string;
}
interface ModalDetailInterface {
    isVisible: boolean
    // con any indichiamo che può  fare qualsiasi cosa.
    closeCallback: any
}
interface FormInterface {
    location: string
    date: string
    time: string
    action: string
    notes: string
}
const ModalDetail = ({
    isVisible = false,
    closeCallback
}: ModalDetailInterface) => {
    const initialState = {
        location: "",
        date: "",
        time: "",
        action: "",
        notes: ""
    }
    const [form, setForm] = useState<FormInterface>(initialState);
    const [comuni, setComuni] = useState<Comune[]>([]);


    async function getComuni() {
        const promise = await fetch("./citta.json")
        const json = await promise.json();
        setComuni(json)
    }


    useEffect(() => {
        getComuni();
    }, [])


    const onSave = () => {
        const formData = new FormData();


        formData.append("location", form.location)
        formData.append("date", form.date)
        formData.append("hour_in", form.time + ":00")
        // formData.append("hour_out", form.time + ":00")
        formData.append("action", form.action)
        formData.append("notes", form.notes)


        // URL a cui inviare i dati
        const url = 'http://localhost:8090/api/v1/entry'; // Cambia con il tuo endpoint


        // Opzioni per la richiesta POST
        const opzioni = {
            method: 'POST',
            body: formData // Dati da inviare nel corpo della richiesta
        };


        // Chiamata POST con fetch
        fetch(url, opzioni)
            .then(response => {
                return response.json(); // Parse della risposta JSON
            })
            .then(data => {
                alert('Dati salvati con successo!');
                console.log('Risposta del server:', data);
            })
            .then(() => {
                setForm(initialState)
                closeCallback(false);  // Chiude o resetta il form
            });
    };
    return (
        <Modal
            open={isVisible}
            onClose={() => closeCallback(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <p>Student</p>


                <div className="mb-3">
                    <label htmlFor="location-select" className="form-label">Location</label>
                    <select
                        id="location-select"
                        className="form-select"
                        value={form.location}
                        onChange={(event) => setForm({ ...form, location: event.target.value })}
                    >
                        <option value="">Seleziona un comune</option>
                        {comuni &&
                            comuni.map((comune) => (
                                <option key={comune.codice} value={comune.nome}>
                                    {comune.nome}
                                </option>
                            ))}
                    </select>
                </div>


                <div className="mb-3">
                    <label htmlFor="date-input" className="form-label">Date</label>
                    <input
                        type="date"
                        id="date-input"
                        className="form-control"
                        value={form.date}
                        onChange={(event) => setForm({ ...form, date: event.target.value })}
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="time-input" className="form-label">Time</label>
                    <input
                        type="time"
                        id="time-input"
                        className="form-control"
                        value={form.time}
                        onChange={(event) => setForm({ ...form, time: event.target.value })}
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="action-select" className="form-label">Action</label>
                    <select
                        id="action-select"
                        className="form-select"
                        value={form.action}
                        onChange={(event) => setForm({ ...form, action: event.target.value })}
                    >
                        <option value="">Seleziona</option>
                        <option value="check-in">Check-in</option>
                        <option value="check-out">Check-out</option>
                    </select>
                </div>


                <div className="mb-3">
                    <label htmlFor="notes-input" className="form-label">Notes</label>
                    <textarea
                        id="notes-input"
                        className="form-control"
                        value={form.notes}
                        onChange={(event) => setForm({ ...form, notes: event.target.value })}
                    ></textarea>
                </div>


                <div className="d-flex justify-content-end mt-3">
                    <Button onClick={() => closeCallback(false)} >Close</Button>
                    <Button onClick={onSave}>Stamp</Button>
                </div>
            </Box>
        </Modal>
    );
};


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    padding: 3,
    backgroundColor: 'white',
    borderRadius: '8px',
};
export default ModalDetail;
