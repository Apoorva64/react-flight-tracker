import { useRecoilState } from "recoil";
import { liveFlightsOptionsState } from "../../../atoms.ts";
import { useEffect, useState } from "react";
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RadarIcon from "@mui/icons-material/Radar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export function RadarOptions(props: { disabled: boolean }) {
  const [liveFlightsOptions, setLiveFlightsOptions] = useRecoilState(
    liveFlightsOptionsState,
  );
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (props.disabled) {
      setOpen(false);
    }
  }, [props.disabled]);

  return (
    <>
      <ListItemButton onClick={handleClick} disabled={props.disabled}>
        <ListItemIcon>
          <RadarIcon />
        </ListItemIcon>
        <ListItemText primary="Radar Options" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="Gliders" />
            <Checkbox
              checked={liveFlightsOptions.gliders}
              onChange={(e) =>
                setLiveFlightsOptions({
                  ...liveFlightsOptions,
                  gliders: e?.target?.checked,
                })
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="inAir" />
            <Checkbox
              checked={liveFlightsOptions.inAir}
              onChange={(e) =>
                setLiveFlightsOptions({
                  ...liveFlightsOptions,
                  inAir: e?.target?.checked,
                })
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="onGround" />
            <Checkbox
              checked={liveFlightsOptions.onGround}
              onChange={(e) =>
                setLiveFlightsOptions({
                  ...liveFlightsOptions,
                  onGround: e?.target?.checked,
                })
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </ListItem>

          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="Inactive" />
            <Checkbox
              checked={liveFlightsOptions.inactive}
              onChange={(e) =>
                setLiveFlightsOptions({
                  ...liveFlightsOptions,
                  inactive: e?.target?.checked,
                })
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="Estimated Positions" />
            <Checkbox
              checked={liveFlightsOptions.estimatedPositions}
              onChange={(e) =>
                setLiveFlightsOptions({
                  ...liveFlightsOptions,
                  estimatedPositions: e?.target?.checked,
                })
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
