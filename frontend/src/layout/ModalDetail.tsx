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
        // Creiamo l'oggetto JSON con i dati da inviare
        const dataToSend = {
            location: form.location,
            date: form.date,
            hour_in: form.time + ":00", // Aggiungi i minuti per un formato corretto (es. "08:00")
            hour_out: form.time + ":00", // Se hai bisogno di "hour_out" in futuro
            action: form.action,
            notes: form.notes,
        };
    
        // URL a cui inviare i dati
        const url = 'http://localhost:8090/api/v1/entry'; // Cambia con il tuo endpoint
    
        // Opzioni per la richiesta POST
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Dichiariamo il formato JSON
            },
            body: JSON.stringify(dataToSend), // Serializziamo l'oggetto JSON
        };
    
        // Chiamata POST con fetch
        fetch(url, options)
            .then((response) => response.json()) // Parse della risposta JSON
            .then((data) => {
                alert('Dati salvati con successo!');
                console.log('Risposta del server:', data);
            })
            .then(() => {
                setForm(initialState); // Reset del form
                closeCallback(false);  // Chiudi o resetta il form
            })
            .catch((error) => {
                console.error('Errore durante il salvataggio:', error);
                alert('Si è verificato un errore durante il salvataggio.');
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
