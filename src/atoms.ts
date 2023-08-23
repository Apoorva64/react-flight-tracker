import { atom } from "recoil";
import { AircraftData } from "flightradar24-client-ts/lib/types";
import {
  defaultRadarOptions,
  RadarOptions,
} from "flightradar24-client-ts/lib/config";
import { getGPUTier } from "detect-gpu";
import {
  calculateMoonPosition,
  calculateSunPosition,
} from "./astronomy-utils.tsx";

export const selectedFlightState = atom<AircraftData | undefined>({
  key: "selectedFlight",
  default: undefined,
});

export const liveFlightsOptionsState = atom<RadarOptions>({
  key: "liveFlightsOptions",
  default: {
    ...defaultRadarOptions,
    estimatedPositions: false,
  },
});

export interface GraphicOptions {
  bloom: boolean;
  vignette: boolean;
  SMAA: boolean;
  countryBorders: boolean;
  highResolutionEarth: boolean;
  stars: boolean;
}

export const ultraGraphics: GraphicOptions = {
  bloom: true,
  vignette: true,
  SMAA: true,
  stars: true,
  highResolutionEarth: true,
  countryBorders: true,
};

export const highGraphics: GraphicOptions = {
  bloom: true,
  vignette: true,
  SMAA: false,
  stars: true,
  highResolutionEarth: true,
  countryBorders: true,
};

export const mediumGraphics: GraphicOptions = {
  bloom: false,
  vignette: false,
  SMAA: false,
  stars: true,
  highResolutionEarth: true,
  countryBorders: true,
};

export const lowGraphics: GraphicOptions = {
  bloom: false,
  vignette: false,
  SMAA: false,
  stars: false,
  highResolutionEarth: false,
  countryBorders: false,
};

export const graphicOptionsOptions = {
  ultra: ultraGraphics,
  high: highGraphics,
  medium: mediumGraphics,
  low: lowGraphics,
};

async function calculateGraphicOptions() {
  const gpuTier = await getGPUTier({
    desktopTiers: [
      0, 15, 30, 60, 120, 200, 280, 400, 500, 600, 700, 800, 900, 1000,
    ],
  });
  if (gpuTier.tier >= 6) {
    return graphicOptionsOptions.ultra;
  } else if (gpuTier.tier === 5 || gpuTier.tier === 4) {
    return graphicOptionsOptions.high;
  } else if (gpuTier.tier === 2 || gpuTier.tier === 3) {
    return graphicOptionsOptions.medium;
  } else {
    return graphicOptionsOptions.low;
  }
}

export const graphicOptionsState = atom<GraphicOptions>({
  key: "graphicOptions",
  default: calculateGraphicOptions(),
});

interface MiscellaneousOptions {
  altitudeFactor: number;
  enableAnnotations: boolean;
}

export const miscellaneousOptionsState = atom<MiscellaneousOptions>({
  key: "miscellaneousOptions",
  default: {
    altitudeFactor: 1,
    enableAnnotations: true,
  },
});

export const sunPositionState = atom<{
  dec: number;
  yeq: number;
  E: number;
  xeq: number;
  zeq: number;
  zh: number;
  ellipticLatitude: number;
  ra: number;
  yh: number;
  xh: number;
  geoLongitude: number;
  r: number;
  geoLatitude: number;
  ellipticLongitude: number;
  v: number;
}>({
  key: "sunPosition",
  default: calculateSunPosition(new Date(Date.now())),
});

export const moonPositionState = atom<{
  dec: number;
  yeq: number;
  E: number;
  xeq: number;
  zeq: number;
  zh: number;
  ellipticLatitude: number;
  ra: number;
  yh: number;
  xh: number;
  geoLongitude: number;
  r: number;
  geoLatitude: number;
  ellipticLongitude: number;
  v: number;
}>({
  key: "moonPosition",
  default: calculateMoonPosition(new Date(Date.now())),
});

export type CAMERA_TARGETS = "sun" | "moon" | "earth";
export const cameraTargetState = atom<CAMERA_TARGETS>({
  key: "cameraTarget",
  default: "earth",
});
export const isAnimationRunningState = atom<boolean>({
  key: "isAnimationRunning",
  default: false,
});
