import "react-circular-progressbar/dist/styles.css";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import React from "react";
import { useMobile } from "context/MobileContextProvider";
import useStyles from "./CircularProgressBar.styles";
import { hexToRGB } from "utils/colorConverter";

export interface ICircularProgressBarProps {
  progress: number;
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CircularProgressBar(
  props: ICircularProgressBarProps
): JSX.Element {
  const { progress, color, children } = props;
  const { isMobile, orientation } = useMobile()!; // eslint-disable-line

  const classes = useStyles({
    color,
    progress,
    isMobile,
    orientation,
  });

  function buildTrailColor(color: string): string {
    return `rgba(${hexToRGB(color)}, 0.3)`;
  }

  return (
    <CircularProgressbarWithChildren
      value={progress}
      className={classes.CircularBar}
      counterClockwise={true}
      styles={{
        path: {
          stroke: color,
        },
        trail: {
          stroke: buildTrailColor(color),
        },
      }}
    >
      {children}
    </CircularProgressbarWithChildren>
  );
}
