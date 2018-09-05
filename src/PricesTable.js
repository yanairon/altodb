import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import strings from "./strings";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: 20,
    marginRight: 20,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.primary
    }
  }
});

function PricesTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell> {strings.job} </CustomTableCell>
            <CustomTableCell> {strings.prof} </CustomTableCell>
            <CustomTableCell> {strings.price} </CustomTableCell>
            <CustomTableCell> {strings.date} </CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.prices.map(price => {
            return (
              <TableRow key={price.id}>
                <CustomTableCell component="th" scope="row">
                  {price.job.name}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  {price.professional.name}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  {price.price}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  {
                    new Date(price.createdAt).toLocaleDateString('he-IL')
                  }
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

PricesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PricesTable);
