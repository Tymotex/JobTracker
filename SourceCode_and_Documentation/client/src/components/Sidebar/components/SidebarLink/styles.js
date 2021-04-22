import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    "&:hover, &:focus": {
      backgroundColor: "#444444"
    },
  },
  linkActive: {
    backgroundColor: "#444444",
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: "#444444",
      borderRadius: "10px"
    },
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
    color: "white"
  },
  linkIconActive: {
    color: "white"
  },
  linkText: {
    padding: 0,
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
    color: "white"
  },
  linkTextActive: {
    // color: theme.palette.text.primary,
    color: "white"
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));
