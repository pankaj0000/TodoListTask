import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { errors, labels } from "../dictionary";
import { Button, Typography } from "@mui/material";

export default function AllTask({ data, handleEditPress, handleDeletePress ,handleBackPress}) {
  return (
    <Container component="main" sx={{ mt: 5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{labels.title}</TableCell>
              <TableCell>{labels.description}</TableCell>
              <TableCell>{labels.status}</TableCell>
              <TableCell align="right">{labels.actions}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.title}
                  </TableCell>
                  <TableCell>{row?.description}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell align="right">
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => handleEditPress(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      sx={{ marginLeft: 10 }}
                      onClick={() => handleDeletePress(row)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Typography component="h1" variant="h6">
                {errors.noData}
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => handleBackPress(false)}
      >
        {labels.back}
      </Button>
    </Container>
  );
}
