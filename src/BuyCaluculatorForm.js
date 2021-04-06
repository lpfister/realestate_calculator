import React, { useReducer, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import InputAdornment from '@material-ui/core/InputAdornment';

// table 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
  Button,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const formReducer = (state, event) => {
  return {
    ...state,
    [event.id]: event.value
  }
}

function roundAccurately(number, decimalPlaces) {
  return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces);
} 

// transform to str
function currToDigit(str) {
  if(str == undefined ){
    return 0;
  }
  
  if(str == 0){
    return 0;
  }

  if (typeof str === 'number'){
    return str;
  }

  if (typeof str !== 'string'){
    return 0;
  }

  return parseFloat(str.replace('\'', ''))
}


export default function BuyCaluculatorForm() {
  const classes = useStyles();

  const isDev = (process.env.NODE_ENV !== "production")

  const initialState = {
    occupation: '95',
    rent: '1800',
    leverage: '75',
    loan_rate: '1',
    leverage: '75',
    management_cost: '0.55',
    property_tax: '0.08',
    buying_tax: '4.5',
    revenue_tax: '25',
    property_price: 600000,
    parking_price: 20000,
    total_price: 0, // price paid including notary
    notary: 0,
    total_cash: 0,
    total_loan: 0,
    renovation_cost_yearly:900
  };


  const [propertyModel, setFormData] = useReducer(formReducer, initialState);


  const handleSubmit = event => {
    event.preventDefault();

    var total_price = Math.round((currToDigit(propertyModel.property_price) + currToDigit(propertyModel.parking_price)) * (1 + parseFloat(propertyModel.buying_tax) / 100));
    var notary = Math.round((currToDigit(propertyModel.property_price) + currToDigit(propertyModel.parking_price)) * (parseFloat(propertyModel.buying_tax) / 100));
    var total_loan = Math.round(parseFloat(propertyModel.leverage) / 100 * total_price);
    var total_cash = total_price - total_loan


    setFormData({
      id: 'total_price',
      value: total_price,
    });
    setFormData({
      id: 'notary',
      value: notary,
    });
    setFormData({
      id: 'total_cash',
      value: total_cash,
    });
    setFormData({
      id: 'total_loan',
      value: total_loan,
    });
  }
  const handleChange = event => {
    setFormData({
      id: event.target.id,
      value: event.target.value,
    });
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

      <div>
        <TextField
          id="occupation"
          label="Occupation rate in %"
          type="number"
          value={propertyModel.occupation}
          onChange={handleChange}
          helperText="95% is about 1 month vacance every 2 years"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
        <TextField
          id="rent"
          label="Rent price"
          type="number"
          value={propertyModel.rent}
          onChange={handleChange}
          helperText="Rent excluding utilities bills such as heater/electricity"
        />
        <TextField
          id="leverage"
          label="Leverage of the loan"
          type="number"
          value={propertyModel.leverage}
          onChange={handleChange}
          helperText="Percentage of loan compared to total price including notary fees"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
        <TextField
          id="loan_rate"
          label="Loan Rate"
          type="number"
          value={propertyModel.loan_rate}
          onChange={handleChange}
          helperText="Percentage of the loan rate"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
        <TextField
          id="management_cost"
          label="Management Cost"
          type="number"
          value={propertyModel.management_cost}
          onChange={handleChange}
          helperText="Typically around 0.6% of value, that includes everything except internal renovation and electricity"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </div>
      <div>
        <TextField
          id="property_tax"
          label="Property tax in %"
          type="number"
          value={propertyModel.property_tax}
          onChange={handleChange}
          helperText="In French called the Impot Foncier, depending on the commune"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
        <TextField
          id="buying_tax"
          label="Buying tax in %"
          type="number"
          value={propertyModel.buying_tax}
          onChange={handleChange}
          helperText="Depends on the canton, for VD typically 4.5 including state tax and notary"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
        <TextField
          id="revenue_tax"
          label="Revenue tax in %"
          type="number"
          value={propertyModel.revenue_tax}
          onChange={handleChange}
          helperText="Your revenue tax bracket"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </div>
      <div>
        <CurrencyTextField
          id="property_price"
          label="Property price"
          currencySymbol="CHF"
          value={propertyModel.property_price}
          outputFormat="number"
          digitGroupSeparator="'"
          onChange={handleChange}
          decimalPlaces={0}

        />
        <CurrencyTextField
          id="parking_price"
          label="Parking price"
          currencySymbol="CHF"
          outputFormat="number"
          value={propertyModel.parking_price}
          onChange={handleChange}
          digitGroupSeparator="'"
          decimalPlaces={0}
        />

      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Compute
      </Button>
      <Typography component="p" variant="h4" value={propertyModel.total_price}>
        Result
      </Typography>
      <CurrencyTextField
        label="Notary fees"
        currencySymbol="CHF"
        outputFormat="number"
        value={propertyModel.notary}
        onChange={handleChange}
        digitGroupSeparator="'"
        disabled
      />
      <CurrencyTextField
        label="Total price"
        currencySymbol="CHF"
        outputFormat="number"
        value={propertyModel.total_price}
        onChange={handleChange}
        digitGroupSeparator="'"
        disabled
      />
      <CurrencyTextField
        label="Total loan"
        currencySymbol="CHF"
        outputFormat="number"
        value={propertyModel.total_loan}
        onChange={handleChange}
        digitGroupSeparator="'"
        disabled
      />
      <CurrencyTextField
        label="Total cash"
        currencySymbol="CHF"
        outputFormat="number"
        value={propertyModel.total_cash}
        onChange={handleChange}
        digitGroupSeparator="'"
        disabled
      />
      <ul>
        {isDev ? (
            Object.entries(propertyModel).map(([id, value]) => (
            <li key={id}><strong>{id}</strong>:{value}</li>
          ))
        )  : ("")
        }
      </ul>
      <BasicTable propertyModel={propertyModel}/>
    </form>
  );
}

