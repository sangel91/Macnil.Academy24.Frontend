import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReportInformation from './ReportInformation';

localStorage.setItem("user_id", "1");
const user_id = localStorage.getItem("user_id");

console.log("user id: "+user_id);


interface Entry {
    id: number;
    date: string;
    workTimeMinutes: number;
    status_h: number;
    status_m: number;
  }

// filter 
const currentMonth = new Date().getMonth() + 1; // Mesi da 0 a 11, quindi aggiungiamo 1
console.log(currentMonth);

function formatDate(dateString: String) {
    // Separa la data in base al carattere "/"
    const [year, month, day] = dateString.split('-');
    
    // Ritorna la data nel formato "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
  }



export default function Report() {
    const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);
    const [rows, setRows] = useState<Entry[]>([]);
    const [error, setError] = useState<string | null>(null);
    
        
    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setSelectedMonth(Number(e.target.value));

    }

    useEffect(()=>{
        console.log("selected month: "+selectedMonth);

        const fetchReport = async ()=>{

            // try{
            //     const response= await fetch(`http://localhost:8090/api/v1/report?month=${selectedMonth}`);
            //     const data = await response.json();
            //     console.log("Data fetched:", data);
            //     setRows(data);

            // }catch(error){
            //     setError((error as Error).message); 
            // }
            
            try{
                const response= await fetch(`http://localhost:8090/api/v1/user/${user_id}/report/${selectedMonth}`);
                const data = await response.json();
                console.log("Data fetched:", data);
                setRows(data);

            }catch(error){
                setError((error as Error).message); 
            }
        };
        fetchReport();

    }, [selectedMonth])
  


    if (error) {
        return <div>Error: {error}</div>; // Mostra il messaggio d'errore nella UI
    }

    return (<>
        <Box sx={{ minWidth: 120, m: 2 }}>
            <FormControl sx={{ width: 150 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Month
                </InputLabel>
                <NativeSelect
                value={selectedMonth}
                onChange={handleChange} // Invia la richiesta quando cambia la selezione
                inputProps={{
                    name: 'Month',
                    id: 'uncontrolled-native',
                }}
                >
                <option value={1}>Gennaio</option>
                <option value={2}>Febbraio</option>
                <option value={3}>Marzo</option>
                <option value={4}>Aprile</option>
                <option value={5}>Maggio</option>
                <option value={6}>Giugno</option>
                <option value={7}>Luglio</option>
                <option value={8}>Agosto</option>
                <option value={9}>Settembre</option>
                <option value={10}>Ottobre</option>
                <option value={11}>Novembre</option>
                <option value={12}>Dicembre</option>
                </NativeSelect>
            </FormControl>
        </Box>

        {/* table  */}
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell component="th">Date</TableCell>
                <TableCell component="th" align="center">Status</TableCell>
                <TableCell component="th" align="right"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {
                      formatDate(row.date)
                    }
                </TableCell>
                <TableCell align="center" //status
                    className={row.workTimeMinutes >= 8 * 60 ? 'greenText' : 'redText'}>
                    <div className='divStatus' >
                    {row.workTimeMinutes >= 8 * 60 ? 
                        (<img src="/check_20dp_78A75A_FILL0_wght400_GRAD0_opsz20.svg" alt="Icon" width="20" height="20"></img>) : 
                        (<img src="/error_20dp_EA3323_FILL0_wght400_GRAD0_opsz20.svg" alt="Icon" width="20" height="20"/>)}
                    {`${Math.floor(row.workTimeMinutes / 60)}:${(row.workTimeMinutes % 60).toString().padStart(2, '0')} h`}
                    </div>
                </TableCell>
                <TableCell align="right">
                    {/* <img src="/search_24dp_5985E1_FILL0_wght400_GRAD0_opsz24.png" alt="Icon" width="24" height="24" className='icon' /> */}
                    <ReportInformation></ReportInformation>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

        
  </>);
}
