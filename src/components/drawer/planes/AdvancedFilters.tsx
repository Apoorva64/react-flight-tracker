import { useRecoilState } from "recoil";
import { liveFlightsOptionsState } from "../../../atoms.ts";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { flightRadarApi } from "../../../utils.ts";
import { AirlineDetail } from "flightradar24-client-ts/lib/types";
import { AirportData } from "flightradar24-client-ts/lib/airportTypes";

export function AdvancedFilters(props: { disabled: boolean }) {
  const [liveFlightsOptions, setLiveFlightsOptions] = useRecoilState(
    liveFlightsOptionsState,
  );
  const [open, setOpen] = useState(false);
  const { data: airlines, isLoading: isAirlinesLoading } = useQuery({
    queryKey: ["airlines"],
    queryFn: () => flightRadarApi.fetchAirlines(),
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  });
  const { data: airports, isLoading: isAirportsLoading } = useQuery({
    queryKey: ["airports"],
    queryFn: () => flightRadarApi.fetchAirports(),
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  });
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
          <FilterAltIcon />
        </ListItemIcon>
        <ListItemText primary="Advanced Filters" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <Autocomplete
              multiple
              id="tags-standard"
              loading={isAirlinesLoading}
              options={airlines || ([] as AirlineDetail[])}
              getOptionLabel={(option) => `${option.Name} (${option.ICAO})`}
              fullWidth
              title="Airlines"
              onChange={(_, value) => {
                setLiveFlightsOptions({
                  ...liveFlightsOptions,
                  filters: {
                    ...liveFlightsOptions.filters,
                    airline: value.map((a) => a.ICAO) || undefined,
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Select Airlines"
                />
              )}
            />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <Autocomplete
              multiple
              id="tags-standard"
              loading={isAirportsLoading}
              options={airports || ([] as AirportData[])}
              getOptionLabel={(option) =>
                `${option.name} (${option.icao}/${option.iata})` || ""
              }
              fullWidth
              title="Airports"
              onChange={(_, value) => {
                setLiveFlightsOptions({
                  ...liveFlightsOptions,
                  filters: {
                    ...liveFlightsOptions.filters,
                    airport: value.map((a) => a.iata) || undefined,
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Select Airports"
                />
              )}
            />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
