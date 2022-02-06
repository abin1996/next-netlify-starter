import { Grid, makeStyles, Typography, Tooltip, Avatar } from "@material-ui/core";
import data from '../resumeData.json'
import clsx from "clsx";
import Image from 'next/image'
import icons from "simple-icons";

const { about } = data

const dpx = about.social.length*10 - 2

const socialDetails = about.social.map(({ alt, icon, link }) => {
    const ic = icons[icon]
    return {
        alt,
        backgroundColor: '#' + ic.hex,
        icon: ic,
        link
    }
})

let iobj = {}
socialDetails.forEach(({ alt, backgroundColor }) => {
    iobj[alt] = { backgroundColor }
})

const useStyles = makeStyles(theme => ({
    cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
        alignSelf: 'center',
        justifySelf: 'center'
    },
    avatar: {
        height: theme.spacing(8),
        width: theme.spacing(8),
        padding: theme.spacing(2)
    },
    dp: {
        height: theme.spacing(Math.max(dpx, 28)),
        width: theme.spacing(Math.max(dpx, 28))
    },
    ...iobj
}))

export default function About() {
    const classes = useStyles()

    return(
        <Grid direction="row" container justifyContent="center" alignItems="center" className={classes.cont}>
            <Grid item xs={12} lg={6}>
                <Typography variant="h2" gutterBottom component="p">
                    About me
                </Typography>
                <Typography variant="h5" gutterBottom component="p">
                    {about.description}
                </Typography>                
            </Grid>
            <Grid container direction="column" item xs={12} lg={6} spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Avatar variant="rounded" className={classes.dp}>
                        <Image
                            alt="Display Picture"
                            src={about.picture}
                            layout="fill"
                        />
                    </Avatar>
                </Grid>
                <Grid container item xs={12} spacing={2} justifyContent="center">
                {
                    socialDetails.map(({ alt, icon, link }, i) =>
                        <Grid item key={i}>
                            <a href={link} target="_blank" rel="noopener noreferrer">
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
                            </a> 
                        </Grid>
                    )
                }
                </Grid>                
            </Grid>
        </Grid>
    )
}