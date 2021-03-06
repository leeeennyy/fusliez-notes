import { NAMESPACE, VERSION } from "utils/constants";

import About from "components/About";
import Button from "components/common/Button";
import Changelog from "components/Changelog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotesPanel from "components/NotesPanel";
import React from "react";
import ScoreControls from "components/ScoreControls";
import Settings from "components/Settings";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import useStyles from "./ControlsContent.styles";
import { useTranslation } from "react-i18next";

export default function ControlsContent(): JSX.Element {
  const { t } = useTranslation();
  const classes = useStyles();

  const [showChangelog, setShowChangelog] = React.useState<boolean>(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showAbout, setShowAbout] = React.useState<boolean>(false);

  React.useEffect(() => {
    const version = localStorage.getItem(`${NAMESPACE}version`);

    if (version === null || version !== VERSION) {
      setShowChangelog(true);
    }

    localStorage.setItem(`${NAMESPACE}version`, VERSION);
  }, []);

  return (
    <div id="controls" className={classes.ControlsContent}>
      <div className={classes.ControlsContentHeader}>
        <Button onClick={() => setShowSettings(true)}>
          <FontAwesomeIcon icon={faCog} /> {t("menu.settings")}
        </Button>{" "}
        <Button onClick={() => setShowAbout(true)}>{t("menu.about")}</Button>{" "}
        <Button onClick={() => setShowChangelog(true)}>
          {t("menu.changelog")}
        </Button>
      </div>
      <ScoreControls />
      <hr className={classes.Divider} />

      <NotesPanel />
      <Settings show={showSettings} onClose={() => setShowSettings(false)} />

      <Changelog show={showChangelog} onClose={() => setShowChangelog(false)} />

      <About show={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
}
