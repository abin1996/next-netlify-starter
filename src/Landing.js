import { Avatar, Fade, Grid, Hidden, makeStyles, Tooltip, Typography, useMediaQuery, useTheme, Zoom, SvgIcon  } from "@material-ui/core";
import clsx from "clsx";
import Image from 'next/image'
import data from '../resumeData.json'
import TypedComponent from "./TypedComponent";
import icons from "simple-icons";
const { landing } = data


const professionalDetails = landing.professionalDetails.map(({ alt, icon, link }) => {
    const ic = icons[icon]

    return {
        alt,
        backgroundColor: '#' + ic.hex,
        icon: ic || <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>{ic.title}</title>
            <path d={ic.path} fill="white" />
        </svg>,
        link
    }
})

let iobj = {}
professionalDetails.forEach(({ alt, backgroundColor }) => {
    iobj[alt] = { backgroundColor }
})

const useStyles = makeStyles(theme => ({
    cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
        paddingBottom: theme.spacing(10)
    },
    subtitle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5)
    },
    avatar: {
        height: theme.spacing(8),
        width: theme.spacing(8),
        padding: theme.spacing(2)
    },
    ...iobj
}))

export default function Landing() {

    const classes = useStyles();
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container justifyContent="center" alignItems="center" className={classes.cont}>
            <Grid item xs={12} lg={6}>
                <Typography variant={mdDown ? "h2" : "h1"}>
                    {landing.title}
                </Typography>
                <Typography variant={mdDown ? "h5" : "h4"} component="h2" className={classes.subtitle}>
                    <TypedComponent
                        strings={landing.subtitles}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                    />
                </Typography>
                <Grid container direction="row" spacing={2}>
                    {
                        professionalDetails.map(({ alt, icon, link }, i) =>
                            <Grid item key={i}>
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                    <Zoom in={true} style={{ transitionDelay: `${100 * i}ms` }}>
                                        <Tooltip title={alt} placement="top">
                                            <Avatar variant="rounded" className={clsx([classes.avatar, classes[alt]])}>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                    viewBox="0 0 24 24"
                                                    >
                                                    {icon.title && <title>{icon.title}</title>}
                                                    <path d={icon.path} /></svg>
                                            </Avatar>
                                        </Tooltip>
                                    </Zoom>
                                </a>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>

            <Hidden mdDown>
                <Fade in={true} style={{ transitionDelay: '100ms' }}>
                    <Grid item lg={6}>
                        <Image
                            src="/female-avatar-2.svg"
                            alt="Landing"
                            width="900.94"
                            height="787"
                        />
                    </Grid>
                </Fade>
            </Hidden>
        </Grid>
    )
}