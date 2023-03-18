const classes = {
  //common
  flex: {
    display: "flex",
  },
  visible: {
    display: "initial",
  },
  hidden: {
    display: "none",
  },
  sort: {
    marginRight: 1,
  },
  fullHeight: { height: "100vh" },
  fullWidth: {
    width: "100%",
  },
  error: {
    color: "#f04040",
  },
  form: {
    width: "100%",
    maxWidth: 800,
    margin: "0 auto",
  },
  //layout
  main: {
    marginTop: 2,
    minHeight: "80vh",
  },
  footer: {
    marginTop: 1,
    textAlign: "center",
  },
  section: {
    marginTop: 1,
    marginBottom: 1,
  },
  // header
  titlebar: {
    backgroundColor: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    color: "#fff",
  },
  appbar: {
    backgroundColor: "#ffffff",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",

    "& a": {
      color: "#121212",
      marginLeft: 1,
    },
  },
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    textAlign: "center",
    paddingRight: 19,
  },
  grow: {
    flexGrow: 1,
  },
  navbarButton: {
    color: "#121212",
    textTransform: "initial",
  },

  menuButton: { padding: 0 },

  // search

  searchForm: {
    border: "1px solid #ffffff",
    backgroundColor: "#ffffff",
    borderRadius: 1,
  },
  searchInput: {
    paddingLeft: 1,
    color: "#000000",
    "& ::placeholder": {
      color: "#606060",
    },
  },
  searchButton: {
    backgroundColor: "#f8c040",
    padding: 1,
    borderRadius: "0 5px 5px 0",
    "& span": {
      color: "#000000",
    },
  },

  // review
  reviewItem: {
    marginRight: "1rem",
    borderRight: "1px #808080 solid",
    paddingRight: "1rem",
  },

  // map
  mapInputBox: {
    position: "absolute",
    display: "flex",
    left: 0,
    right: 0,
    margin: "10px auto",
    width: 300,
    height: 40,
    "& input": {
      width: 250,
    },
  },
};

export default classes;
