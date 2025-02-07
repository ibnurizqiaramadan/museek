"use client";

import { useCallback, useEffect } from "react";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@heroui/autocomplete";

import { getDevices } from "@/data/layer/player";
import { appStore } from "@/stores/AppStores";
import { getAccessToken } from "@/data/layer/auth";

export default function ListDevice() {
  const { app, setDevices, setSelectedDevice } = appStore((state) => state);

  const fetchDevices = useCallback(async () => {
    const [response, error] = await getDevices({
      accessToken: sessionStorage.getItem("accessToken") ?? "",
    });
    if (error?.statusCode === 401 || error?.statusCode === 400) {
      await getAccessToken().then(([response, error]) => {
        console.log(response, error);
        if (!error) {
          sessionStorage.setItem("accessToken", response?.access_token ?? "");
          fetchDevices();
        }
      });
    }
    setDevices(response);
    console.log(response);
    if (response?.devices?.length && response?.devices?.length > 0) {
      setSelectedDevice(response?.devices[0].id ?? null);
    }
  }, [setDevices, setSelectedDevice]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  return (
    <div className="flex flex-row gap-2 items-center p-3">
      {app?.devices && (
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
      )}
    </div>
  );
}
