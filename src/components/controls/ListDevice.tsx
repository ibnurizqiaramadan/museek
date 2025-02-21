"use client";

// import { useCallback, useEffect } from "react";
// import {
//   Autocomplete,
//   AutocompleteSection,
//   AutocompleteItem,
// } from "@heroui/autocomplete";

// import { appStore } from "@/stores/AppStores";

export default function ListDevice() {
  // const { app } = appStore((state) => state);

  return (
    <div className="flex flex-row gap-2 items-center p-3">
      {/* {app?.devices && (
        <>
          <h1 className="text-large">Devices</h1>
          <Autocomplete
            defaultItems={app?.devices?.devices}
            defaultSelectedKey={app?.selectedDevice ?? undefined}
          >
            <AutocompleteSection>
              {app?.devices &&
                app.devices.devices.map((device) => (
                  <AutocompleteItem key={device.id} value={device.id}>
                    {device.name}
                  </AutocompleteItem>
                ))}
            </AutocompleteSection>
          </Autocomplete>
        </>
      )} */}
    </div>
  );
}
