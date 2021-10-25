import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Grid,
  Card
} from "@material-ui/core";
import { getCarList } from '../redux/modules/car/actions'

const YEAR_OPTIONS = new Array(50).fill('').map((item, index) => 2000 + index)

function Home() {
  const dispatch = useDispatch()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [make, setMake] = React.useState('');
  const [type, setType] = React.useState('');
  const [year, setYear] = React.useState('');

  const car = useSelector((state) => state.car)

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [setPage])

  const onChagenRowsPerPage = useCallback(event => {
    setRowsPerPage(event.target.value)
  }, [setRowsPerPage]);

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeMake = (event) => {
    setMake(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const onSearch = useCallback(() => {
    dispatch(getCarList({ make, type, year }))
  }, [type, make, year, dispatch])

  return (
    <div className="expense-container">
      <h2 className="header-title">Cars</h2>
      <div className="header-wrapper">
        <Grid container spacing={6}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <FormControl>
              <InputLabel htmlFor="my-input">Car Make</InputLabel>
              <Input aria-describedby="my-helper-text" value={make} onChange={handleChangeMake} />
            </FormControl>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <FormControl>
              <InputLabel htmlFor="my-input">Car Type</InputLabel>
              <Input aria-describedby="my-helper-text" value={type} onChange={handleChangeType} disabled={!make} />
            </FormControl>
          </Grid>
          <Grid item lg={2} md={4} sm={12} xs={12}>
            <FormControl>
              <InputLabel htmlFor="my-input">Car Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                onChange={handleChangeYear}
                disabled={!make}
              >
                {YEAR_OPTIONS.map((item, index) => (
                  <MenuItem value={item} key={index}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={2} md={4} sm={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSearch}
              disabled={!type && !make && !year}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
      <Card className="w-100 overflow-auto" elevation={6}>
        <Table className="crud-table" style={{ whiteSpace: "pre", minWidth: "750px" }}>
          <TableHead>
            <TableRow>
              <TableCell className="bold">Make ID</TableCell>
              <TableCell className="bold">Make Name</TableCell>
              <TableCell className="bold">Model ID</TableCell>
              <TableCell className="bold">Model Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {car.items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="px-0" align="left">
                    {item.Make_ID}
                  </TableCell>
                  <TableCell className="px-0" align="left">
                    {item.Make_Name}
                  </TableCell>
                  <TableCell className="px-0">{item.Model_ID}</TableCell>
                  <TableCell className="px-0" align="left">
                    {item.Model_Name}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          className="px-16"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={car.items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={onChagenRowsPerPage}
        />
      </Card>
    </div>
  );
}

export default Home;
