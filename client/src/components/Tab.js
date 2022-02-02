import React from "react";
import { Tab as Stab } from "semantic-ui-react";

export function Tab({ favourites, attending, events, addevent }) {
  const panes = [
    {
      menuItem: "Favourites",
      render: () => <Stab.Pane>{favourites}</Stab.Pane>,
    },
    { menuItem: "Attending", render: () => <Stab.Pane>{attending}</Stab.Pane> },

    {
      menuItem: "My hosting events",
      render: () => <Stab.Pane>{events}</Stab.Pane>,
    },
    {
      menuItem: "+ Add Event",
      render: () => <Stab.Pane>{addevent}</Stab.Pane>,
    },
  ];

  return (
    <Stab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  );
}
