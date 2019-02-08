import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import ProfessionalTable from "./ProfessionalsTable";
import JobsTable from "./JobsTable";
import PricesTable from "./PricesTable";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FaceIcon from "@material-ui/icons/Face";
import WorkIcon from "@material-ui/icons/Work";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import "./App.css";
import strings from "./strings";

class App extends Component {
  state = {
    navigation: "price"
  };
  componentWillReceiveProps(nextProps) {
    this.props.allPricesQuery.refetch();
    this.props.AllProfessionalsQuery.refetch();
    this.props.AllJobsQuery.refetch();
  }

  handleNavigation = (event, value) => {
    this.setState({
      navigation: value
    });
  };

  render() {
    if (
      this.props.AllProfessionalsQuery.loading ||
      this.props.AllJobsQuery.loading ||
      this.props.allPricesQuery.loading
    ) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading... </div>
        </div>
      );
    }
    strings.setLanguage("he");
    const { navigation } = this.state;
    return (
      <div className="App" direction="rtl">
        <header className="App-header">
          <img
            src="https://lh3.googleusercontent.com/SqVKYoAKtBHVE_8dF_342OON6h5wHVXywXcRqT6igRyIeGRysjxPWwSVyCztnu6GJ6Eu7Q_VlYJdoWDG"
            className="App-logo"
            alt="logo"
          />
          <h1 className="App-title">Welcome to ALTO DB</h1>
        </header>
        {this.state.navigation === "profs" ? (
          <ProfessionalTable
            professionals={this.props.AllProfessionalsQuery.allProfessionals}
          />
        ) : null}
        {this.state.navigation === "jobs" ? (
          <JobsTable jobs={this.props.AllJobsQuery.allJobs} />
        ) : null}
        {this.state.navigation === "price" ? (
          <PricesTable prices={this.props.allPricesQuery.allPriceOffers} />
        ) : null}

        <BottomNavigation
          style={{ marginTop: 100 }}
          showLabels
          value={navigation}
          onChange={this.handleNavigation}
        >
          <BottomNavigationAction
            label={strings.jobs}
            value="jobs"
            icon={<WorkIcon />}
          />
          <BottomNavigationAction
            label={strings.profs}
            value="profs"
            icon={<FaceIcon />}
          />{" "}
          <BottomNavigationAction
            label={strings.prices}
            value="price"
            icon={<LocalOfferIcon />}
          />
        </BottomNavigation>
      </div>
    );
  }
}

const ALL_PROFS_QUERY = gql`
  query AllProfessionalsQuery {
    allProfessionals(orderBy: createdAt_DESC) {
      id
      name
      phone
      email
      website
    }
  }
`;

const ALL_JOBS_QUERY = gql`
  query AllJobsQuery {
    allJobs {
      id
      name
      category {
        name
      }
      subCategory
    }
  }
`;

const ALL_PRICES_QUERY = gql`
  query allPricesQuery {
    allPriceOffers {
      id
      job {
        name
      }
      professional {
        name
      }
      price
      createdAt
      currency
      unit
      comment
    }
  }
`;

const AppWithQuery = compose(
  graphql(ALL_PROFS_QUERY, {
    name: "AllProfessionalsQuery",
    options: {
      fetchPolicy: "network-only"
    }
  }),
  graphql(ALL_JOBS_QUERY, {
    name: "AllJobsQuery",
    options: {
      fetchPolicy: "network-only"
    }
  }),
  graphql(ALL_PRICES_QUERY, {
    name: "allPricesQuery",
    options: {
      fetchPolicy: "network-only"
    }
  })
)(App);

export default AppWithQuery;
