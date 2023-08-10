import {useState} from 'react';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText, Table, TableBody, TableCell,
    TableRow,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {calculateSunPosition, rightAscensionAndDeclinationToGeoCoordinates, toDegrees} from "../../astronomy-utils.tsx";

export function SunAstronomy() {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };


    const [sunPosition, setSunPosition] = useState(calculateSunPosition(new Date(Date.now())));
    // update every 10 seconds
    setInterval(() => {
        setSunPosition(calculateSunPosition(new Date(Date.now())))
    }, 10000)

    const geoCoordinates = rightAscensionAndDeclinationToGeoCoordinates(sunPosition.ra, sunPosition.dec,
        new Date(Date.now())
    );


    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary="Sun Astronomy"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Distance</TableCell>
                                <TableCell>{sunPosition.r.toFixed(5)} AU</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Elliptical Longitude</TableCell>
                                <TableCell>{toDegrees(sunPosition.lon).toFixed(5)} °</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Elliptical Latitude</TableCell>
                                <TableCell>{toDegrees(sunPosition.lat).toFixed(5)} °</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Equatorial Coordinates</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xeq</TableCell>
                                <TableCell>{sunPosition.xeq.toFixed(5)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>yeq</TableCell>
                                <TableCell>{sunPosition.yeq.toFixed(5)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>zeq</TableCell>
                                <TableCell>{sunPosition.zeq.toFixed(5)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Right Ascension</TableCell>
                                <TableCell>{toDegrees(sunPosition.ra).toFixed(5)} °</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Declination</TableCell>
                                <TableCell>{toDegrees(sunPosition.dec).toFixed(5)} °</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Geo Coordinates</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Longitude</TableCell>
                                <TableCell>{toDegrees(geoCoordinates.lon).toFixed(5)} °</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Latitude</TableCell>
                                <TableCell>{toDegrees(geoCoordinates.lat).toFixed(5)} °</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </List>
            </Collapse>
        </>
    )
}