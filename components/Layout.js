import Head from "next/head";
import Link from "next/link";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#grey",
    },
    type: "dark",
  },
});

const Layout = ({ children, title = "Open Startup / Metrics" }) => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Link href="/" passHref>
                <a>
                  <img
                    src="https://ucarecdn.com/2702d2d3-6204-45f2-837e-1e911ae64929/"
                    alt="icon"
                    height="72"
                  />
                </a>
              </Link>

              <Button
                href="https://medium.com/wrapped"
                target="_blank"
                color="inherit"
              >
                Blog
              </Button>

              <Link href="/" passHref>
                <Button>Reserves</Button>
              </Link>
              <Button href="mailto:help@wrapped.com" color="inherit">
                Help
              </Button>
              <Button
                href="https://tokensoft.typeform.com/to/BvAXNGPL?typeform-source=wrapped.com"
                target="_blank"
                color="inherit"
              >
                Sign Up
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
