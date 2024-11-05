import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(1, "some data", "some data", "some data", "some data", 5),
  createData(1, "some data", "some data", "some data", "some data", 5),
  createData(1, "some data", "some data", "some data", "some data", 5),
  createData(1, "some data", "some data", "some data", "some data", 5),
  createData(1, "some data", "some data", "some data", "some data", 5),
  createData(1, "some data", "some data", "some data", "some data", 5),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function CustomTable() {
  return (
    <React.Fragment>
      <Title>A table</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Column 1</TableCell>
            <TableCell>Column 2</TableCell>
            <TableCell>Column 3</TableCell>
            <TableCell>Column 4</TableCell>
            <TableCell align="right">Column 5</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Another link
      </Link>
    </React.Fragment>
  );
}
