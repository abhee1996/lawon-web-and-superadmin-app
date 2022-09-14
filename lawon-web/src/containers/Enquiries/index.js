import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import { connect } from "react-redux";
import compose from "recompose/compose";
import LoadingBar from "react-top-loading-bar";

import * as actions from "../../actions/Enquiries";
import EnquiriesList from "./EnquiriesList";
import DashboardHeading from "../../components/atoms/DashboardMainHeading";
import HandleEnquiries from "../../components/molecules/handleenquiries";

const drawerWidth = 550;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: 67,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
});

class Enquiries extends React.Component {
  state = {
    open: false,
    buttonId: 1
  };

  componentDidMount() {
    this.handleNewEnquiry();
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;

    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  handleOpenrawer = ({ id }) => {
    const { getEnquiryDetails, getLawyerConversation } = this.props;

    getEnquiryDetails({ id }).then(() => {
      this.setState({ open: true });
      getLawyerConversation({ enquiryId: id });
    });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleNewEnquiry = () => {
    this.setState({ buttonId: 1 });
    const { getAllEnquiries } = this.props;
    getAllEnquiries();
  }

  handleOpenEnquiry = () => {
    this.setState({ buttonId: 2 });
    const { getOpenEnquiries } = this.props;
    getOpenEnquiries();
  }

  handleArchiveEnquiry = () => {
    this.setState({ buttonId: 3 });
    const { getArchivedEnquiries } = this.props;
    getArchivedEnquiries();
  }
  
  render() {
    const { classes } = this.props;
    const { open, buttonId } = this.state;

    return (
      <div className="main">
        <LoadingBar
          onRef={(ref) => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <div className="container-fluid no-padding">
          <div className={classes.root}>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}>
              <div>
                <DashboardHeading text="Enquiries" />
                <div className="filter-enquiries">
                  <span
                    className={buttonId === 1 && "active-filter"}
                    onClick={this.handleNewEnquiry}>
                    NEW ENQUIRIES
                    </span>
                  <span
                    className={buttonId === 2 && "active-filter"}
                    onClick={this.handleOpenEnquiry}>
                    OPEN ENQUIRIES
                    </span>
                  <span
                    className={buttonId === 3 && "active-filter"}
                    onClick={this.handleArchiveEnquiry}>
                    ARCHIVED
                    </span>
                </div>
              </div>

              <EnquiriesList
                {...this.props}
                onClickRow={this.handleOpenrawer}
              />
            </main>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="right"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}>
              <span
                className="close-cross"
                onClick={this.handleDrawerClose}>
                X
                </span>

              <div className="account-settings-area">
                <HandleEnquiries {...this.props} />
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ enquiries }) => ({ ...enquiries });

const withRedux = connect(
  mapStateToProps,
  actions
);

export default compose(
  withStyles(styles, { withTheme: true }),
  withRedux
)(Enquiries);