function BasicTable(props) {
  const classes = useStyles();

  function createData(name, year1, year2, year3, year4) {
    return { name, year1, year2, year3, year4 };
  }

  const propertyModel  = props.propertyModel;

  // running cost
  var loan_repayment = Math.round(propertyModel.total_loan * parseFloat(propertyModel.loan_rate)/100,2);
  var total_price_without_notary = currToDigit(propertyModel.total_price) - propertyModel.notary ;
  var body_corporate = Math.round( total_price_without_notary  *parseFloat(propertyModel.management_cost)/100,2);
  var renovation_cost_yearly = propertyModel.renovation_cost_yearly;
 
  // income
  var gross_income =  Math.round(parseFloat(propertyModel.rent)*12*parseFloat(propertyModel.occupation)/100,2);

  var gross_profit = gross_income - body_corporate - loan_repayment - renovation_cost_yearly;
  
  // tax income/wealth
  
  var wealth_tax = total_price_without_notary * 0.8 * parseFloat(propertyModel.property_tax)/100;
  var income_tax = (gross_profit-wealth_tax)*parseFloat(propertyModel.revenue_tax)/100;  
  var net_profit = gross_profit - income_tax - wealth_tax;

  const rows = [
    createData('Loan Repayment', loan_repayment, 6.0, 24, 4.0),
    createData('Body corporate fees', body_corporate, 9.0, 37, 4.3),
    createData('Internal renovation yearly saving', propertyModel.renovation_cost_yearly, 16.0, 24, 6.0),
    createData('Gross income',gross_income, 3.7, 67, 4.3),
    createData('Gross profit', gross_profit, 16.0, 49, 3.9),
    createData('Net profit after tax', net_profit, 16.0, 49, 3.9),
    createData('Gross profit on cash', roundAccurately(gross_profit/propertyModel.total_cash*100,2), 16.0, 49, 3.9),
    createData('Net profit on cash', roundAccurately(net_profit/propertyModel.total_cash*100,2), 16.0, 49, 3.9),
  ];
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell align="right">Year 1</TableCell>
            <TableCell align="right">Year 2</TableCell>
            <TableCell align="right">Year 3</TableCell>
            <TableCell align="right">Year 4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.year1}</TableCell>
              <TableCell align="right">{row.year2}</TableCell>
              <TableCell align="right">{row.year3}</TableCell>
              <TableCell align="right">{row.year4}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}