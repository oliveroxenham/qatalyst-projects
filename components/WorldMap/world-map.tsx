"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  // Line,
  // Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import clsx from "clsx";
import ReactDOMServer from "react-dom/server";
import { PlusIcon, MinusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import worldgeo from "./worldgeo.json";
// import Flag from 'react-country-flag';

const ZoomControl = ({
  handleZoomIn,
  handleZoomOut,
}: {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}) => {
  return (
    <div className="absolute flex flex-col bg-white rounded-lg shadow-md ml-2 mt-2">
      <Button
        onClick={handleZoomIn}
        variant="ghost"
        size="icon"
        className="hover:bg-gray-200 hover:text-primary"
      >
        <PlusIcon className="w-5 h-5" />
      </Button>
      <div className="flex justify-center">
        <Separator className="w-3/4 bg-gray-200" />
      </div>
      <Button
        onClick={handleZoomOut}
        variant="ghost"
        size="icon"
        className="hover:bg-gray-200 hover:text-primary"
      >
        <MinusIcon className="w-5 h-5" />
      </Button>
    </div>
  );
};

export function WorldMap({
  className = "",
  showZoomControl = true,
  showFlag = true,
  baseFillColor = "fill-gray-300",
  baseStrokeColor = "stroke-gray-600",
  baseStrokeWidth = "stroke-[0.2px]",
  hoverFillColor = "hover:fill-gray-200",
  countryColors = {},
}: {
  showFlag?: boolean;
  baseFillColor?: string;
  baseStrokeColor?: string;
  baseStrokeWidth?: string;
  hoverFillColor?: string;
  className?: string;
  showZoomControl?: boolean;
  countryColors?: {
    [key: string]: string;
  };
}) {
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({ coordinates: [0, 0], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 5) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom + 0.25 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 0.5) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom - 0.25 }));
  }
  function handleMoveEnd(position: {
    coordinates: [number, number];
    zoom: number;
  }) {
    setPosition(position);
  }

  return (
    <div className={clsx("w-full h-full overflow-hidden", className)}>
      {showZoomControl && (
        <ZoomControl
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
        }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies
            geography={worldgeo}
            className={clsx(baseFillColor, baseStrokeColor, baseStrokeWidth)}
          >
            {({ geographies }) =>
              geographies.map((geo) => (
                  <Geography
                    data-tooltip-id="map-tooltip"
                    data-tooltip-float
                    data-tooltip-delay-show="500"
                    data-tooltip-html={
                      showFlag
                        ? ReactDOMServer.renderToStaticMarkup(
                            <div className="flex flex-row gap-1 items-center justify-center">
                              {/* <Flag countryCode={geo.id} width={20} /> */}
                              <span>{geo.properties.name}</span>
                            </div>
                          )
                        : null
                    }
                    key={geo.rsmKey}
                    geography={geo}
                    className={clsx(
                      "transition-colors outline-none hover:cursor-pointer duration-500",
                      hoverFillColor,
                      countryColors && geo.id in countryColors
                        ? countryColors[geo.id]
                        : null
                    )}
                  />
              ))
            }
          </Geographies>

          {/* <Marker coordinates={[2.3522, 48.8566]}>
            <circle r={5} className="fill-blue-800 opacity-70" />
          </Marker>
          <Marker coordinates={[-74.006, 40.7128]}>
            <circle r={8} className="fill-blue-800 opacity-70" />
          </Marker>
          <Line
            from={[2.3522, 48.8566]}
            to={[-74.006, 40.7128]}
            className="animate-dash stroke-blue-700 stroke-1 [stroke-dasharray:100,100]"
            strokeLinecap="round"
          /> */}
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip
        id="map-tooltip"
        style={{
          backgroundColor: "#fcfcfc",
          color: "black",
          fontSize: 12,
          boxShadow: "0 0 4px 1px #ccc",
        }}
        border="1px solid #ccc"
      />
    </div>
  );
}
